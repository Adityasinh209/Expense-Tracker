import React from 'react';
import { Calendar } from 'lucide-react';

interface MonthPickerProps {
  value: string;
  onChange: (month: string) => void;
}

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Calendar className="w-5 h-5 text-blue-500" />
      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}