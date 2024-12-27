export const categories = [
  { id: 'food', name: 'Food', type: 'expense' },
  { id: 'laundry', name: 'Laundry', type: 'expense' },
  { id: 'medicine', name: 'Medicine', type: 'expense' },
  { id: 'taxi', name: 'Taxi', type: 'expense' }
] as const;

export type CategoryId = typeof categories[number]['id'];