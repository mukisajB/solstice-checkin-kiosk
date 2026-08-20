# Solstice Check-In Kiosk

## Overview
This project is a pivot from the **Northstar Inventory Sync** service to a new **Solstice Events Co. Check-In Kiosk**.  
It demonstrates how to adapt from a synchronous API model to an asynchronous message queue + webhook model.

## Features
- Staff scan attendee QR codes.
- Publishes badge print requests to vendor queue.
- Webhook endpoint receives confirmation when printing completes.
- UI shows **Pending…** until callback → then **Checked In**.
- Duplicate protection: prevents multiple badges for the same attendee.

## Tech Stack
- Node.js + Express (backend)
- HTML + JavaScript (frontend kiosk UI)
- Render (deployment)

## Usage
1. Run locally:
   ```bash
   npm install
   npm start
