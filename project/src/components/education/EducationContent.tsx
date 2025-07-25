import React, { useState } from 'react';
import { BookOpen, Play, Image, Users, Baby, Heart, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../utils/translations';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'infographic';
  category: 'prenatal' | 'postnatal' | 'vaccination' | 'nutrition' | 'general';
  imageUrl: string;
  duration?: string;
  readTime?: string;
}

export function EducationContent() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous', icon: BookOpen },
    { id: 'prenatal', label: t('education.prenatal'), icon: Baby },
    { id: 'postnatal', label: t('education.postnatal'), icon: Heart },
    { id: 'vaccination', label: 'Vaccination', icon: Users },
    { id: 'nutrition', label: t('education.nutrition'), icon: Utensils },
    { id: 'general', label: t('education.general'), icon: BookOpen },
  ];

  const content: ContentItem[] = [
    {
      id: '1',
      title: 'Les premiers soins du nouveau-né',
      description: 'Guide complet pour les soins essentiels dans les premières heures de vie',
      type: 'article',
      category: 'postnatal',
      imageUrl: 'https://images.pexels.com/photos/1166473/pexels-photo-1166473.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '5 min',
    },
    {
      id: '2',
      title: 'Allaitement maternel : bonnes pratiques',
      description: 'Conseils pour un allaitement réussi et bénéfique pour maman et bébé',
      type: 'video',
      category: 'nutrition',
      imageUrl: 'https://images.pexels.com/photos/1912868/pexels-photo-1912868.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8 min',
    },
    {
      id: '3',
      title: 'Calendrier vaccinal expliqué',
      description: 'Comprendre l\'importance et le timing des vaccinations',
      type: 'infographic',
      category: 'vaccination',
      imageUrl: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '3 min',
    },
    {
      id: '4',
      title: 'Nutrition pendant la grossesse',
      description: 'Alimentation équilibrée pour une grossesse en santé',
      type: 'article',
      category: 'prenatal',
      imageUrl: 'https://images.pexels.com/photos/1172019/pexels-photo-1172019.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '7 min',
    },
    {
      id: '5',
      title: 'Signes d\'alerte chez le nourrisson',
      description: 'Reconnaître les situations nécessitant une consultation médicale',
      type: 'video',
      category: 'general',
      imageUrl: 'https://images.pexels.com/photos/1741231/pexels-photo-1741231.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12 min',
    },
    {
      id: '6',
      title: 'Développement psychomoteur 0-2 ans',
      description: 'Étapes clés du développement de votre enfant',
      type: 'infographic',
      category: 'postnatal',
      imageUrl: 'https://images.pexels.com/photos/1912832/pexels-photo-1912832.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '4 min',
    },
  ];

  const filteredContent = selectedCategory === 'all' 
    ? content 
    : content.filter(item => item.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'infographic':
        return <Image className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'infographic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <BookOpen className="h-8 w-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">{t('nav.education')}</h2>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  <span className="capitalize">{item.type}</span>
                </span>
              </div>
              {item.duration && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {item.duration}
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {item.readTime || item.duration}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Lire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucun contenu disponible pour cette catégorie.</p>
        </div>
      )}
    </div>
  );
}