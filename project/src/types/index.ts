export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'mother' | 'agent' | 'admin';
  profileComplete: boolean;
  createdAt: Date;
  matricule?: string; // Ajout du matricule pour les mères
}

export interface Mother extends User {
  role: 'mother';
  birthDate: string;
  address: string;
  emergencyContact: string;
  children: Child[];
  matricule: string;
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  birthWeight?: number;
  birthLocation: string;
  vaccinations: Vaccination[];
  preDeclared: boolean;
  declared: boolean;
  motherId: string;
  hasVaccineDelay?: boolean;
}

export interface Vaccination {
  id: string;
  name: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: 'scheduled' | 'completed' | 'overdue';
  notes?: string;
  childId: string;
}

export interface HealthAgent extends User {
  role: 'agent';
  license: string;
  facility: string;
  specialization: string;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export interface EducationalContent {
  id: string;
  title: Record<string, string>;
  content: Record<string, string>;
  type: 'article' | 'video' | 'infographic';
  category: 'prenatal' | 'postnatal' | 'vaccination' | 'nutrition' | 'general';
  targetAudience: 'mothers' | 'agents' | 'all';
  createdAt: Date;
  updatedAt: Date;
}

export interface Consultation {
  id: string;
  childId: string;
  agentId: string;
  date: Date;
  notes: string;
  weight?: number;
  height?: number;
  temperature?: number;
  recommendations: string;
}

export type Language = 'fr' | 'ar' | 'wo' | 'ff' | 'snk' | 'en';

export interface AppState {
  user: User | null;
  currentLanguage: Language;
  isAuthenticated: boolean;
  loading: boolean;
}