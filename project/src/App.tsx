import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthForm } from './components/auth/AuthForm';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MotherDashboard } from './components/dashboard/MotherDashboard';
import { UserProfile } from './components/profile/UserProfile';
import { ChildrenManagement } from './components/children/ChildrenManagement';
import { VaccinationCalendar } from './components/vaccination/VaccinationCalendar';
import { EducationContent } from './components/education/EducationContent';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { PatientManagement } from './components/patients/PatientManagement';
import Consultations from './components/dashboard/Consultations';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!state.isAuthenticated) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (state.user?.role === 'mother') {
          return <MotherDashboard />;
        }
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de bord {state.user?.role}
            </h1>
            <DashboardStats />
          </div>
        );
      case 'profile':
        return <UserProfile />;
      case 'children':
        return <ChildrenManagement />;
      case 'vaccination':
        return <VaccinationCalendar />;
      case 'education':
        return <EducationContent />;
      case 'patients':
        if (state.user?.role === 'agent') {
          return <PatientManagement />;
        }
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h2>
            <p className="text-gray-600">Cette section est réservée aux agents de santé.</p>
          </div>
        );
      case 'consultations':
        return <Consultations />;
      case 'statistics':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques</h2>
            <p className="text-gray-600">Tableaux de bord statistiques pour les administrateurs.</p>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-600">Administration des comptes utilisateurs.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rapports</h2>
            <p className="text-gray-600">Génération et exportation de rapports.</p>
          </div>
        );
      default:
        return <MotherDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;