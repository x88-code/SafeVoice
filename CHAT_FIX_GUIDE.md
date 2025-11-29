# Chat API Connection Fix Guide

## Problem
You're getting these errors when trying to chat:
- `Failed to load resource: the server responded with a status of 404`
- `ERR_CONNECTION_REFUSED`
- `Error sending message: TypeError: Failed to fetch`

## Root Cause
The backend server is **not running** on port 5000. The frontend is trying to connect to `http://localhost:5000/api/chat`, but there's no server listening.

## Solution

### Step 1: Check if Server is Running

Open a terminal and check if port 5000 is in use:
```bash
# Windows PowerShell
netstat -ano | findstr :5000

# If nothing shows up, the server is NOT running
```

### Step 2: Start the Backend Server

#### Option A: Using the Startup Script (Windows)
1. Double-click `start-server.bat` in the `SafeVoice` folder
2. Or run from terminal:
   ```bash
   cd SafeVoice
   start-server.bat
   ```

#### Option B: Manual Start
1. Open a terminal
2. Navigate to the server directory:
   ```bash
   cd SafeVoice/server
   ```
3. Make sure you have a `.env` file (see Step 3)
4. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Step 3: Create/Verify .env File

The server needs a `.env` file in `SafeVoice/server/` directory.

1. Navigate to `SafeVoice/server/`
2. Create a file named `.env` (no extension)
3. Add these variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/safecircle
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_this
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

**Important Notes:**
- If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string
- `GEMINI_API_KEY` is optional - the chat will work without it (using fallback responses)
- Make sure MongoDB is running if using local MongoDB

### Step 4: Verify Server Started Successfully

After starting the server, you should see:
```
🚀 SafeCircle API listening on port 5000
📚 Documentation: http://localhost:5000/docs
Connected to MongoDB
```

### Step 5: Test the Chat Endpoint

Once the server is running, test it:
1. Open your browser
2. Go to `http://localhost:5000/api/chat` (should show an error about method, which is expected)
3. Or test with curl:
   ```bash
   curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"sessionId\":\"test123\",\"message\":\"Hello\"}"
   ```

### Step 6: Start the Frontend

In a **separate terminal**:
1. Navigate to the client directory:
   ```bash
   cd SafeVoice/client
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

## Verification Checklist

- [ ] Backend server is running on port 5000
- [ ] `.env` file exists in `SafeVoice/server/`
- [ ] MongoDB is running (if using local MongoDB)
- [ ] Frontend is running (usually on port 5173)
- [ ] Can access `http://localhost:5000` in browser
- [ ] Chat feature works in the frontend

## Common Issues

### Issue: "MONGO_URI is required"
**Solution:** Create/update the `.env` file with `MONGO_URI=mongodb://localhost:27017/safecircle`

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Make sure MongoDB is running: `mongod` or start MongoDB service
- If using Atlas, check your connection string and IP whitelist

### Issue: "Port 5000 already in use"
**Solution:** 
- Change `PORT=5001` in `.env` file
- Update frontend `VITE_API_URL` to match (or use environment variable)

### Issue: Frontend still can't connect
**Solution:**
- Check that backend is actually running: `netstat -ano | findstr :5000`
- Verify `VITE_API_URL` in frontend (should be `http://localhost:5000`)
- Check browser console for exact error message
- Make sure CORS is enabled in backend (it is by default)

## Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd SafeVoice/server
npm start
```

**Terminal 2 (Frontend):**
```bash
cd SafeVoice/client
npm run dev
```

Then open `http://localhost:5173` (or the port shown) in your browser.

## Still Having Issues?

1. Check server logs for errors
2. Check browser console (F12) for exact error messages
3. Verify both servers are running
4. Check firewall/antivirus isn't blocking port 5000
5. Try restarting both servers

