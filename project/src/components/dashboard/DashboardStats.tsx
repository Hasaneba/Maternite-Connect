import React from 'react';
import { Baby, Shield, Calendar, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';

export function DashboardStats() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  const user = state.user!;

  const getStatsForRole = () => {
    if (user.role === 'mother') {
      return [
        {
          title: t('dashboard.children.count'),
          value: '2',
          icon: Baby,
          color: 'bg-blue-500',
          change: '+1 ce mois',
        },
        {
          title: t('dashboard.vaccinations.pending'),
          value: '3',
          icon: Shield,
          color: 'bg-green-500',
          change: 'À programmer',
        },
        {
          title: t('dashboard.consultations.recent'),
          value: '1',
          icon: Calendar,
          color: 'bg-orange-500',
          change: 'Cette semaine',
        },
        {
          title: t('dashboard.births.pending'),
          value: '1',
          icon: FileText,
          color: 'bg-purple-500',
          change: 'À déclarer',
        },
      ];
    }

    if (user.role === 'agent') {
      return [
        {
          title: 'Patients suivis',
          value: '45',
          icon: Baby,
          color: 'bg-blue-500',
          change: '+8 ce mois',
        },
        {
          title: 'Vaccinations effectuées',
          value: '23',
          icon: Shield,
          color: 'bg-green-500',
          change: 'Cette semaine',
        },
        {
          title: 'Consultations',
          value: '12',
          icon: Calendar,
          color: 'bg-orange-500',
          change: 'Aujourd\'hui',
        },
        {
          title: 'Naissances validées',
          value: '5',
          icon: FileText,
          color: 'bg-purple-500',
          change: 'Ce mois',
        },
      ];
    }

    // Admin stats
    return [
      {
        title: 'Total utilisateurs',
        value: '1,247',
        icon: Baby,
        color: 'bg-blue-500',
        change: '+45 ce mois',
      },
      {
        title: 'Taux vaccination',
        value: '87%',
        icon: Shield,
        color: 'bg-green-500',
        change: '+3% ce mois',
      },
      {
        title: 'Consultations totales',
        value: '856',
        icon: Calendar,
        color: 'bg-orange-500',
        change: 'Ce mois',
      },
      {
        title: 'Naissances déclarées',
        value: '124',
        icon: FileText,
        color: 'bg-purple-500',
        change: 'Ce mois',
      },
    ];
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}