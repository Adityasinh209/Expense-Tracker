import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '../types/finance';
import { categories } from '../data/categories';
import { formatCurrency } from '../utils/formatters';
import { formatDate } from '../utils/date';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
      <div className="flex items-center gap-3">
        {transaction.type === 'income' ? (
          <ArrowUpCircle className="w-8 h-8 text-green-500" />
        ) : (
          <ArrowDownCircle className="w-8 h-8 text-red-500" />
        )}
        <div>
          <p className="font-bold text-white">{getCategoryName(transaction.category)}</p>
          <p className="text-sm text-gray-300">{transaction.description}</p>
          <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <p className={`font-bold ${
        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
      }`}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}