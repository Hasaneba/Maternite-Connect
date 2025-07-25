import React, { useState, useContext } from 'react';
import { Calendar, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';

export type VaccinationRecord = {
  id: string;
  vaccine: string;
  childName: string;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'overdue';
  completedDate?: Date;
  notes?: string;
};

export function VaccinationCalendar() {
  const { state } = useApp();
  const { vaccinations, setVaccinations } = useApp();
  const t = useTranslation(state.currentLanguage);
  
  const [showChildModal, setShowChildModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [childVaccines, setChildVaccines] = useState<VaccinationRecord[]>([]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('vaccination.completed');
      case 'overdue':
        return t('vaccination.overdue');
      default:
        return t('vaccination.scheduled');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const upcomingVaccinations = vaccinations.filter(v => v.status === 'scheduled').slice(0, 3);
  const overdueVaccinations = vaccinations.filter(v => v.status === 'overdue');

  // Mock mapping enfant -> mère et date de naissance
  const childInfo: Record<string, { mother: string; birthDate: string }> = {
    'Aminata Diallo': { mother: 'Aminata Diallo (mère)', birthDate: '2022-01-01' },
    'Omar Sall': { mother: 'Aminata Diallo (mère)', birthDate: '2020-03-15' },
  };

  // Fonction pour trouver le prochain vaccin d'un enfant
  function getNextVaccine(childName: string) {
    const vaccs = vaccinations.filter(v => v.childName === childName && v.status === 'scheduled');
    if (vaccs.length === 0) return '-';
    const next = vaccs.reduce((a, b) => a.scheduledDate < b.scheduledDate ? a : b);
    return `${next.vaccine} (${next.scheduledDate.toLocaleDateString('fr-FR')})`;
  }

  // Filtres pour l'agent
  const [filterStatus, setFilterStatus] = useState('');
  const [filterVaccine, setFilterVaccine] = useState('');

  const allVaccines = Array.from(new Set(vaccinations.map(v => v.vaccine)));

  // Appliquer les filtres
  const allChildren = Object.keys(childInfo);
  const filteredChildren = allChildren.filter(childName => {
    if (filterVaccine && !vaccinations.some(v => v.childName === childName && v.vaccine === filterVaccine)) return false;
    if (filterStatus) {
      const vaccs = vaccinations.filter(v => v.childName === childName);
      if (filterStatus === 'overdue' && !vaccs.some(v => v.status === 'overdue')) return false;
      if (filterStatus === 'scheduled' && !vaccs.some(v => v.status === 'scheduled')) return false;
      if (filterStatus === 'completed' && !vaccs.every(v => v.status === 'completed')) return false;
    }
    return true;
  });

  if (state.user?.role === 'mother') {
    // Vaccination vue mère (patient) : lecture seule, enfants de la mère uniquement
    const myChildren = ['Aminata Diallo', 'Omar Sall']; // À remplacer par la vraie liste d'enfants de la mère connectée
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">Mon calendrier vaccinal</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes enfants</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Nom de l’enfant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Prochain vaccin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                </tr>
              </thead>
              <tbody>
                {myChildren.map(childName => (
                  <tr key={childName} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{childName}</td>
                    <td className="py-3 px-4 text-gray-600">{getNextVaccine(childName)}</td>
                    <td className="py-3 px-4">
                      {(() => {
                        const vaccs = vaccinations.filter(v => v.childName === childName);
                        if (vaccs.some(v => v.status === 'overdue')) return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">{t('vaccination.overdue')}</span>;
                        if (vaccs.some(v => v.status === 'scheduled')) return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{t('vaccination.scheduled')}</span>;
                        return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{t('vaccination.completed')}</span>;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900">{t('vaccination.calendar')}</h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-900">
                {vaccinations.filter(v => v.status === 'completed').length}
              </p>
              <p className="text-sm font-medium text-green-700">{t('vaccination.completed')}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-yellow-900">
                {vaccinations.filter(v => v.status === 'scheduled').length}
              </p>
              <p className="text-sm font-medium text-yellow-700">{t('vaccination.scheduled')}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-900">
                {vaccinations.filter(v => v.status === 'overdue').length}
              </p>
              <p className="text-sm font-medium text-red-700">{t('vaccination.overdue')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Vaccinations Alert */}
      {overdueVaccinations.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Vaccinations en retard</h3>
              <p className="text-red-700 text-sm mt-1">
                {overdueVaccinations.length} vaccination(s) en retard nécessitent une attention immédiate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Vaccinations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>{t('vaccination.next')}</span>
        </h3>
        
        <div className="space-y-3">
          {upcomingVaccinations.map((vaccination) => (
            <div key={vaccination.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(vaccination.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{vaccination.vaccine}</h4>
                  <p className="text-sm text-gray-600">{vaccination.childName}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {vaccination.scheduledDate.toLocaleDateString('fr-FR')}
                </p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                  {getStatusText(vaccination.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Vaccinations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique complet</h3>
        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Tous</option>
              <option value="scheduled">À faire</option>
              <option value="completed">Fait</option>
              <option value="overdue">En retard</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type de vaccin</label>
            <select value={filterVaccine} onChange={e => setFilterVaccine(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Tous</option>
              {allVaccines.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom de l’enfant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom de la mère</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date de naissance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Prochain vaccin</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChildren.map(childName => (
                <tr key={childName} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{childName}</td>
                  <td className="py-3 px-4 text-gray-600">{childInfo[childName].mother}</td>
                  <td className="py-3 px-4 text-gray-600">{childInfo[childName].birthDate}</td>
                  <td className="py-3 px-4 text-gray-600">{getNextVaccine(childName)}</td>
                  <td className="py-3 px-4">
                    {/* Statut global : si un vaccin en retard, sinon à faire, sinon fait */}
                    {(() => {
                      const vaccs = vaccinations.filter(v => v.childName === childName);
                      if (vaccs.some(v => v.status === 'overdue')) return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">{t('vaccination.overdue')}</span>;
                      if (vaccs.some(v => v.status === 'scheduled')) return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{t('vaccination.scheduled')}</span>;
                      return <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{t('vaccination.completed')}</span>;
                    })()}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-2" onClick={() => {
                      setSelectedChild(childName);
                      setChildVaccines(vaccinations.filter(v => v.childName === childName));
                      setShowChildModal(true);
                    }}>{t('common.view')}</button>
                    {(() => {
                      const next = vaccinations.find(v => v.childName === childName && (v.status === 'scheduled' || v.status === 'overdue'));
                      if (next) return <button className="text-purple-600 hover:text-purple-800 text-sm font-medium" onClick={() => alert(`SMS de rappel envoyé à ${childName} pour le vaccin ${next.vaccine}`)}>Rappel SMS</button>;
                      return null;
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale fiche enfant */}
      {showChildModal && selectedChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative flex flex-col max-h-screen">
            <button onClick={() => setShowChildModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">✕</button>
            <div className="flex-1 overflow-y-auto px-8 pb-4 pt-8">
              <h3 className="text-xl font-bold mb-4">Fiche de {selectedChild}</h3>
              <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200 text-sm mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Vaccin</th>
                    <th className="px-2 py-2">Date prévue</th>
                    <th className="px-2 py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {childVaccines.map((v, idx) => (
                    <tr key={v.id} className="border-t">
                      <td className="px-2 py-1">{v.vaccine}</td>
                      <td className="px-2 py-1">{v.scheduledDate.toLocaleDateString('fr-FR')}</td>
                      <td className="px-2 py-1">
                        <select value={v.status} onChange={e => {
                          const newStatus = e.target.value as VaccinationRecord['status'];
                          setChildVaccines(vaccs => vaccs.map((vacc, i) => i === idx ? { ...vacc, status: newStatus } : vacc));
                          // Mettre à jour aussi dans la liste globale
                          setVaccinations(vs => vs.map(vacc => vacc.id === v.id ? { ...vacc, status: newStatus } : vacc));
                        }} className="border rounded px-2 py-1">
                          <option value="scheduled">À faire</option>
                          <option value="completed">Fait</option>
                          <option value="overdue">En retard</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}