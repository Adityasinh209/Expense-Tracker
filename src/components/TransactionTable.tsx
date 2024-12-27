import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import type { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/formatters';
import { formatDate } from '../utils/date';

interface TransactionTableProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export function TransactionTable({ transactions, onEditTransaction, onDeleteTransaction }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-4 text-gray-300 font-semibold">Date</th>
            <th className="p-4 text-gray-300 font-semibold">Method</th>
            <th className="p-4 text-gray-300 font-semibold">Type</th>
            <th className="p-4 text-gray-300 font-semibold">Amount</th>
            <th className="p-4 text-gray-300 font-semibold">Note</th>
            <th className="p-4 text-gray-300 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <motion.tr
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-t border-gray-700"
            >
              <td className="p-4 text-white">{formatDate(transaction.date)}</td>
              <td className="p-4 text-white capitalize">{transaction.paymentMethod}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  transaction.type === 'income' 
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-red-900/50 text-red-400'
                }`}>
                  {transaction.type}
                </span>
              </td>
              <td className={`p-4 font-medium ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatCurrency(transaction.amount)}
              </td>
              <td className="p-4 text-white">{transaction.description}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditTransaction(transaction)}
                    className="p-1 text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}