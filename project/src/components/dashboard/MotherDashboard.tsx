import React from 'react';
import { DashboardStats } from './DashboardStats';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';
import { Calendar, Bell, BookOpen, Baby } from 'lucide-react';

export function MotherDashboard() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}, {state.user?.name}!
        </h1>
        <p className="text-green-100">
          Suivez la santé et le développement de vos enfants en toute simplicité.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Voir le calendrier vaccinal</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Baby className="h-5 w-5 text-green-500" />
              <span className="font-medium">Ajouter un enfant</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Contenus éducatifs</span>
            </button>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications récentes</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Vaccin prévu</p>
                <p className="text-xs text-gray-600">DTC-HepB-Hib pour Aminata dans 3 jours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nouveau contenu</p>
                <p className="text-xs text-gray-600">Article sur l'alimentation des nourrissons</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Rappel</p>
                <p className="text-xs text-gray-600">Consultation de suivi pour Omar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}