export const calculateBalance = (openingBalance: number, transactions: Array<{ type: 'income' | 'expense', amount: number }>) => {
  return transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
  }, openingBalance);
};