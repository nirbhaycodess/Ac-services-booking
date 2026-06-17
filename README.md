# AC Repairing Booking 

Short project summary
---------------------
- Role: Full‑stack developer (design, backend API, frontend UI, deployments)
- Project type: Booking system for residential AC service requests (repair, installation, maintenance)
- Duration: short prototype / portfolio project

One‑line impact statement
-------------------------
Built a lightweight, end‑to‑end booking platform enabling customers to request AC service with photo uploads and allowing technicians to update booking status (pending → approved → done / cancelled). Demonstrates full‑stack skills across Node/Express, MongoDB, and React + Tailwind.

Responsibilities & highlights
-----------------------------
- Designed the booking data model and API (`backend/models/Booking.js`, `backend/routes/bookings.js`)
- Implemented image uploads and safe storage handling for diagnostic photos
- Built responsive React frontend (Vite + Tailwind) with booking form, status tracking, and technician UI
- Added client-side status polling and a public lookup flow for users to check booking status without login
- Implemented basic auth for technician actions using JWT

Key features
------------
- Customer booking form with optional image attachment
- Technician endpoints to update status and notes
- Booking status tracking UI and lookup by phone/email
- Minimal deployment-ready config (env examples, CORS-ready API)

Tech stack
----------
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Vite), Tailwind CSS
- Auth: JWT for tech users

Repository layout
-----------------
- `backend/` — API server and models
- `frontend/` — Vite React app and pages (`frontend/src/pages/BookingPage.jsx`, `frontend/src/pages/Home.jsx`)
- `scripts/` — developer scripts and small tools

Run locally (quick)
-------------------
1. Backend

```bash
cd backend
npm install
cp .env.example .env
# set MONGO_URI and optionally JWT_SECRET
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# set VITE_API_URL to your backend (e.g. http://localhost:4000)
npm run dev
```

Notes for a resume / interview
-----------------------------
- Explain the booking lifecycle and why tracking tokens or OTPs are recommended for anonymous lookups.
- Describe how you would harden the API for production: add input validation, rate limiting, helmet, secure file scanning, and store only hashed tracking tokens.
- Discuss scaling paths: move uploads to S3, add Redis for caching and session handling, and deploy with Docker + CI.

Where to look in the code
------------------------
- Booking model: `backend/models/Booking.js`
- Booking API: `backend/routes/bookings.js`
- Main frontend pages: `frontend/src/pages/BookingPage.jsx`, `frontend/src/pages/Home.jsx`, `frontend/src/pages/MyBookings.jsx`

Contact / demo
---------------
- Repo: link the GitHub repository in your resume and include a short demo GIF or deployed URL if available.

If you want, I can also generate a one‑page Markdown resume entry that you can paste into a personal portfolio or `resume.md` file.
