#!/bin/bash
# Script pentru rulare teste în CI/CD (Playwright)

set -e  # Exit on error

echo "🚀 Starting CI/CD Test Execution"
echo "================================"

# Setup
echo "📦 Installing dependencies..."
npm install

echo "🌐 Installing browsers..."
npx playwright install --with-deps chromium

# Run tests
echo "🧪 Running tests..."
cd "$(dirname "$0")/.."

# Run with markers
if [ "$1" == "smoke" ]; then
    echo "Running smoke tests..."
    npm run test:smoke
elif [ "$1" == "regression" ]; then
    echo "Running regression tests..."
    npm run test:regression
else
    echo "Running all tests..."
    npm run test:ci
fi

echo "✅ Test execution completed!"
