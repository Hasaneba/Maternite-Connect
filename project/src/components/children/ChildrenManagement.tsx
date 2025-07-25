import React, { useState } from 'react';
import { Plus, Calendar, Weight, MapPin, Edit, Eye, X, Syringe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';
import { Child } from '../../types';

export function ChildrenManagement() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editChildId, setEditChildId] = useState<string | null>(null);
  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Aminata Diallo',
      birthDate: '2023-06-15',
      gender: 'female',
      birthWeight: 3.2,
      birthLocation: 'Hôpital de Nouakchott',
      vaccinations: [],
      preDeclared: true,
      declared: false,
      motherId: 'mother1',
    },
    {
      id: '2',
      name: 'Omar Sall',
      birthDate: '2021-03-20',
      gender: 'male',
      birthWeight: 3.8,
      birthLocation: 'Centre de santé de Rosso',
      vaccinations: [],
      preDeclared: true,
      declared: true,
      motherId: 'mother1',
    },
  ]);

  const [newChild, setNewChild] = useState({
    name: '',
    birthDate: '',
    gender: 'female' as 'male' | 'female',
    birthWeight: '',
    birthLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const motherMatricule = state.user?.matricule || state.user?.id || 'unknown';
    if (editChildId) {
      // Edition d'un enfant existant
      setChildren((prev) => prev.map(child =>
        child.id === editChildId
          ? {
              ...child,
              ...newChild,
              birthWeight: parseFloat(newChild.birthWeight as any) || 0,
              motherId: motherMatricule,
            }
          : child
      ));
    } else {
      // Ajout d'un nouvel enfant
      const childToAdd = {
        ...newChild,
        id: Math.random().toString(36).substr(2, 9),
        birthWeight: parseFloat(newChild.birthWeight as any) || 0,
        vaccinations: [],
        preDeclared: true,
        declared: false,
        motherId: motherMatricule,
      };
      setChildren((prev) => [...prev, childToAdd]);
    }
    setShowAddForm(false);
    setEditChildId(null);
    setNewChild({
      name: '',
      birthDate: '',
      gender: 'female',
      birthWeight: '',
      birthLocation: '',
    });
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} mois`;
    }
    return `${Math.floor(ageInMonths / 12)} ans`;
  };

  // Fonction pour supprimer un enfant
  const handleDelete = (id: string) => {
    setChildren((prev) => prev.filter(child => child.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('nav.children')}</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-blue-600 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>{t('children.add')}</span>
        </button>
      </div>

      {/* Add Child Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('children.add')}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('children.name')}
              </label>
              <input
                type="text"
                value={newChild.name}
                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('children.birthdate')}
              </label>
              <input
                type="date"
                value={newChild.birthDate}
                onChange={(e) => setNewChild({ ...newChild, birthDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('children.gender')}
              </label>
              <select
                value={newChild.gender}
                onChange={(e) => setNewChild({ ...newChild, gender: e.target.value as 'male' | 'female' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="female">{t('children.female')}</option>
                <option value="male">{t('children.male')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('children.weight')}
              </label>
              <input
                type="number"
                step="0.1"
                value={newChild.birthWeight}
                onChange={(e) => setNewChild({ ...newChild, birthWeight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('children.location')}
              </label>
              <input
                type="text"
                value={newChild.birthLocation}
                onChange={(e) => setNewChild({ ...newChild, birthLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                {t('common.save')}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Children List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* En-tête avec nom, âge et boutons d'action */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                <p className="text-sm text-gray-600">{calculateAge(child.birthDate)}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                  title="Modifier"
                  onClick={() => {
                    setEditChildId(child.id);
                    setShowAddForm(true);
                    setNewChild({
                      name: child.name,
                      birthDate: child.birthDate,
                      gender: child.gender,
                      birthWeight: child.birthWeight.toString(),
                      birthLocation: child.birthLocation,
                    });
                  }}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Supprimer"
                  onClick={() => handleDelete(child.id)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Informations de base */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(child.birthDate).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Weight className="h-4 w-4" />
                <span>{child.birthWeight} kg</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{child.birthLocation}</span>
              </div>
            </div>

            {/* Liste des vaccins effectués */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Syringe className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Vaccins effectués</span>
              </div>
              {child.vaccinations.filter(v => v.status === 'completed').length > 0 ? (
                <div className="space-y-2">
                  {child.vaccinations
                    .filter(v => v.status === 'completed')
                    .map(vaccination => (
                      <div key={vaccination.id} className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 rounded-lg p-2">
                        <span className="font-medium">{vaccination.name}</span>
                        <span className="text-xs text-gray-500">
                          {vaccination.completedDate ? new Date(vaccination.completedDate).toLocaleDateString('fr-FR') : ''}
                        </span>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucun vaccin effectué</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}