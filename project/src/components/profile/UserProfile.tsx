
import React, { useState } from 'react';
import { User as UserIcon, Edit, Save, X, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';

export function UserProfile() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    address: '',
    birthDate: '',
    emergencyContact: '',
  });

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: state.user?.name || '',
      email: state.user?.email || '',
      phone: state.user?.phone || '',
      address: '',
      birthDate: '',
      emergencyContact: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserIcon className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">{t('nav.profile')}</h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>{t('common.edit')}</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{t('common.save')}</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>{t('common.cancel')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Affichage du matricule si disponible */}
      {state.user?.matricule && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-2 mt-2">
          <span className="font-semibold text-blue-700">Matricule :</span>
          <span className="text-blue-900">{state.user.matricule}</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6 mb-8">
          <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {state.user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{state.user?.name}</h3>
            <p className="text-gray-600 capitalize">{state.user?.role}</p>
            <p className="text-gray-500 text-xs mt-1">ID : {state.user?.id}</p>
            <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-1">
              Compte actif
            </span>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="h-4 w-4 inline mr-1" />
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <UserIcon className="h-4 w-4 inline mr-1" />
              {t('auth.name')}
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="h-4 w-4 inline mr-1" />
              {t('auth.phone')}
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="h-4 w-4 inline mr-1" />
              Date de naissance
            </label>
            <input
              type="date"
              value={profileData.birthDate}
              onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              Adresse
            </label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {state.user?.role === 'mother' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="h-4 w-4 inline mr-1" />
                Contact d'urgence
              </label>
              <input
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          )}
        </form>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité du compte</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium text-gray-900">Changer le mot de passe</span>
            <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium text-gray-900">Authentification à deux facteurs</span>
            <p className="text-sm text-gray-600">Non activée</p>
          </button>
        </div>
      </div>
    </div>
  );
}
