# Akrix.ai Receipt Generator

A professional, modern, and interactive receipt generation web application built for Akrix.ai startup.

## 🚀 Features

- **Multi-step Animated Form**: Smooth form flow with validation
- **Payment Integration**: Razorpay integration (currently mocked)
- **PDF Receipt Generation**: Professional branded receipts
- **Admin Dashboard**: View all receipts and payments
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dark Mode**: Animated theme switching
- **Smooth Animations**: Framer Motion and Lenis scroll

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lenis** - Smooth scrolling
- **React Hook Form** - Form management
- **Zod** - Validation

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **Supabase** - Database
- **PDF Generation** - Receipt PDFs

## 📁 Project Structure

```
receipt-generator/
├── frontend/          # Next.js application
├── backend/           # NestJS API
├── shared/           # Shared types and utilities
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd receipt-generator
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**
```bash
# Copy environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

4. **Configure Supabase**
- Create a new Supabase project
- Update database URLs in environment files
- Run database migrations

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

### Backend (.env)
```
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🗄️ Database Schema

### Users
- id, name, email, phone, address

### Payments
- id, user_id, amount, payment_mode, status, date

### Receipts
- id, payment_id, receipt_number, generated_at

## 🎨 Brand Colors (Extracted from Logo)
- Primary: Gradient from #8B5CF6 to #F59E0B
- Secondary: #6366F1
- Accent: #EC4899

## 📱 API Endpoints

- `POST /api/payment/initiate` - Initialize payment
- `POST /api/payment/verify` - Verify payment
- `GET /api/receipt/:id` - Get receipt data
- `GET /api/admin/receipts` - Admin dashboard data

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
npm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@akrix.ai or create an issue in the repository.
