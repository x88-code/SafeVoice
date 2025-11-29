#!/bin/bash
# Shell script to seed resources database
# Run this: bash seed-resources.sh

URL="https://safevoice-d9jr.onrender.com/api/resources/seed"

echo "Seeding resources database..."
echo "URL: $URL"
echo ""

response=$(curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -w "\nHTTP_CODE:%{http_code}")

http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_CODE/d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo "✅ Success!"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo "❌ Error: HTTP $http_code"
    echo "$body"
fi

