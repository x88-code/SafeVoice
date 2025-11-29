#!/bin/bash

echo "Starting SafeVoice Backend Server..."
echo ""

cd server

if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo ""
    echo "Please create a .env file in the server directory with:"
    echo "MONGO_URI=mongodb://localhost:27017/safecircle"
    echo "PORT=5000"
    echo "NODE_ENV=development"
    echo "JWT_SECRET=your_super_secret_jwt_key"
    echo "GEMINI_API_KEY=your_gemini_api_key_here"
    echo ""
    exit 1
fi

echo "Starting server on port 5000..."
npm start

