import { useState } from "react";
import { User } from "@/types/models";
import RecipientSelector from "./RecipientSelector";
import AmountInput from "./AmountInput";
import PaymentModal from "./PaymentModal";

interface MakePaymentFormProps {
  users: User[];
  currentUserAddress?: string;
  onPaymentComplete: (recipient: User, amount: string) => void;
}

export default function MakePaymentForm({ 
  users, 
  currentUserAddress, 
  onPaymentComplete 
}: MakePaymentFormProps) {
  const [selectedRecipient, setSelectedRecipient] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleMakePayment = () => {
    if (!selectedRecipient || !amount) return;
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    if (!selectedRecipient || !amount) return;
    
    setPaymentLoading(true);
    try {
      await onPaymentComplete(selectedRecipient, amount);
      
      // Reset form
      setSelectedRecipient(null);
      setAmount("");
      setShowPaymentModal(false);
      
    } catch (error) {
      console.error("Payment failed:", error);
      // Error handling can be improved with toast notifications
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Send Payment</h2>
          
          <div className="space-y-6">
            {/* Recipient Selector */}
            <RecipientSelector
              users={users}
              currentUserAddress={currentUserAddress}
              onRecipientSelect={setSelectedRecipient}
              selectedRecipient={selectedRecipient}
            />

            {/* Amount Input */}
            <AmountInput
              amount={amount}
              onAmountChange={setAmount}
            />

            {/* Continue Button */}
            <button
              onClick={handleMakePayment}
              disabled={!selectedRecipient || !amount || parseFloat(amount) <= 0}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-102 active:scale-95 shadow-lg"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedRecipient && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          recipient={selectedRecipient}
          amount={amount}
          isLoading={paymentLoading}
          onConfirm={confirmPayment}
        />
      )}
    </>
  );
}