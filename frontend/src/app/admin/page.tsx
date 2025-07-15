'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLogin from '../../components/AdminLogin';
import { 
  Users, 
  Receipt, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';

interface DashboardStats {
  overview: {
    totalPayments: number;
    successfulPayments: number;
    totalReceipts: number;
    totalUsers: number;
    totalRevenue: number;
    successRate: number;
  };
  recentPayments: Record<string, unknown>[];
  monthlyStats: Record<string, unknown>[];
}

interface Receipt {
  id: string;
  receiptNumber: string;
  generatedAt: string;
  payment: {
    amount: number;
    status: string;
    paymentMode: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // const [currentPage, setCurrentPage] = useState(1); // TODO: Implement pagination
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (_token: string) => {
    setIsAuthenticated(true);
    setLoading(true);
    fetchDashboardData();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setStats(null);
    setReceipts([]);
  };

  const fetchDashboardData = async () => {
    try {
      // Try to fetch real data from API
      try {
        const [statsResponse, receiptsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/receipts`)
        ]);

        if (statsResponse.ok && receiptsResponse.ok) {
          const statsData = await statsResponse.json();
          const receiptsData = await receiptsResponse.json();
          setStats(statsData);
          setReceipts(receiptsData.receipts || []);
          setLoading(false);
          return;
        }
      } catch {
        console.log('API not available, using mock data');
      }

      // Fallback to mock data for demonstration
      const mockStats: DashboardStats = {
        overview: {
          totalPayments: 156,
          successfulPayments: 142,
          totalReceipts: 142,
          totalUsers: 89,
          totalRevenue: 245670,
          successRate: 91.03,
        },
        recentPayments: [
          {
            id: '1',
            amount: 1500,
            user: { name: 'John Doe', email: 'john@example.com' },
            createdAt: new Date().toISOString(),
            status: 'success',
          },
          {
            id: '2',
            amount: 2300,
            user: { name: 'Jane Smith', email: 'jane@example.com' },
            createdAt: new Date().toISOString(),
            status: 'success',
          },
        ],
        monthlyStats: [],
      };

      const mockReceipts: Receipt[] = [
        {
          id: '1',
          receiptNumber: 'AKRX-20250108-0001',
          generatedAt: new Date().toISOString(),
          payment: {
            amount: 1500,
            status: 'success',
            paymentMode: 'card',
            user: {
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        },
        {
          id: '2',
          receiptNumber: 'AKRX-20250108-0002',
          generatedAt: new Date().toISOString(),
          payment: {
            amount: 2300,
            status: 'success',
            paymentMode: 'upi',
            user: {
              name: 'Jane Smith',
              email: 'jane@example.com',
            },
          },
        },
      ];

      setStats(mockStats);
      setReceipts(mockReceipts);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = async (receiptId: string, receiptNumber: string) => {
    try {
      setDownloadingId(receiptId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/receipt/download/${receiptId}`);

      if (!response.ok) {
        throw new Error('Failed to download receipt');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `receipt-${receiptNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Failed to download receipt. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor payments, receipts, and system performance
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(stats.overview.totalRevenue)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Receipts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.overview.totalReceipts}
                  </p>
                </div>
                <Receipt className="w-8 h-8 text-blue-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.overview.totalUsers}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.overview.successRate.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Receipts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Receipts
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search receipts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {receipt.receiptNumber}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {receipt.payment.paymentMode.toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {receipt.payment.user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {receipt.payment.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(receipt.payment.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(receipt.generatedAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadReceipt(receipt.id, receipt.receiptNumber)}
                          disabled={downloadingId === receipt.id}
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50"
                        >
                          {downloadingId === receipt.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
