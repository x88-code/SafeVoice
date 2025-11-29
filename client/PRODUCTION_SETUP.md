# Production Frontend Setup

## Backend URL Configuration

The frontend has been configured to use the production backend at:
**https://safevoice-d9jr.onrender.com**

## Environment Configuration

### Option 1: Using .env file (Recommended)

Create a `.env` file in the `SafeVoice/client/` directory with:

```env
VITE_API_URL=https://safevoice-d9jr.onrender.com
```

### Option 2: Default Fallback (Already Configured)

If you don't create a `.env` file, the frontend will automatically use the production backend URL as the default fallback.

## Changes Made

All frontend components have been updated to use the production backend:

- ✅ `src/api.js` - Main API client
- ✅ `src/components/EmotionalSupportChatEnhanced.jsx` - Chat component
- ✅ `src/components/DeveloperPortal.jsx` - Developer portal
- ✅ `src/components/ReportForm.jsx` - Report form
- ✅ `src/components/ReportButton.jsx` - Report button
- ✅ `src/components/EmailPreferences.jsx` - Email preferences
- ✅ `src/components/SafetyControls.jsx` - Safety controls
- ✅ `src/services/socketService.js` - Socket.io service
- ✅ `vite.config.js` - Vite proxy configuration

## Testing

1. Start the frontend:
   ```bash
   cd SafeVoice/client
   npm run dev
   ```

2. Open the app in your browser

3. Try the chat feature - it should now connect to the live backend at `https://safevoice-d9jr.onrender.com`

## Backend Verification

The backend is accessible at: https://safevoice-d9jr.onrender.com

You can verify it's working by visiting:
- https://safevoice-d9jr.onrender.com (should show API status)
- https://safevoice-d9jr.onrender.com/api/chat (should show method error, which is expected)

## Troubleshooting

### Still getting connection errors?

1. **Check browser console** (F12) for exact error messages
2. **Verify backend is running**: Visit https://safevoice-d9jr.onrender.com in your browser
3. **Check CORS**: The backend should have CORS enabled (it does by default)
4. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. **Restart dev server**: Stop and restart `npm run dev`

### For Local Development

If you want to use a local backend for development, create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000
```

The `.env.local` file takes precedence over `.env` and will override the default.

