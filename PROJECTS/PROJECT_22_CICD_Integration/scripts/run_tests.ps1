# PowerShell script pentru rulare teste în CI/CD (Windows) - Playwright

Write-Host "🚀 Starting CI/CD Test Execution" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Setup
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🌐 Installing browsers..." -ForegroundColor Yellow
npx playwright install --with-deps chromium

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
Set-Location $PSScriptRoot\..

# Run with markers
if ($args[0] -eq "smoke") {
    Write-Host "Running smoke tests..." -ForegroundColor Cyan
    npm run test:smoke
}
elseif ($args[0] -eq "regression") {
    Write-Host "Running regression tests..." -ForegroundColor Cyan
    npm run test:regression
}
else {
    Write-Host "Running all tests..." -ForegroundColor Cyan
    npm run test:ci
}

Write-Host "✅ Test execution completed!" -ForegroundColor Green
