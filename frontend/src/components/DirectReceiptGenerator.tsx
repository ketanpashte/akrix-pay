'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, User, Mail, Phone, MapPin, CreditCard, DollarSign } from 'lucide-react';

interface DirectReceiptForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  amount: number;
  paymentMode: string;
  description?: string;
}

export function DirectReceiptGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DirectReceiptForm>();

  const onSubmit = async (data: DirectReceiptForm) => {
    try {
      setIsGenerating(true);
      
      console.log('📄 Generating direct receipt with data:', data);

      const response = await fetch('http://localhost:3002/api/receipt/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `receipt-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('✅ Receipt generated and downloaded successfully');
      
      // Reset form
      reset();
      
      // Show success message
      alert('Receipt generated and downloaded successfully!');
      
    } catch (error: any) {
      console.error('💥 Error generating receipt:', error);
      alert(`Failed to generate receipt: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Direct Receipt Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate professional receipts instantly without payment processing
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customer Information
            </h3>

            <motion.div
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('customerName', { required: 'Customer name is required' })}
                  type="text"
                  id="customerName"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter customer's full name"
                />
              </div>
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerName.message}</p>
              )}
            </motion.div>

            <motion.div
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('customerEmail', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  id="customerEmail"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter customer's email address"
                />
              </div>
              {errors.customerEmail && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerEmail.message}</p>
              )}
            </motion.div>

            <motion.div
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('customerPhone', { required: 'Phone number is required' })}
                  type="tel"
                  id="customerPhone"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter customer's phone number"
                />
              </div>
              {errors.customerPhone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerPhone.message}</p>
              )}
            </motion.div>

            <motion.div
              custom={3}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  {...register('customerAddress', { required: 'Address is required' })}
                  id="customerAddress"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter customer's complete address"
                />
              </div>
              {errors.customerAddress && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerAddress.message}</p>
              )}
            </motion.div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment Information
            </h3>

            <motion.div
              custom={4}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 1, message: 'Amount must be greater than 0' }
                  })}
                  type="number"
                  step="0.01"
                  id="amount"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter amount (₹)"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount.message}</p>
              )}
            </motion.div>

            <motion.div
              custom={5}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Mode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register('paymentMode', { required: 'Payment mode is required' })}
                  id="paymentMode"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select payment mode</option>
                  <option value="cash">Cash</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="wallet">Digital Wallet</option>
                  <option value="cheque">Cheque</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              {errors.paymentMode && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.paymentMode.message}</p>
              )}
            </motion.div>

            <motion.div
              custom={6}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter payment description or notes (optional)"
              />
            </motion.div>
          </div>

          {/* Generate Button */}
          <motion.button
            custom={7}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Receipt...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Generate & Download Receipt
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
