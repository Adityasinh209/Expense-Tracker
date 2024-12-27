import { openDB } from 'idb';
import type { User } from '../types/auth';
import type { Transaction } from '../types/finance';

const DB_NAME = 'MoneyTrackerDB';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('transactions')) {
        db.createObjectStore('transactions', { keyPath: 'id' });
      }
    },
  });
}

export async function saveUser(user: User) {
  const db = await initDB();
  await db.put('users', user);
}

export async function getUser(id: string) {
  const db = await initDB();
  return db.get('users', id);
}

export async function saveTransaction(transaction: Transaction) {
  const db = await initDB();
  await db.put('transactions', transaction);
}

export async function getTransactions(userId: string) {
  const db = await initDB();
  const all = await db.getAll('transactions');
  return all.filter(t => t.userId === userId);
}