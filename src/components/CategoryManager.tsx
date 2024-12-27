import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import type { Category } from '../types/finance';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoryManager({ 
  categories = [],
  onAddCategory, 
  onDeleteCategory 
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory({
        name: newCategory.trim(),
        type: 'expense',
        icon: 'tag'
      });
      setNewCategory('');
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Categories</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-blue-500 hover:text-blue-400 flex items-center gap-2"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="mb-4 flex gap-2"
        >
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="flex-1 rounded-lg bg-gray-700 border-gray-600 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
          >
            <span className="text-white">{category.name}</span>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}