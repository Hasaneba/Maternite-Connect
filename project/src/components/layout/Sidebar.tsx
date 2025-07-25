import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Baby, 
  Shield, 
  BookOpen, 
  Users, 
  Stethoscope, 
  BarChart3, 
  UserCheck, 
  FileText,
  LogOut 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { state, logout } = useApp();
  const t = useTranslation(state.currentLanguage);
  const user = state.user!;

  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
      { id: 'profile', label: t('nav.profile'), icon: User },
    ];

    if (user.role === 'mother') {
      return [
        ...commonItems,
        { id: 'children', label: t('nav.children'), icon: Baby },
        { id: 'vaccination', label: t('nav.vaccination'), icon: Shield },
        { id: 'education', label: t('nav.education'), icon: BookOpen },
      ];
    }

    if (user.role === 'agent') {
      return [
        ...commonItems,
        { id: 'patients', label: t('nav.patients'), icon: Users },
        { id: 'consultations', label: t('nav.consultations'), icon: Stethoscope },
        { id: 'vaccination', label: t('nav.vaccination'), icon: Shield },
        { id: 'education', label: t('nav.education'), icon: BookOpen },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...commonItems,
        { id: 'statistics', label: t('nav.statistics'), icon: BarChart3 },
        { id: 'users', label: t('nav.users'), icon: UserCheck },
        { id: 'reports', label: t('nav.reports'), icon: FileText },
        { id: 'education', label: t('nav.education'), icon: BookOpen },
      ];
    }

    return commonItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-white h-screen w-64 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Maternité Connect</h1>
        <p className="text-sm text-gray-600 mt-1">{user.name}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">{t('nav.logout')}</span>
        </button>
      </div>
    </div>
  );
}