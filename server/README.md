# SafeVoice - Server

Minimal Express backend for SafeVoice.

Setup

1. Copy `.env.example` to `.env` and fill `MONGO_URI`.
2. Install dependencies:

```bash
npm install
```

3. Run in dev:

```bash
npm run dev
```

API

- POST /api/reports -> create anonymous report
- GET /api/reports -> list reports (admin-only later)
