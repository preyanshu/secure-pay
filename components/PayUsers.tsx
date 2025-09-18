"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/models";
import { useAccount } from "wagmi";
import { depositForReceiver } from "@/utils/contractUtil";

// Import all the components
import PaymentSidebar from "@/components/PaymentSidebar";
import MakePaymentForm from "@/components/MakePaymentForm";
import PaymentHistory from "@/components/PaymentHistory";

export default function PayPage() {
  const { address } = useAccount();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"make" | "view">("make");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          // filter out logged-in user from the list
          const filtered = data.users.filter(
            (u: User) => u.walletAddress.toLowerCase() !== address?.toLowerCase()
          );
          setUsers(filtered);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (address) fetchUsers();
  }, [address]);

  if (!address) {
    // If wallet not connected show a placeholder / connect component
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">
          Please connect your wallet to access the payment page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading users…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with tab switching */}
      <PaymentSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 p-6">
        {activeTab === "make" ? (
          <MakePaymentForm
            users={users}
            onSubmit={async (receiver, expiryTimestamp, amount) => {
              try {
                await depositForReceiver(receiver, expiryTimestamp, amount);
                alert("Payment sent successfully!");
              } catch (err) {
                console.error("Payment failed:", err);
                alert("Payment failed. Check console for details.");
              }
            }}
          />
        ) : (
          <PaymentHistory />
        )}
      </div>
    </div>
  );
}
