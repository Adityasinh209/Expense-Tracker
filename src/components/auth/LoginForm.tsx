import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import type { LoginFormData } from '../../types/auth';

interface LoginFormProps {
  onLogin: (data: LoginFormData) => void;
  onSwitchToSignup: () => void;
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <LogIn className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Login to Money Tracker</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full rounded-lg bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-500 hover:text-blue-400"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}