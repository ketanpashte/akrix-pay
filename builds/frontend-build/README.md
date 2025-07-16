# Akrix Pay Frontend - Production Build

## 🚀 Quick Deploy

### Vercel Deployment (Recommended)
1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory to this folder
4. Add environment variables from `.env.production`
5. Deploy

### Manual Deployment
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.production .env.local
# Edit .env.local with your actual values

# Start server
npm start
```

## 📋 Environment Variables Required

Copy `.env.production` to `.env.local` and update:
- `NEXT_PUBLIC_API_URL`: Your backend URL (Railway/Heroku)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay public key

## 🌟 Features

- ✅ Receipt Generation
- ✅ Payment Processing
- ✅ QR Code Payments
- ✅ Admin Dashboard
- ✅ Email Delivery
- ✅ PDF Downloads

## 📞 Support

**Akrix Solution**
- Email: akrix.ai@gmail.com
- Phone: 8390690910
- Website: https://akrixai.netlify.app/
