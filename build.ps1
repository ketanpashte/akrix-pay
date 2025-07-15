# Receipt Generator Build Script
# This script builds both frontend and backend for production

Write-Host "🚀 Starting Receipt Generator Build Process..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Create build directory
Write-Host "📁 Creating build directory..." -ForegroundColor Yellow
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
}
New-Item -ItemType Directory -Path "build" | Out-Null
Write-Host "✅ Build directory created" -ForegroundColor Green

# Build Backend
Write-Host "🔧 Building Backend..." -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan

Set-Location "backend"

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

# Build backend
Write-Host "🔨 Building backend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend built successfully" -ForegroundColor Green

# Copy backend build to build directory
Write-Host "📋 Copying backend build..." -ForegroundColor Yellow
Copy-Item -Recurse -Path "dist" -Destination "../build/backend"
Copy-Item -Path "package.json" -Destination "../build/backend/"
Copy-Item -Path ".env" -Destination "../build/backend/" -ErrorAction SilentlyContinue
Write-Host "✅ Backend build copied" -ForegroundColor Green

Set-Location ".."

# Build Frontend
Write-Host "🎨 Building Frontend..." -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan

Set-Location "frontend"

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

# Build frontend
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend built successfully" -ForegroundColor Green

# Copy frontend build to build directory
Write-Host "📋 Copying frontend build..." -ForegroundColor Yellow
Copy-Item -Recurse -Path ".next" -Destination "../build/frontend/"
Copy-Item -Path "package.json" -Destination "../build/frontend/"
Copy-Item -Path "next.config.js" -Destination "../build/frontend/" -ErrorAction SilentlyContinue
Copy-Item -Path "tailwind.config.js" -Destination "../build/frontend/" -ErrorAction SilentlyContinue
Copy-Item -Path "postcss.config.js" -Destination "../build/frontend/" -ErrorAction SilentlyContinue
Write-Host "✅ Frontend build copied" -ForegroundColor Green

Set-Location ".."

# Create production package.json for backend
Write-Host "📄 Creating production package.json..." -ForegroundColor Yellow
$prodPackageJson = @{
    name = "receipt-generator-backend"
    version = "1.0.0"
    description = "Receipt Generator Backend - Production Build"
    main = "main.js"
    scripts = @{
        start = "node main.js"
    }
    dependencies = @{
        "@nestjs/common" = "^11.0.1"
        "@nestjs/config" = "^4.0.2"
        "@nestjs/core" = "^11.0.1"
        "@nestjs/platform-express" = "^11.0.1"
        "@nestjs/typeorm" = "^11.0.0"
        "@supabase/supabase-js" = "^2.50.3"
        "bcrypt" = "^6.0.0"
        "class-transformer" = "^0.5.1"
        "class-validator" = "^0.14.2"
        "nodemailer" = "^7.0.5"
        "pdfkit" = "^0.17.1"
        "pg" = "^8.16.3"
        "razorpay" = "^2.9.6"
        "reflect-metadata" = "^0.2.2"
        "rxjs" = "^7.8.1"
        "typeorm" = "^0.3.25"
        "uuid" = "^11.1.0"
    }
}

$prodPackageJson | ConvertTo-Json -Depth 3 | Out-File -FilePath "build/backend/package.json" -Encoding UTF8
Write-Host "✅ Production package.json created" -ForegroundColor Green

# Create deployment instructions
Write-Host "📝 Creating deployment instructions..." -ForegroundColor Yellow
$deployInstructions = @"
# Receipt Generator - Deployment Instructions

## Production Build Created Successfully! 🎉

### Directory Structure:
```
build/
├── backend/          # Backend production build
│   ├── main.js       # Main application file
│   ├── package.json  # Production dependencies
│   └── .env          # Environment variables
└── frontend/         # Frontend production build
    ├── .next/        # Next.js build output
    └── package.json  # Frontend dependencies
```

### Backend Deployment:
1. Navigate to build/backend/
2. Install production dependencies: `npm install --production`
3. Set environment variables (copy .env or set manually)
4. Start the server: `npm start`
5. Backend will run on port 3002 (or PORT env variable)

### Frontend Deployment:
1. Navigate to build/frontend/
2. Install dependencies: `npm install`
3. Start the frontend: `npm start`
4. Frontend will run on port 3000

### Environment Variables Required:
- DATABASE_URL: Supabase connection string
- SUPABASE_URL: Supabase project URL
- SUPABASE_ANON_KEY: Supabase anonymous key
- RAZORPAY_KEY_ID: Razorpay API key
- RAZORPAY_KEY_SECRET: Razorpay secret key
- EMAIL_USER: SMTP email username
- EMAIL_PASS: SMTP email password
- ADMIN_PASSWORD: Admin login password

### Production URLs:
- Frontend: http://your-domain:3000
- Backend API: http://your-domain:3002

### Features Included:
✅ Direct Receipt Generation
✅ Razorpay Payment Integration
✅ QR Code Payments
✅ Email Receipt Delivery
✅ Admin Portal
✅ PDF Generation (Compact Format)
✅ Database Integration (Supabase)
✅ Contact Information Updated

### Build Information:
- Build Date: $(Get-Date)
- Node.js Version: $nodeVersion
- npm Version: $npmVersion
"@

$deployInstructions | Out-File -FilePath "build/DEPLOYMENT.md" -Encoding UTF8
Write-Host "✅ Deployment instructions created" -ForegroundColor Green

# Create startup scripts
Write-Host "🚀 Creating startup scripts..." -ForegroundColor Yellow

# Backend startup script
$backendStartup = @"
@echo off
echo Starting Receipt Generator Backend...
cd backend
npm install --production
npm start
"@
$backendStartup | Out-File -FilePath "build/start-backend.bat" -Encoding ASCII

# Frontend startup script  
$frontendStartup = @"
@echo off
echo Starting Receipt Generator Frontend...
cd frontend
npm install
npm start
"@
$frontendStartup | Out-File -FilePath "build/start-frontend.bat" -Encoding ASCII

# Combined startup script
$combinedStartup = @"
@echo off
echo Starting Receipt Generator...
echo.
echo Starting Backend...
start "Backend" cmd /k "cd backend && npm install --production && npm start"
timeout /t 5 /nobreak > nul
echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm install && npm start"
echo.
echo Both services are starting...
echo Backend: http://localhost:3002
echo Frontend: http://localhost:3000
pause
"@
$combinedStartup | Out-File -FilePath "build/start-all.bat" -Encoding ASCII

Write-Host "✅ Startup scripts created" -ForegroundColor Green

# Final summary
Write-Host "🎉 Build Process Completed Successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📁 Build output: ./build/" -ForegroundColor Yellow
Write-Host "📋 Deployment guide: ./build/DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host "🚀 Quick start: ./build/start-all.bat" -ForegroundColor Yellow
Write-Host "" -ForegroundColor White
Write-Host "✅ Backend build: ./build/backend/" -ForegroundColor Green
Write-Host "✅ Frontend build: ./build/frontend/" -ForegroundColor Green
Write-Host "✅ Startup scripts created" -ForegroundColor Green
Write-Host "✅ Deployment instructions created" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "🌐 Ready for production deployment!" -ForegroundColor Cyan
