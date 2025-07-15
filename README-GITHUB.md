# Akrix Pay - Receipt Generator

A modern, full-stack receipt generation and payment processing system built with Next.js and NestJS.

![Akrix Solution](https://img.shields.io/badge/Akrix-Solution-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red)
![Supabase](https://img.shields.io/badge/Database-Supabase-green)
![Razorpay](https://img.shields.io/badge/Payment-Razorpay-blue)

## 🌟 **Live Demo**
- **Frontend**: [Coming Soon]
- **Admin Portal**: [Coming Soon]

## 📱 **Features**

### 💳 **Payment Processing**
- ✅ **Razorpay Integration** - Secure online payments
- ✅ **QR Code Payments** - UPI payment system with verification
- ✅ **Manual Receipt Generation** - Direct receipt creation
- ✅ **Payment Verification** - UTR number validation

### 📄 **Receipt Management**
- ✅ **Professional PDF Generation** - Branded receipt PDFs
- ✅ **Email Delivery** - Automatic receipt emails
- ✅ **Download System** - Instant PDF downloads
- ✅ **Receipt History** - Complete payment records

### 🔐 **Admin Portal**
- ✅ **Dashboard Analytics** - Payment statistics
- ✅ **Receipt Management** - View and download all receipts
- ✅ **User Management** - Customer data management
- ✅ **Secure Authentication** - Admin login system

### 🎨 **User Experience**
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Theme** - Theme switching
- ✅ **Smooth Animations** - Framer Motion integration
- ✅ **Professional Branding** - Akrix Solution styling

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF**: jsPDF
- **HTTP Client**: Axios

### **Backend**
- **Framework**: NestJS
- **Database**: Supabase (PostgreSQL)
- **ORM**: TypeORM
- **Payment**: Razorpay SDK
- **Email**: NodeMailer
- **PDF**: PDFKit
- **Authentication**: bcrypt

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/akrix-pay.git
cd akrix-pay
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**

Create `.env` file in the backend directory:
```env
# Database Configuration
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Admin Configuration
ADMIN_PASSWORD=admin123

# Server Configuration
PORT=3002
```

4. **Run the application**

```bash
# Start backend (Terminal 1)
cd backend
npm run start:dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3002
- Admin Portal: http://localhost:3000/admin

## 📁 **Project Structure**

```
akrix-pay/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── controllers/     # API Controllers
│   │   ├── services/        # Business Logic
│   │   ├── entities/        # Database Entities
│   │   ├── dto/            # Data Transfer Objects
│   │   └── config/         # Configuration
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router Pages
│   │   ├── components/     # React Components
│   │   ├── services/       # API Services
│   │   ├── types/          # TypeScript Types
│   │   └── utils/          # Utility Functions
│   └── package.json
├── build/                  # Production Build
├── build.ps1              # Windows Build Script
├── build.sh               # Linux/Mac Build Script
└── README.md
```

## 🔧 **API Endpoints**

### **Receipt Management**
- `POST /api/receipt/generate` - Generate receipt
- `GET /api/receipt/download/:id` - Download receipt PDF
- `POST /api/receipt/send-email/:id` - Send receipt via email

### **Payment Processing**
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/qr-payment` - QR payment processing

### **Admin Portal**
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/receipts` - Get all receipts
- `GET /api/admin/payments` - Get payment history
- `GET /api/admin/stats` - Dashboard statistics

## 🚀 **Deployment**

### **Production Build**
```bash
# Build for production
npm run build

# Or use build scripts
./build.ps1    # Windows
./build.sh     # Linux/Mac
```

### **Deploy to Vercel (Frontend)**
```bash
cd frontend
vercel --prod
```

### **Deploy to Railway/Heroku (Backend)**
```bash
cd backend
# Follow platform-specific deployment guides
```

## 📞 **Contact & Support**

**Akrix Solution**
- **Email**: akrix.ai@gmail.com
- **Phone**: 8390690910
- **Website**: https://akrixai.netlify.app/

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ **Show your support**

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by Akrix Solution**
