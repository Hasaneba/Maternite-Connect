import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, Language } from '../types';
import { VaccinationRecord } from '../components/vaccination/VaccinationCalendar';

interface AppContextType {
  state: AppState;
  login: (user: User) => void;
  logout: () => void;
  setLanguage: (language: Language) => void;
  setLoading: (loading: boolean) => void;
  vaccinations: VaccinationRecord[];
  setVaccinations: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  currentLanguage: 'fr',
  isAuthenticated: false,
  loading: false,
};
const initialVaccinations: VaccinationRecord[] = [
  {
    id: '1',
    vaccine: 'BCG',
    childName: 'Aminata Diallo',
    scheduledDate: new Date('2023-07-15'),
    status: 'completed',
    completedDate: new Date('2023-07-15'),
  },
  {
    id: '2',
    vaccine: 'DTC-HepB-Hib (1ère dose)',
    childName: 'Aminata Diallo',
    scheduledDate: new Date('2023-08-15'),
    status: 'completed',
    completedDate: new Date('2023-08-16'),
  },
  {
    id: '3',
    vaccine: 'DTC-HepB-Hib (2ème dose)',
    childName: 'Aminata Diallo',
    scheduledDate: new Date('2023-09-15'),
    status: 'scheduled',
  },
  {
    id: '4',
    vaccine: 'Polio (2ème dose)',
    childName: 'Omar Sall',
    scheduledDate: new Date('2024-01-20'),
    status: 'overdue',
  },
  {
    id: '5',
    vaccine: 'ROR (1ère dose)',
    childName: 'Omar Sall',
    scheduledDate: new Date('2024-02-15'),
    status: 'scheduled',
  },
];

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [vaccinations, setVaccinations] = React.useState<VaccinationRecord[]>(initialVaccinations);

  const login = (user: User) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <AppContext.Provider value={{ state, login, logout, setLanguage, setLoading, vaccinations, setVaccinations }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}