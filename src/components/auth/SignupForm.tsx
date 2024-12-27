import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import type { SignupFormData } from '../../types/auth';

interface SignupFormProps {
  onSignup: (data: SignupFormData) => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    name: '',
    openingBalance: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Opening Balance
            </label>
            <input
              type="number"
              value={formData.openingBalance}
              onChange={(e) => setFormData(prev => ({ ...prev, openingBalance: parseFloat(e.target.value) }))}
              className="w-full rounded-lg bg-gray-700 border-gray-600 text-white"
              required
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:text-blue-400"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}