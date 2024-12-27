import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '../types/finance';
import { categories } from '../data/categories';
import { formatCurrency } from '../utils/formatters';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}