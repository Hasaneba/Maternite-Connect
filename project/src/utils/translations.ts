import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Profil',
    'nav.children': 'Mes enfants',
    'nav.vaccination': 'Vaccination',
    'nav.education': 'Éducation',
    'nav.patients': 'Patients',
    'nav.consultations': 'Consultations',
    'nav.statistics': 'Statistiques',
    'nav.users': 'Utilisateurs',
    'nav.reports': 'Rapports',
    'nav.logout': 'Déconnexion',

    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.name': 'Nom complet',
    'auth.phone': 'Téléphone',
    'auth.role': 'Rôle',
    'auth.mother': 'Mère',
    'auth.agent': 'Agent de santé',
    'auth.admin': 'Administrateur',
    'auth.login.button': 'Se connecter',
    'auth.register.button': "S'inscrire",
    'auth.switch.register': "Pas de compte ? S'inscrire",
    'auth.switch.login': 'Déjà un compte ? Se connecter',
    'auth.demo.title': 'Comptes de démonstration',
    'auth.demo.subtitle': 'Cliquez pour vous connecter directement',

    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.children.count': 'Enfants enregistrés',
    'dashboard.vaccinations.pending': 'Vaccinations en attente',
    'dashboard.consultations.recent': 'Consultations récentes',
    'dashboard.births.pending': 'Naissances à déclarer',

    // Children
    'children.add': 'Ajouter un enfant',
    'children.name': 'Nom de l\'enfant',
    'children.birthdate': 'Date de naissance',
    'children.gender': 'Genre',
    'children.male': 'Garçon',
    'children.female': 'Fille',
    'children.weight': 'Poids de naissance (kg)',
    'children.location': 'Lieu de naissance',

    // Vaccination
    'vaccination.calendar': 'Calendrier vaccinal',
    'vaccination.scheduled': 'Programmé',
    'vaccination.completed': 'Effectué',
    'vaccination.overdue': 'En retard',
    'vaccination.next': 'Prochain vaccin',

    // Education
    'education.prenatal': 'Prénatal',
    'education.postnatal': 'Postnatal',
    'education.nutrition': 'Nutrition',
    'education.general': 'Général',

    // Common
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.date': 'Date',
    'common.status': 'Statut',
    'common.actions': 'Actions',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.children': 'أطفالي',
    'nav.vaccination': 'التطعيم',
    'nav.education': 'التعليم',
    'nav.patients': 'المرضى',
    'nav.consultations': 'الاستشارات',
    'nav.statistics': 'الإحصائيات',
    'nav.users': 'المستخدمون',
    'nav.reports': 'التقارير',
    'nav.logout': 'تسجيل الخروج',

    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'التسجيل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.phone': 'الهاتف',
    'auth.role': 'الدور',
    'auth.mother': 'أم',
    'auth.agent': 'عامل صحي',
    'auth.admin': 'مدير',
    'auth.login.button': 'دخول',
    'auth.register.button': 'تسجيل',
    'auth.switch.register': 'ليس لديك حساب؟ سجل',
    'auth.switch.login': 'لديك حساب؟ ادخل',
    'auth.demo.title': 'حسابات تجريبية',
    'auth.demo.subtitle': 'انقر للدخول مباشرة',

    // Dashboard
    'dashboard.welcome': 'أهلاً وسهلاً',
    'dashboard.children.count': 'الأطفال المسجلون',
    'dashboard.vaccinations.pending': 'التطعيمات المعلقة',
    'dashboard.consultations.recent': 'الاستشارات الحديثة',
    'dashboard.births.pending': 'الولادات المعلقة الإعلان',

    // Children
    'children.add': 'إضافة طفل',
    'children.name': 'اسم الطفل',
    'children.birthdate': 'تاريخ الميلاد',
    'children.gender': 'الجنس',
    'children.male': 'ذكر',
    'children.female': 'أنثى',
    'children.weight': 'وزن الولادة (كغ)',
    'children.location': 'مكان الولادة',

    // Vaccination
    'vaccination.calendar': 'جدول التطعيم',
    'vaccination.scheduled': 'مجدول',
    'vaccination.completed': 'مكتمل',
    'vaccination.overdue': 'متأخر',
    'vaccination.next': 'التطعيم التالي',

    // Education
    'education.prenatal': 'ما قبل الولادة',
    'education.postnatal': 'ما بعد الولادة',
    'education.nutrition': 'التغذية',
    'education.general': 'عام',

    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.date': 'التاريخ',
    'common.status': 'الحالة',
    'common.actions': 'الإجراءات',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.children': 'My Children',
    'nav.vaccination': 'Vaccination',
    'nav.education': 'Education',
    'nav.patients': 'Patients',
    'nav.consultations': 'Consultations',
    'nav.statistics': 'Statistics',
    'nav.users': 'Users',
    'nav.reports': 'Reports',
    'nav.logout': 'Logout',

    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone',
    'auth.role': 'Role',
    'auth.mother': 'Mother',
    'auth.agent': 'Health Agent',
    'auth.admin': 'Administrator',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Sign Up',
    'auth.switch.register': 'No account? Sign up',
    'auth.switch.login': 'Already have an account? Sign in',
    'auth.demo.title': 'Demo Accounts',
    'auth.demo.subtitle': 'Click to login directly',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.children.count': 'Registered Children',
    'dashboard.vaccinations.pending': 'Pending Vaccinations',
    'dashboard.consultations.recent': 'Recent Consultations',
    'dashboard.births.pending': 'Births to Declare',

    // Children
    'children.add': 'Add Child',
    'children.name': 'Child Name',
    'children.birthdate': 'Birth Date',
    'children.gender': 'Gender',
    'children.male': 'Boy',
    'children.female': 'Girl',
    'children.weight': 'Birth Weight (kg)',
    'children.location': 'Birth Location',

    // Vaccination
    'vaccination.calendar': 'Vaccination Calendar',
    'vaccination.scheduled': 'Scheduled',
    'vaccination.completed': 'Completed',
    'vaccination.overdue': 'Overdue',
    'vaccination.next': 'Next Vaccination',

    // Education
    'education.prenatal': 'Prenatal',
    'education.postnatal': 'Postnatal',
    'education.nutrition': 'Nutrition',
    'education.general': 'General',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.date': 'Date',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.search': 'Search',
    'common.filter': 'Filter',
  },
  wo: {
    // Basic Wolof translations
    'nav.dashboard': 'Tabal yu indil',
    'nav.profile': 'Profil',
    'nav.children': 'Doom yi',
    'auth.login': 'Dugg',
    'auth.register': 'Bind',
    'dashboard.welcome': 'Dalal ak jamm',
  },
  ff: {
    // Basic Pulaar translations
    'nav.dashboard': 'Tabal wallitaare',
    'nav.profile': 'Profil',
    'nav.children': 'Kon\'en',
    'auth.login': 'Naatii',
    'auth.register': 'Winndii',
    'dashboard.welcome': 'Jaaraama',
  },
  snk: {
    // Basic Soninké translations
    'nav.dashboard': 'Tabal baane',
    'nav.profile': 'Profil',
    'nav.children': 'Biini ye',
    'auth.login': 'Kabi',
    'auth.register': 'Sebe',
    'dashboard.welcome': 'Walli',
  },
};

export function useTranslation(language: Language) {
  return (key: string): string => {
    return translations[language][key] || translations.fr[key] || key;
  };
}