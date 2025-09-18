import { useState, useEffect } from "react";

interface Payment {
  id: string;
  recipientName: string;
  recipientAddress: string;
  amount: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  expiryTimestamp?: string;
  currency?: string;
}

interface PaymentHistoryProps {
  userAddress?: string;
}

export default function PaymentHistory({ userAddress }: PaymentHistoryProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const fetchPayments = async () => {
    if (!userAddress) return;
    
    setLoading(true);
    try {
      // This would be your API call to fetch user's payment history
      // const res = await fetch(`/api/payments?address=${userAddress}`);
      // const data = await res.json();
      
      // Mock data for now
      const mockPayments: Payment[] = [
        {
          id: "1",
          recipientName: "John Doe",
          recipientAddress: "0x1234...5678",
          amount: "0.5",
          timestamp: "2024-01-15T10:30:00Z",
          status: "completed",
          currency: "ETH"
        },
        {
          id: "2",
          recipientName: "Alice Smith",
          recipientAddress: "0xabcd...efgh",
          amount: "1.2",
          timestamp: "2024-01-14T14:20:00Z",
          status: "pending",
          currency: "ETH"
        },
        {
          id: "3",
          recipientName: "Bob Wilson",
          recipientAddress: "0x9876...5432",
          amount: "0.25",
          timestamp: "2024-01-13T16:45:00Z",
          status: "failed",
          currency: "ETH"
        }
      ];
      
      setPayments(mockPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userAddress]);

  const filteredPayments = payments.filter(payment => 
    filter === 'all' || payment.status === filter
  );

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Payment History</h2>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredPayments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {filter === 'all' ? 'No payments found' : `No ${filter} payments found`}
          </h3>
          <p className="text-slate-400">
            {filter === 'all' 
              ? "You haven't made any payments yet" 
              : `You don't have any ${filter} payments`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {payment.recipientName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{payment.recipientName}</h3>
                    <p className="text-slate-400 font-mono text-sm">{payment.recipientAddress}</p>
                    <p className="text-slate-500 text-sm">
                      {new Date(payment.timestamp).toLocaleDateString()} at {new Date(payment.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {payment.amount} {payment.currency || 'ETH'}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                  
                  {/* Action buttons for pending/failed payments */}
                  {payment.status !== 'completed' && (
                    <div className="mt-2 space-x-2">
                      {payment.status === 'pending' && (
                        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors">
                          View Details
                        </button>
                      )}
                      {payment.status === 'failed' && (
                        <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors">
                          Retry
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Refresh Button */}
      <div className="text-center mt-8">
        <button
          onClick={fetchPayments}
          disabled={loading}
          className="px-6 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}