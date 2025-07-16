# 🚀 Complete Deployment Guide - Receipt Generator

## 📋 **Deployment Architecture**

- **Frontend (Next.js)** → **Vercel** ✅ (Perfect match)
- **Backend (NestJS)** → **Railway/Render/Heroku** ✅ (Node.js hosting)
- **Database** → **Supabase** ✅ (Already configured)

## 🎯 **Option 1: Recommended Deployment**

### **Frontend on Vercel + Backend on Railway**

---

## 🌐 **STEP 1: Deploy Frontend to Vercel**

### **1.1 Prepare Frontend for Vercel**

First, let's configure the frontend for static deployment:

```bash
cd frontend
```

### **1.2 Update Environment Variables**

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### **1.3 Deploy to Vercel**

**Method A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

**Method B: GitHub Integration**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `akrix-pay` repository
5. Set Root Directory to `frontend`
6. Deploy

---

## 🔧 **STEP 2: Deploy Backend to Railway**

### **2.1 Prepare Backend**

```bash
cd backend
```

### **2.2 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your repository

### **2.3 Deploy Backend**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `akrix-pay` repository
4. Set Root Directory to `backend`
5. Add environment variables (see below)

### **2.4 Environment Variables for Railway**
```env
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=https://rzttkkzwniktbqhofxgi.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=akrix.ai@gmail.com
EMAIL_PASS=your_app_password
ADMIN_PASSWORD=admin123
PORT=3000
```

---

## 🎯 **Option 2: All-in-One Vercel (Advanced)**

### **Convert Backend to Vercel Functions**

This requires restructuring the backend into serverless functions.

---

## 📝 **STEP 3: Update Frontend API URLs**

After backend deployment, update frontend to use production API:

### **3.1 Update API Configuration**

Edit `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
```

### **3.2 Update Environment Variables**

In Vercel dashboard:
1. Go to your project settings
2. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay key

---

## 🔄 **STEP 4: Test Deployment**

### **4.1 Test Frontend**
- Visit your Vercel URL
- Test all pages and components
- Verify API connections

### **4.2 Test Backend**
- Test API endpoints
- Verify database connections
- Test payment processing

---

## 🛠️ **Alternative Hosting Options**

### **Backend Hosting Alternatives:**
1. **Railway** (Recommended) - Easy GitHub integration
2. **Render** - Free tier available
3. **Heroku** - Classic choice
4. **DigitalOcean App Platform** - Scalable
5. **AWS/Google Cloud** - Enterprise level

### **Frontend Hosting Alternatives:**
1. **Vercel** (Recommended) - Best for Next.js
2. **Netlify** - Good alternative
3. **GitHub Pages** - Free static hosting
4. **Cloudflare Pages** - Fast global CDN

---

## 📋 **Quick Deployment Checklist**

### **Pre-deployment:**
- [ ] Environment variables configured
- [ ] Database accessible from internet
- [ ] Email credentials working
- [ ] Razorpay keys valid
- [ ] Domain/subdomain ready (optional)

### **Frontend Deployment:**
- [ ] Vercel account created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Build successful
- [ ] Custom domain configured (optional)

### **Backend Deployment:**
- [ ] Railway/hosting account created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Database connected
- [ ] API endpoints working

### **Post-deployment:**
- [ ] Frontend connects to backend
- [ ] Payment processing works
- [ ] Email delivery works
- [ ] PDF generation works
- [ ] Admin portal accessible

---

## 🔗 **Expected URLs After Deployment**

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **Admin**: `https://your-project.vercel.app/admin`
- **API**: `https://your-backend.railway.app/api`

---

## 🆘 **Troubleshooting**

### **Common Issues:**
1. **CORS Errors**: Update backend CORS settings
2. **Environment Variables**: Double-check all variables
3. **Database Connection**: Verify Supabase URL and keys
4. **Build Failures**: Check logs in deployment platform
5. **API Not Found**: Verify backend URL in frontend

### **Support:**
- **Email**: akrix.ai@gmail.com
- **Phone**: 8390690910
- **Repository**: https://github.com/ketanpashte/akrix-pay
