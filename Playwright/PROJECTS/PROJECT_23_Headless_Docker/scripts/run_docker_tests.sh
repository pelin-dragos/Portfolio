#!/bin/bash
# Script pentru rulare teste în Docker (Playwright)

set -e  # Exit on error

echo "🐳 Starting Docker Test Execution"
echo "=================================="

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and run
echo "🔨 Building Docker image..."
docker-compose build

echo "🧪 Running tests in Docker..."
docker-compose up --abort-on-container-exit

echo "✅ Test execution completed!"
echo "📊 Check test-results/ and playwright-report/ for results"
