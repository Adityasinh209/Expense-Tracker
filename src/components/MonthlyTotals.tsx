import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/formatters';
import { getMonthYear } from '../utils/date';

interface MonthlyTotalsProps {
  transactions: Transaction[];
  selectedMonth: string;
}

export function MonthlyTotals({ transactions, selectedMonth }: MonthlyTotalsProps) {
  const monthlyTransactions = transactions.filter(
    t => getMonthYear(t.date) === selectedMonth
  );

  const totalIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="text-sm font-bold text-gray-300">Total Income</h3>
        </div>
        <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-red-500" />
          <h3 className="text-sm font-bold text-gray-300">Total Expenses</h3>
        </div>
        <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
      </div>
    </div>
  );
}