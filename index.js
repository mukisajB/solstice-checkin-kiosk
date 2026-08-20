const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// In-memory attendee state
// Possible states: "pending", "checked_in"
const attendees = {};

// ✅ Route: staff scans attendee QR
app.post('/checkin/:attendeeId', (req, res) => {
  const id = req.params.attendeeId;

  if (attendees[id] === 'checked_in') {
    return res.json({ status: 'duplicate', message: 'Already checked in' });
  }

  // Mark as pending and simulate publishing to vendor queue
  attendees[id] = 'pending';
  console.log(`Print job queued for attendee ${id}`);

  // Respond immediately with pending state
  res.json({ status: 'pending', message: 'Print job queued' });
});

// ✅ Route: webhook callback from vendor
app.post('/printer-callback', (req, res) => {
  const { attendeeId, success } = req.body;

  if (success && attendees[attendeeId] === 'pending') {
    attendees[attendeeId] = 'checked_in';
    console.log(`Attendee ${attendeeId} successfully checked in`);
  }

  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
