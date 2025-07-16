# Akrix Pay Backend - Production Build

## 🚀 Quick Deploy

### Railway Deployment (Recommended)
1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Set root directory to this folder
4. Add environment variables from `.env.production`
5. Deploy

### Manual Deployment
```bash
# Install dependencies
npm install --production

# Set environment variables
cp .env.production .env
# Edit .env with your actual values

# Start server
npm start
```

## 📋 Environment Variables Required

Copy `.env.production` to `.env` and update:
- `DATABASE_URL`: Your Supabase connection string
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Your Razorpay credentials
- `EMAIL_USER` & `EMAIL_PASS`: Your Gmail app password
- `ADMIN_PASSWORD`: Admin login password

## 🔗 API Endpoints

- `GET /` - Health check
- `POST /api/receipt/generate` - Generate receipt
- `POST /api/payment/create-order` - Create payment order
- `POST /api/admin/login` - Admin authentication

## 📞 Support

**Akrix Solution**
- Email: akrix.ai@gmail.com
- Phone: 8390690910
- Website: https://akrixai.netlify.app/
