#!/bin/bash
# Script to check for potential secrets in the repository

echo "🔍 Checking for exposed secrets..."

# Check for MongoDB connection strings with actual cluster names
echo "Checking for MongoDB connection strings..."
if grep -r "cluster0\.[a-z0-9]*\.mongodb\.net" --exclude-dir=node_modules --exclude=".env" --exclude="*.log" . 2>/dev/null; then
    echo "❌ WARNING: Found actual MongoDB cluster URLs!"
    exit 1
fi

# Check for actual passwords (not placeholders)
echo "Checking for actual passwords..."
if grep -r "password.*=.*[0-9a-zA-Z]\{8,\}" --exclude-dir=node_modules --exclude=".env" --exclude="*.log" . 2>/dev/null | grep -v "your-password\|<db_password\|password\|admin123"; then
    echo "❌ WARNING: Found potential actual passwords!"
    exit 1
fi

# Check for JWT secrets that look real
echo "Checking for JWT secrets..."
if grep -r "JWT_SECRET.*=.*[a-zA-Z0-9]\{32,\}" --exclude-dir=node_modules --exclude=".env" --exclude="*.log" . 2>/dev/null | grep -v "your-super-secret\|change-this"; then
    echo "❌ WARNING: Found potential real JWT secrets!"
    exit 1
fi

echo "✅ No secrets found in tracked files!"
echo "✅ Remember: .env files should never be committed!"

