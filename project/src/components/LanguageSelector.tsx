import React from 'react';
import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇲🇷' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
  { code: 'ff', name: 'Pulaar', flag: '🇸🇳' },
  { code: 'snk', name: 'Soninké', flag: '🇲🇱' },
];

export function LanguageSelector() {
  const { state, setLanguage } = useApp();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {languages.find(l => l.code === state.currentLanguage)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              state.currentLanguage === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}