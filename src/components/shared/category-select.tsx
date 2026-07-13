'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export const complaintCategories = [
  { id: 'roads', label: { mr: 'रस्ते', en: 'Roads' }, icon: '🛣️', color: 'bg-orange-100 text-orange-600' },
  { id: 'water', label: { mr: 'पाणी', en: 'Water' }, icon: '💧', color: 'bg-blue-100 text-blue-600' },
  { id: 'garbage', label: { mr: 'कचरा', en: 'Garbage' }, icon: '🗑️', color: 'bg-green-100 text-green-600' },
  { id: 'drainage', label: { mr: 'ड्रेनेज', en: 'Drainage' }, icon: '🚰', color: 'bg-purple-100 text-purple-600' },
  { id: 'street_lights', label: { mr: 'स्ट्रीट लाइट', en: 'Street Lights' }, icon: '💡', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'public_health', label: { mr: 'सार्वजनिक आरोग्य', en: 'Public Health' }, icon: '🏥', color: 'bg-red-100 text-red-600' },
  { id: 'trees', label: { mr: 'झाडे', en: 'Trees' }, icon: '🌳', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'animals', label: { mr: 'प्राणी', en: 'Animals' }, icon: '🐕', color: 'bg-amber-100 text-amber-600' },
  { id: 'illegal_construction', label: { mr: 'बेकायदेशीर बांधकाम', en: 'Illegal Construction' }, icon: '🏗️', color: 'bg-rose-100 text-rose-600' },
  { id: 'noise', label: { mr: 'आवाज प्रदूषण', en: 'Noise Pollution' }, icon: '📢', color: 'bg-indigo-100 text-indigo-600' },
  { id: 'other', label: { mr: 'इतर', en: 'Other' }, icon: '📋', color: 'bg-gray-100 text-gray-600' },
];

interface CategorySelectProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export function CategorySelect({ selectedCategory, onSelect }: CategorySelectProps) {
  const { locale } = useTranslation();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {complaintCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedCategory === category.id
              ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
              : 'border-gray-200 hover:border-orange-300 hover:shadow'
          }`}
        >
          <div className="text-3xl mb-2">{category.icon}</div>
          <div className="text-sm font-medium text-gray-900">
            {locale === 'mr' ? category.label.mr : category.label.en}
          </div>
        </button>
      ))}
    </div>
  );
}
