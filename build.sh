#!/bin/bash

# Receipt Generator Build Script (Linux/Mac)
# This script builds both frontend and backend for production

echo "🚀 Starting Receipt Generator Build Process..."
echo "================================================"

# Check if Node.js is installed
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "✅ Node.js version: $NODE_VERSION"
echo "✅ npm version: $NPM_VERSION"

# Create build directory
echo "📁 Creating build directory..."
rm -rf build
mkdir -p build
echo "✅ Build directory created"

# Build Backend
echo "🔧 Building Backend..."
echo "================================================"

cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Build backend
echo "🔨 Building backend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
echo "✅ Backend built successfully"

# Copy backend build to build directory
echo "📋 Copying backend build..."
cp -r dist ../build/backend
cp package.json ../build/backend/
cp .env ../build/backend/ 2>/dev/null || true
echo "✅ Backend build copied"

cd ..

# Build Frontend
echo "🎨 Building Frontend..."
echo "================================================"

cd frontend

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

# Build frontend
echo "🔨 Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend built successfully"

# Copy frontend build to build directory
echo "📋 Copying frontend build..."
mkdir -p ../build/frontend
cp -r .next ../build/frontend/
cp package.json ../build/frontend/
cp next.config.js ../build/frontend/ 2>/dev/null || true
cp tailwind.config.js ../build/frontend/ 2>/dev/null || true
cp postcss.config.js ../build/frontend/ 2>/dev/null || true
echo "✅ Frontend build copied"

cd ..

# Create production package.json for backend
echo "📄 Creating production package.json..."
cat > build/backend/package.json << 'EOF'
{
  "name": "receipt-generator-backend",
  "version": "1.0.0",
  "description": "Receipt Generator Backend - Production Build",
  "main": "main.js",
  "scripts": {
    "start": "node main.js"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.2",
    "@nestjs/core": "^11.0.1",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/typeorm": "^11.0.0",
    "@supabase/supabase-js": "^2.50.3",
    "bcrypt": "^6.0.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "nodemailer": "^7.0.5",
    "pdfkit": "^0.17.1",
    "pg": "^8.16.3",
    "razorpay": "^2.9.6",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.25",
    "uuid": "^11.1.0"
  }
}
EOF
echo "✅ Production package.json created"

# Create startup scripts
echo "🚀 Creating startup scripts..."

# Backend startup script
cat > build/start-backend.sh << 'EOF'
#!/bin/bash
echo "Starting Receipt Generator Backend..."
cd backend
npm install --production
npm start
EOF
chmod +x build/start-backend.sh

# Frontend startup script
cat > build/start-frontend.sh << 'EOF'
#!/bin/bash
echo "Starting Receipt Generator Frontend..."
cd frontend
npm install
npm start
EOF
chmod +x build/start-frontend.sh

# Combined startup script
cat > build/start-all.sh << 'EOF'
#!/bin/bash
echo "Starting Receipt Generator..."
echo ""
echo "Starting Backend..."
cd backend && npm install --production && npm start &
BACKEND_PID=$!
sleep 5
echo ""
echo "Starting Frontend..."
cd ../frontend && npm install && npm start &
FRONTEND_PID=$!
echo ""
echo "Both services are starting..."
echo "Backend: http://localhost:3002"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services"
wait $BACKEND_PID $FRONTEND_PID
EOF
chmod +x build/start-all.sh

echo "✅ Startup scripts created"

# Create deployment instructions
cat > build/DEPLOYMENT.md << EOF
# Receipt Generator - Deployment Instructions

## Production Build Created Successfully! 🎉

### Directory Structure:
\`\`\`
build/
├── backend/          # Backend production build
│   ├── main.js       # Main application file
│   ├── package.json  # Production dependencies
│   └── .env          # Environment variables
└── frontend/         # Frontend production build
    ├── .next/        # Next.js build output
    └── package.json  # Frontend dependencies
\`\`\`

### Backend Deployment:
1. Navigate to build/backend/
2. Install production dependencies: \`npm install --production\`
3. Set environment variables (copy .env or set manually)
4. Start the server: \`npm start\`
5. Backend will run on port 3002 (or PORT env variable)

### Frontend Deployment:
1. Navigate to build/frontend/
2. Install dependencies: \`npm install\`
3. Start the frontend: \`npm start\`
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
- Build Date: $(date)
- Node.js Version: $NODE_VERSION
- npm Version: $NPM_VERSION

### Quick Start:
- Linux/Mac: \`./start-all.sh\`
- Windows: \`start-all.bat\`
EOF

echo "✅ Deployment instructions created"

# Final summary
echo "🎉 Build Process Completed Successfully!"
echo "================================================"
echo "📁 Build output: ./build/"
echo "📋 Deployment guide: ./build/DEPLOYMENT.md"
echo "🚀 Quick start: ./build/start-all.sh"
echo ""
echo "✅ Backend build: ./build/backend/"
echo "✅ Frontend build: ./build/frontend/"
echo "✅ Startup scripts created"
echo "✅ Deployment instructions created"
echo ""
echo "🌐 Ready for production deployment!"
