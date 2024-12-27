import { useState, useEffect } from 'react';
import type { User, LoginFormData, SignupFormData } from '../types/auth';
import { saveUser, getUser } from '../utils/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId).then(user => {
        setUser(user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginFormData) => {
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: 'User',
      openingBalance: 0,
      createdAt: new Date().toISOString()
    };
    await saveUser(user);
    localStorage.setItem('userId', user.id);
    setUser(user);
  };

  const signup = async (data: SignupFormData) => {
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      openingBalance: data.openingBalance,
      createdAt: new Date().toISOString()
    };
    await saveUser(user);
    localStorage.setItem('userId', user.id);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return { user, loading, login, signup, logout };
}