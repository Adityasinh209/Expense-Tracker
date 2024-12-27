import React, { useState } from 'react';
import { IndianRupee, Edit2, Check } from 'lucide-react';

interface BalanceProps {
  opening: number;
  current: number;
  onUpdateOpeningBalance: (amount: number) => void;
}

export function Balance({ opening, current, onUpdateOpeningBalance }: BalanceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(opening.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newBalance);
    if (!isNaN(amount) && isFinite(amount)) {
      onUpdateOpeningBalance(amount);
      setIsEditing(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-gray-300">Opening Balance</h3>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-white"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              className="w-full bg-gray-700 rounded-lg text-white px-2 py-1"
              step="0.01"
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <Check className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <p className="text-2xl font-bold text-white">₹{opening.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        )}
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee className="w-5 h-5 text-green-500" />
          <h3 className="text-sm font-bold text-gray-300">Current Balance</h3>
        </div>
        <p className="text-2xl font-bold text-white">₹{current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}