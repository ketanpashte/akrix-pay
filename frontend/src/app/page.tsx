'use client';

import { useState } from 'react';
import { FormData } from '@/types';
import { MultiStepForm } from '@/components/MultiStepForm';
import { RazorpayPayment } from '@/components/RazorpayPayment';
import { PaymentSuccess } from '@/components/PaymentSuccess';
import { PaymentFailure } from '@/components/PaymentFailure';
import { DirectReceiptGenerator } from '@/components/DirectReceiptGenerator';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, FileText, Users } from 'lucide-react';
import Link from 'next/link';

type AppState = 'form' | 'payment' | 'success' | 'failure' | 'direct';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('form');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<any>(null);

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setFormData(data);
    setAppState('payment');
  };

  const handlePaymentSuccess = (data: any) => {
    console.log('Payment successful:', data);
    // Combine payment data with form data for the success page
    const successData = {
      ...data,
      amount: formData?.amount || 0,
      customerName: formData?.name || '',
      customerEmail: formData?.email || '',
    };
    setPaymentData(successData);
    setAppState('success');
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentError(error);
    setAppState('failure');
  };

  const handleRetryPayment = () => {
    setPaymentError(null);
    setAppState('payment');
  };

  const handleNewPayment = () => {
    setAppState('form');
    setFormData(null);
    setPaymentData(null);
    setPaymentError(null);
  };

  const handleDirectReceipt = () => {
    setAppState('direct');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Akrix Payment System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Choose your preferred payment method and generate professional receipts instantly
          </motion.p>
        </div>

        {/* Payment Options */}
        {(appState === 'form' && !formData) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Card Payment</h3>
                <p className="text-gray-600 mb-4">Pay securely with your credit or debit card using Razorpay</p>
                <button
                  onClick={() => setAppState('card-form')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Pay with Card
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <QrCode className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">QR Payment</h3>
                <p className="text-gray-600 mb-4">Scan QR code and pay using any UPI app</p>
                <Link
                  href="/qr-payment"
                  className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 text-center"
                >
                  Pay with QR
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Direct Receipt</h3>
                <p className="text-gray-600 mb-4">Generate receipt directly without payment processing</p>
                <button
                  onClick={handleDirectReceipt}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Generate Receipt
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Admin Link */}
        {(appState === 'form' && !formData) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="/admin"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Admin Portal
            </Link>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto py-8">
        {appState === 'card-form' && (
          <MultiStepForm
            onSubmit={handleFormSubmit}
            isLoading={false}
          />
        )}

        {appState === 'payment' && formData && (
          <RazorpayPayment
            formData={formData}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        )}

        {appState === 'success' && paymentData && (
          <PaymentSuccess
            paymentData={paymentData}
            onNewPayment={handleNewPayment}
          />
        )}

        {appState === 'failure' && (
          <PaymentFailure
            error={paymentError}
            onRetry={handleRetryPayment}
            onNewPayment={handleNewPayment}
          />
        )}

        {appState === 'direct' && (
          <DirectReceiptGenerator />
        )}
      </div>
    </div>
  );
}
