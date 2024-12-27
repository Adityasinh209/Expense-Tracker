import { Frame, Page, ScrollView } from '@nativescript/core';
import { Balance } from './Balance';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { MonthlyTotals } from './MonthlyTotals';
import { MonthPicker } from './MonthPicker';
import { useState } from 'react';
import type { Transaction } from '../types/finance';
import type { User } from '../types/auth';

export function AppContainer() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const currentBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
  }, user?.openingBalance || 0);

  const handleUpdateOpeningBalance = (newBalance: number) => {
    if (user) {
      setUser({ ...user, openingBalance: newBalance });
    }
  };

  return (
    <Frame>
      <Page className="page">
        <ScrollView>
          <Balance 
            opening={user?.openingBalance || 0}
            current={currentBalance}
            onUpdateOpeningBalance={handleUpdateOpeningBalance}
          />
          <MonthPicker />
          <MonthlyTotals transactions={transactions} />
          <TransactionForm />
          <TransactionList transactions={transactions} />
        </ScrollView>
      </Page>
    </Frame>
  );
}