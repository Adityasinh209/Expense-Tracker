import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import type { Transaction } from './types/finance';
import type { User } from './types/auth';
import { Balance } from './components/Balance';
import { TransactionForm } from './components/TransactionForm';
import { TransactionTable } from './components/TransactionTable';
import { ExpensePieChart } from './components/ExpensePieChart';
import { MonthPicker } from './components/MonthPicker';
import { CategoryManager } from './components/CategoryManager';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { getMonthYear } from './utils/date';
import { motion } from 'framer-motion';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(getMonthYear(new Date().toISOString()));
  const [categories, setCategories] = useState([
    { id: 'food', name: 'Food', type: 'expense', icon: 'utensils' },
    { id: 'transport', name: 'Transport', type: 'expense', icon: 'car' },
    { id: 'shopping', name: 'Shopping', type: 'expense', icon: 'shopping-bag' }
  ]);

  const handleAddCategory = (category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: crypto.randomUUID() }]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Rest of your existing App component code...

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gray-900"
    >
      {/* Rest of your existing JSX */}
      <CategoryManager 
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </motion.div>
  );
}

export default App;