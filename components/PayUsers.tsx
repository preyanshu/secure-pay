"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/models";
import { useAccount } from "wagmi";
import { getCurrentTimestamp } from "@/utils/contractUtil";

export default function PayPage() {
  const { address } = useAccount();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) setUsers(data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelect = (wallet: string) => {
    setSelected(wallet === selected ? null : wallet);
  };
  
  const handlePay = async () => {
     try {
      const u = await getCurrentTimestamp();
      console.log("timestamp", u);
      
     } catch (error) {
      
     }
  }

  const filteredUsers = users
  .filter(user => user.walletAddress.toLowerCase() !== address?.toLowerCase()) // exclude self
  .filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const selectedUser = users.find(user => user.walletAddress === selected);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading users...</p>
          <p className="text-slate-400 mt-2">Please wait while we fetch the user list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Send Payment</h1>
            <p className="text-slate-400">Select a recipient to send your payment</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-slate-400">
              {searchTerm ? "Try adjusting your search terms" : "No registered users available"}
            </p>
          </div>
        ) : (
          <>
            {/* Users Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {filteredUsers.map((user) => (
                <div
                  key={user.walletAddress}
                  className={`group relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-102 ${
                    selected === user.walletAddress
                      ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 ring-2 ring-blue-400 shadow-blue-500/25"
                      : "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
                  }`}
                  onClick={() => handleSelect(user.walletAddress)}
                >
                  {/* Selection Indicator */}
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selected === user.walletAddress
                      ? "bg-blue-500 border-blue-500"
                      : "border-slate-400 group-hover:border-slate-300"
                  }`}>
                    {selected === user.walletAddress && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* User Info */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-slate-400 font-mono text-sm break-all leading-relaxed">
                    {user.walletAddress}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Selected User Payment Section */}
        {selected && selectedUser && (
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 p-6 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Selected User Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sending payment to:</p>
                    <p className="text-blue-400 font-semibold text-lg">{selectedUser.name}</p>
                    <p className="text-slate-400 font-mono text-sm">{selected}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-3 bg-slate-600 cursor-pointer text-white rounded-xl hover:bg-slate-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r cursor-pointer from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-102 active:scale-95"
                   onClick={handlePay}
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Proceed to Pay</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}