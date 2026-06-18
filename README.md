# Shuttle Connect

## Project Description
Shuttle Connect is a web platform designed to help badminton players find nearby drop-in games seamlessly. Users can search for games based on location, time, skill level, price, and available slots. Hosts can post game invitations either manually or by importing and parsing the text from their Facebook posts. 

## Features
- **Map-based Search:** Locate courts and games nearby.
- **Skill-level Matching:** Filter games by skill levels (yếu, trung bình, khá, cứng).
- **Facebook Post Import:** Parse text from Facebook to extract times, dates, prices, and slots.
- **Role-based Dashboards:** Player, Host, and Admin views with mock authentication.
- **Host Verification & Approval Workflow:** Admins can review imported posts to prevent duplicates.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** CSS Modules / Plain CSS (No external UI libraries)
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Package Manager:** pnpm

## How to Install
Ensure you have `pnpm` installed globally. Then run:

```bash
cd client
pnpm install
```

## How to Run
Start the Vite development server:

```bash
cd client
pnpm dev
```

## Environment Variables
Copy `.env.example` to `.env` in the `client` directory and update your keys.

```bash
cp client/.env.example client/.env
```

Example content:
`VITE_VIETMAP_API_KEY=your_vietmap_api_key_here`

## MVP Limitations & Policy
**Important Policy:** This MVP does not scrape Facebook groups to comply with legal policies and avoid hidden bots/cookies. It only supports manual Facebook post text import (copy-pasting text). Future integration will rely strictly on the official Facebook Page API.
