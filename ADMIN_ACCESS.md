# Admin Tools Access Guide

## Seed Database Button - Hidden by Default

The "Seed Database" button is **hidden by default** to keep the interface clean for presentations and end users.

## How to Access (When Needed)

### Option 1: URL Parameter (Easiest)
Add `?admin=true` to the URL:
```
http://localhost:5173/resources?admin=true
```
or
```
https://your-domain.com/resources?admin=true
```

### Option 2: Browser Console
Open browser console (F12) and run:
```javascript
localStorage.setItem('showAdminTools', 'true')
```
Then refresh the page.

### Option 3: Development Mode
The button automatically appears when running in development mode (`npm run dev`).

## To Hide Again

Remove the URL parameter or run in console:
```javascript
localStorage.removeItem('showAdminTools')
```

## For Presentations

✅ **The button will NOT be visible** during presentations unless you specifically add `?admin=true` to the URL.

This keeps the interface professional and clean for demos!

