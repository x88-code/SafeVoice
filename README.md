# SafeVoice

A safety-focused reporting application for submitting anonymous incident reports. Built with a modern React frontend and Express backend.

## Project Structure

```
safety-design/
├── client/           # React + Vite frontend
├── server/           # Express.js backend
└── README.md         # This file
```

## Features

- **Anonymous Reporting**: Submit safety incident reports anonymously
- **Modern UI**: React frontend with Tailwind CSS
- **RESTful API**: Express backend with MongoDB integration
- **Real-time Development**: Hot module replacement with Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

## Quick Start

### 1. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 2. Frontend Setup

In a new terminal, navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/reports` | Create an anonymous report |
| GET    | `/api/reports` | Retrieve all reports (admin-only) |

### Example Request

```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Safety Issue",
    "description": "Description of the incident",
    "location": "Building A"
  }'
```

## Development

### Client Commands

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Commands

- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Run production server

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Environment Variables

### Server (.env)

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/safevoice
PORT=5000
NODE_ENV=development
```

## Admin Access

The project includes a simple JWT-based admin authentication to protect the reports listing and review actions.

Set these environment variables in the `server/.env` file:

```env
ADMIN_USER=admin
ADMIN_PASS=admin123
JWT_SECRET=some_long_random_secret
```

Use the admin UI from the frontend by clicking the **Admin** button in the top navigation. Sign in with the `ADMIN_USER` / `ADMIN_PASS` credentials you set in the server environment. The frontend stores the token in `localStorage` as `admin_token`.

Notes:
- For production, replace `JWT_SECRET` with a secure random value and consider using a proper user store and hashed passwords. This implementation is intentionally minimal for development.


## License

MIT

## Support

For issues or questions, please open an issue in the repository.
