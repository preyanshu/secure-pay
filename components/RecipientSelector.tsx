import { useState, useEffect } from "react";
import { User } from "@/types/models";

interface RecipientSelectorProps {
  users: User[];
  currentUserAddress?: string;
  onRecipientSelect: (user: User) => void;
  selectedRecipient: User | null;
}

export default function RecipientSelector({ 
  users, 
  currentUserAddress, 
  onRecipientSelect, 
  selectedRecipient 
}: RecipientSelectorProps) {
  const [recipientName, setRecipientName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter users based on recipient name input
  useEffect(() => {
    if (recipientName.trim() && users.length > 0) {
      const filtered = users
        .filter(user => user.walletAddress.toLowerCase() !== currentUserAddress?.toLowerCase())
        .filter(user => 
          user.name.toLowerCase().includes(recipientName.toLowerCase()) ||
          user.walletAddress.toLowerCase().includes(recipientName.toLowerCase())
        )
        .slice(0, 5); // Show max 5 results
      setFilteredUsers(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  }, [recipientName, users, currentUserAddress]);

  const handleRecipientSelect = (user: User) => {
    onRecipientSelect(user);
    setRecipientName(user.name);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientName(e.target.value);
    if (selectedRecipient) {
      onRecipientSelect(null as any); // Clear selection when typing
    }
  };

  return (
    <div className="space-y-4">
      {/* Recipient Search Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Recipient Name
        </label>
        <input
          type="text"
          value={recipientName}
          onChange={handleInputChange}
          placeholder="Enter recipient name or address..."
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        
        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.walletAddress}
                onClick={() => handleRecipientSelect(user)}
                className="px-4 py-3 hover:bg-slate-600 cursor-pointer transition-colors border-b border-slate-600/30 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-slate-400 text-xs font-mono">{user.walletAddress}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Recipient Display */}
      {selectedRecipient && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {selectedRecipient.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-green-400 font-semibold">{selectedRecipient.name}</p>
              <p className="text-slate-400 text-sm font-mono">{selectedRecipient.walletAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}