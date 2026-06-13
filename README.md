# AC Repair Booking

This repo contains a minimal full-stack example for booking AC repairs.

- `backend/` - Express + Mongoose API
- `frontend/` - React (Vite) + Tailwind frontend

## Quick start

1. Start MongoDB locally or provide a Mongo URI in `backend/.env`.
2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env to set MONGO_URI
npm run dev
```

3. Frontend

```bash
cd frontend
npm install
npm run dev
```

4. Open http://localhost:3000 and the backend runs on http://localhost:4000 by default.

## Endpoints

- `POST /api/bookings` - create booking
- `GET /api/bookings` - list bookings

## Environment variables

Backend (set in `backend/.env` or your host):

- `MONGO_URI` - MongoDB connection string
- `TECH_EMAIL` - technician login email
- `TECH_PASS` - technician login password
- `JWT_SECRET` - JWT secret for tokens

Frontend (local):

- Create `frontend/.env` based on `frontend/.env.example` and set `VITE_API_URL` to your backend URL (e.g. `https://ac-repairing-booking.onrender.com`).

## Next steps

- Add validation and authentication
- Add admin UI and email notifications
- Deploy to a cloud provider and use managed MongoDB (Atlas)
