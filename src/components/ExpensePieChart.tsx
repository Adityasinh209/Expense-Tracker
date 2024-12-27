import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  transactions: Transaction[];
  month: string;
}

export function ExpensePieChart({ transactions, month }: ExpensePieChartProps) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: string, index: number) => ({
              text: `${label} (${formatCurrency(data.datasets[0].data[index])})`,
              fillStyle: data.datasets[0].backgroundColor[index],
              hidden: false,
              index,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return ` ${formatCurrency(value)}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-white mb-4">Monthly Expenses by Category</h3>
      <div className="h-[300px]">
        {Object.keys(expensesByCategory).length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No expenses for this month
          </div>
        )}
      </div>
    </div>
  );
}