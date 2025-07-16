# 🚂 Railway Deployment Guide - Fixed for Node.js 20 Compatibility

## ✅ **Issues Fixed**

Both the `crypto is not defined` error and Node.js version compatibility have been resolved:

1. **Node.js Version**: Updated to Node.js 20+ for full compatibility
2. **Crypto Polyfill**: Added webcrypto polyfill in main.ts
3. **Railway Config**: Updated nixpacks.toml for Node.js 20
4. **Dependencies**: Compatible with Node.js 20 requirements
5. **Legacy Peer Deps**: Added for dependency resolution

## 🚀 **Railway Deployment Steps**

### **Step 1: Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Verify your email

### **Step 2: Deploy from GitHub**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `akrix-pay` repository
4. Select the service that gets created

### **Step 3: Configure Root Directory**
1. Go to "Settings" tab
2. Set "Root Directory" to `builds/backend-build`
3. Save changes

### **Step 4: Add Environment Variables**
Go to "Variables" tab and add:

```env
DATABASE_URL=postgresql://postgres:[Ketan@1234]@db.rzttkkzwniktbqhofxgi.supabase.co:5432/postgres
SUPABASE_URL=https://rzttkkzwniktbqhofxgi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dHRra3p3bmlrdGJxaG9meGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODgzODcsImV4cCI6MjA2NzU2NDM4N30.8E4t1LMqcXA5LctnXEY14w4KQIcMbcMI9oGG35cKNoA
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=akrix.ai@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_PASSWORD=admin123
PORT=3000
NODE_ENV=production
```

### **Step 5: Deploy**
1. Railway will automatically detect the Node.js app
2. It will use the nixpacks.toml configuration
3. Build should complete successfully
4. Get your Railway URL (e.g., `https://akrix-pay-backend.railway.app`)

## 🔧 **What Was Fixed**

### **1. Node.js Version**
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=8.0.0"
}
```

### **2. Crypto Polyfill**
```typescript
import { webcrypto } from 'crypto';

if (!global.crypto) {
  global.crypto = webcrypto as any;
}
```

### **3. Railway Configuration**
```toml
[phases.setup]
nixPkgs = ['nodejs_20', 'npm-10_x']

[phases.install]
cmds = ['npm ci --production --legacy-peer-deps']

[start]
cmd = 'npm run start:prod'
```

### **4. Node.js Version File**
```
20.11.0
```

## 🧪 **Test Your Deployment**

After deployment, test these endpoints:

1. **Health Check**: `GET https://your-app.railway.app/`
2. **API Test**: `GET https://your-app.railway.app/api`
3. **Receipt Generation**: `POST https://your-app.railway.app/api/receipt/generate`

## 🔗 **Next Steps**

1. **Copy your Railway URL**
2. **Update frontend environment variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-app.railway.app
   ```
3. **Deploy frontend to Vercel**
4. **Test complete integration**

## 🆘 **If You Still Get Errors**

### **Alternative Fix 1: Force Node.js 18**
Add to Railway environment variables:
```env
NODE_VERSION=18.20.5
```

### **Alternative Fix 2: Use Different Start Command**
In Railway settings, set custom start command:
```bash
node --experimental-global-webcrypto dist/main.js
```

## 📞 **Support**

If you encounter any issues:
- **Email**: akrix.ai@gmail.com
- **Phone**: 8390690910

**Your backend should now deploy successfully on Railway!** 🎉
