import React from 'react';
import { Bell, Search } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/logo.png';

export function Header() {
  const { state } = useApp();
  const isRTL = state.currentLanguage === 'ar';

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 ${isRTL ? 'rtl' : ''}`}>
      <div className="flex items-center justify-between">
        {/* Logo + Search */}
        <div className="flex items-center flex-1 max-w-lg gap-12">
          <img src={logo} alt="Logo Maternité Connect" className="h-20 w-auto" />
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {state.user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}