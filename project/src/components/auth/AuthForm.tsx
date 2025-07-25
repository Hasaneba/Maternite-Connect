import React, { useState } from 'react';
import { Heart, Users, Shield } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';
import { User } from '../../types';
import logo from '../../assets/logo.png';

export function AuthForm() {
  const { state, login } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [isLogin, setIsLogin] = useState(true);
  // const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'mother' as 'mother' | 'agent',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate user creation/login
    const id = Math.random().toString(36).substr(2, 9);
    let matricule: string | undefined = undefined;
    if (formData.role === 'mother') {
      matricule = `M-${id.toUpperCase()}`;
    }
    const user: User = {
      id,
      email: formData.email,
      name: formData.name || 'Utilisateur',
      phone: formData.phone || '',
      role: formData.role,
      profileComplete: isLogin,
      createdAt: new Date(),
      ...(matricule ? { matricule } : {}),
    };

    login(user);
  };

  // Fonction de connexion démo supprimée pour la sécurité

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo Maternité Connect" className="h-24 w-auto mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maternité Connect</h1>
          <p className="text-gray-600">Santé maternelle et infantile en Mauritanie</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isLogin ? t('auth.login') : t('auth.register')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.role')}
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="mother">{t('auth.mother')}</option>
                    <option value="agent">{t('auth.agent')}</option>
                    <option value="admin">{t('auth.admin')}</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              {isLogin ? t('auth.login.button') : t('auth.register.button')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              {isLogin ? t('auth.switch.register') : t('auth.switch.login')}
            </button>
          </div>

          {/* Section comptes de démonstration supprimée pour la sécurité */}
        </div>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <Heart className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-600">Santé maternelle</p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-600">Suivi des enfants</p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <Shield className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-600">Vaccination</p>
          </div>
        </div>
      </div>
    </div>
  );
}