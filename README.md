# Vaccination Portal

A full-stack **Vaccination Portal** that lets **users** browse available vaccines and book appointments, while **hospitals** can register/login, publish vaccines, manage day-wise availability, and view/update appointment status.

## Repository Structure

```
.
├─ backend/
│  ├─ server.js
│  ├─ package.json
│  ├─ routes/
│  │  ├─ userRoutes.js
│  │  └─ hospitalRoutes.js
│  └─ models/
│     ├─ User.js
│     ├─ Hospital.js
│     ├─ Vaccine.js
│     └─ Appointment.js
└─ frontend/
   ├─ package.json
   ├─ README.md
   ├─ public/
   └─ src/
```

## Tech Stack

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **CORS** enabled for local development

### Frontend
- A separate app under `frontend/` (see `frontend/README.md` for the client-specific details/commands).

## Features

### User flows
- Register
- Login
- View available vaccines (across hospitals)
- Book vaccination appointments (with availability decrement)
- View all appointments for a user

### Hospital flows
- Register
- Login
- Create vaccine entries
- Update vaccine availability per date
- View all appointments for a hospital
- Update appointment status (e.g., mark as `vaccinated`)

## Backend: Getting Started

### Prerequisites
- Node.js / npm
- MongoDB running locally

### Install dependencies
```bash
cd backend
npm install
```

### Configure MongoDB
The backend currently connects to:
- `mongodb://127.0.0.1:27017/vaccineDB`

This is hardcoded in `backend/server.js`.

### Run the server
`server.js` starts an Express server on port **5000**:
- API base URL: `http://localhost:5000`

> Note: `backend/package.json` currently does not define a `start` script. You can run it with:
```bash
node server.js
```

### CORS configuration
Backend allows requests from:
- `http://localhost:3000`
with credentials enabled.

## Frontend: Getting Started

The frontend lives in `frontend/` and includes its own `package.json`.

Typical flow:
```bash
cd frontend
npm install
npm start
```

Refer to `frontend/README.md` for the full client documentation.

## Data Model (MongoDB / Mongoose)

The backend uses four core models:

- **User**
- **Hospital**
- **Vaccine** (includes `hospitalId` and an `availability` array with `{ date, available }`)
- **Appointment** (references `userId`, `hospitalId`, `vaccineId`, includes `date`, and supports a `status` field updated by hospitals)

## API Reference

Base URL: `http://localhost:5000`

### User API (`/api/users`)

#### Register user
- **POST** `/api/users/register`
- Body: user fields (stored as provided)

#### Login user
- **POST** `/api/users/login`
- Body:
  - `email`
  - `password`
- Notes: Passwords are compared in plain text (no hashing).

#### List all vaccines
- **GET** `/api/users/vaccines`
- Returns: vaccines with `hospitalId` populated with hospital `name`.

#### Book an appointment
- **POST** `/api/users/appointments`
- Body:
  - `userId`
  - `hospitalId`
  - `vaccineId`
  - `date` (string; must match an availability entry date)
- Behavior:
  - Checks vaccine exists
  - Checks availability for the given date is `> 0`
  - Creates appointment
  - Decrements availability and saves vaccine
  - Returns populated appointment (vaccine name + hospital name)

#### Get appointments for a user
- **GET** `/api/users/appointments/:userId`
- Returns: appointments for that user with `vaccineId` and `hospitalId` populated (`name`).

---

### Hospital API (`/api/hospitals`)

#### Register hospital
- **POST** `/api/hospitals/register`

#### Login hospital
- **POST** `/api/hospitals/login`
- Body:
  - `email`
  - `password`
- Notes: Passwords are compared in plain text (no hashing).

#### Get vaccines for a hospital
- **GET** `/api/hospitals/vaccines?hospitalId=<id>`
- Returns: vaccines for that hospital (with hospital name populated).

#### Add a new vaccine
- **POST** `/api/hospitals/vaccines`
- Body: vaccine fields (should include `hospitalId`, etc.)

#### Update vaccine availability
- **POST** `/api/hospitals/updateAvailability`
- Body:
  - `vaccineId`
  - `date`
  - `available` (number)
- Behavior:
  - If date exists in `availability`, updates it
  - Else pushes a new availability entry

#### Get appointments for a hospital
- **GET** `/api/hospitals/appointments?hospitalId=<id>`
- Returns: appointments for that hospital with `userId` and `vaccineId` populated (`name`).

#### Update appointment status
- **PATCH** `/api/hospitals/appointments/:appointmentId`
- Body:
  - `status` (expected value noted in code: `"vaccinated"`)
- Returns: updated appointment with `userId` and `vaccineId` populated.

## Notes / Limitations (as currently implemented)
- Authentication is basic:
  - Passwords are stored and compared as plain text.
  - No sessions/JWT tokens are implemented in the backend routes shown.
- MongoDB connection string and frontend origin are hardcoded for local development.
- No automated tests are configured (`backend/package.json` test script is a placeholder).

## License
No license file is currently present in the repository. If you plan to open-source this project, consider adding a license (e.g., MIT, Apache-2.0).
