# How to Seed Resources Database

## Option 1: Using Frontend Seed Button ⭐ (Easiest)

1. Open your frontend application
2. Navigate to the **Resources** page
3. Click the blue **"Seed Database"** button at the top
4. Confirm the action
5. Wait for success message - resources will automatically reload!

## Option 2: Using Swagger UI

1. Open your browser and go to: **https://safevoice-d9jr.onrender.com/api-docs**
2. Find the **Resources** section
3. Look for `POST /api/resources/seed`
4. Click "Try it out"
5. Click "Execute"
6. You should see a success response with the count of resources seeded

## Option 3: Using Scripts (Command Line)

### Windows PowerShell:
```powershell
cd SafeVoice
.\seed-resources.ps1
```

### Linux/Mac:
```bash
cd SafeVoice
bash seed-resources.sh
```

## Option 4: Using curl (Manual)

### Windows PowerShell:
```powershell
Invoke-RestMethod -Uri "https://safevoice-d9jr.onrender.com/api/resources/seed" -Method POST -ContentType "application/json"
```

### Linux/Mac:
```bash
curl -X POST https://safevoice-d9jr.onrender.com/api/resources/seed \
  -H "Content-Type: application/json"
```

## Option 5: Using Browser/Postman

Simply open this URL in your browser (GET request):
```
https://safevoice-d9jr.onrender.com/api/resources/seed
```

Or use a tool like Postman to send a POST request.

## Option 4: Using Frontend Seed Button (Easiest for Users)

1. Open your frontend application
2. Navigate to the **Resources** page
3. You'll see a blue "Seed Database" button at the top
4. Click the button and confirm
5. Wait for the success message
6. Resources will automatically reload after seeding

## What Gets Seeded?

The seed endpoint adds resources for:
- **Kenya**: Gender Violence Recovery Centre, FIDA Kenya
- **Nigeria**: WARIF, Mirabel Centre
- **South Africa**: Rape Crisis Cape Town Trust
- **Uganda**: FIDA Uganda
- **Ghana**: DOVVSU
- **Tanzania**: TGNP
- **Rwanda**: Isange One Stop Centre

Total: 8 resources across 7 African countries

## Verify Seeding

After seeding, test by searching for resources:
- Go to Resources page in frontend
- Search for "Kenya" or "Nigeria"
- You should see resources appear

