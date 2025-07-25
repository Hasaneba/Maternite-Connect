import React, { useState, useRef } from 'react';
import { Eye, Syringe, FileText, X, FilePlus2, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { Child } from '../../types';

interface Mother {
  id: string;
  name: string;
  birthDate: string;
  region: string;
  email?: string;
  phone?: string;
  language?: string;
  children: Child[];
}

const mockMothers: Mother[] = [
  {
    id: 'mother1',
    name: 'Aminata Diallo',
    birthDate: '1990-05-12',
    region: 'Nouakchott',
    children: [
      { id: 'child1', name: 'Fatou Diallo', hasVaccineDelay: false, birthDate: '2022-01-01', gender: 'female', birthLocation: 'Nouakchott', vaccinations: [], preDeclared: false, declared: true, motherId: 'mother1' },
      { id: 'child2', name: 'Omar Diallo', hasVaccineDelay: true, birthDate: '2020-03-15', gender: 'male', birthLocation: 'Nouakchott', vaccinations: [], preDeclared: false, declared: true, motherId: 'mother1' },
    ],
  },
  {
    id: 'mother2',
    name: 'Mariam Sow',
    birthDate: '1987-11-23',
    region: 'Rosso',
    children: [
      { id: 'child3', name: 'Binta Sow', hasVaccineDelay: false, birthDate: '2021-07-10', gender: 'female', birthLocation: 'Rosso', vaccinations: [], preDeclared: false, declared: true, motherId: 'mother2' },
    ],
  },
];

// Ajout d'un mock d'historique de consultations pour la démo
const mockConsultations = [
  { id: 1, mere_id: 'mother1', date: '2024-05-01', type: 'prénatale', note: 'Manque d\'alimentation' },
  { id: 2, mere_id: 'mother1', date: '2024-06-01', type: 'postnatale', note: 'Fatigue' },
  { id: 3, mere_id: 'mother2', date: '2024-05-10', type: 'prénatale', note: 'Suivi normal' },
];

const regions = ['Nouakchott', 'Rosso'];
const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'ar', label: 'العربية' },
  { value: 'en', label: 'English' },
  { value: 'wo', label: 'Wolof' },
  { value: 'ff', label: 'Pulaar' },
  { value: 'snk', label: 'Soninké' },
];
const statusOptions = [
  { value: 'all', label: 'Tous' },
  { value: 'upToDate', label: 'À jour' },
  { value: 'delayed', label: 'Retard de vaccin' },
];
const vaccineOptions = [
  { value: 'bcg', label: 'BCG' },
  { value: 'dtc', label: 'DTC-HepB-Hib' },
  { value: 'polio', label: 'Polio' },
  { value: 'rougeole', label: 'Rougeole' },
];

function getMotherStatus(mother: Mother): 'delayed' | 'upToDate' {
  if (mother.children.some((child: Child) => child.hasVaccineDelay)) return 'delayed';
  return 'upToDate';
}

function getMotherAge(mother: Mother): number {
  const birth = new Date(mother.birthDate);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
}

export function PatientManagement() {
  const { state } = useApp();
  const navigate = useNavigate();
  // Fusionner les mères de mockMothers et celles présentes dans les consultations
  const allMotherIds = new Set(mockMothers.map(m => m.id));
  const mothersFromConsultations = mockConsultations
    .map(c => c.mere_id)
    .filter(id => !allMotherIds.has(id));
  const allMothers = [
    ...mockMothers,
    ...mothersFromConsultations.map(id => ({
      id,
      name: 'Mère inconnue',
      birthDate: '',
      region: '',
      children: [],
    })),
  ];
  const [mothers, setMothers] = useState<Mother[]>(allMothers);
  const [region, setRegion] = useState('Toutes');
  const [status, setStatus] = useState('all');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [addChild, setAddChild] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'fr',
    region: regions[0],
    birthDate: '',
    childName: '',
    childBirthDate: '',
    childGender: 'female',
    childInitialVaccine: false,
    childVaccineName: '',
    childVaccineDate: '',
  });
  const [showCertModal, setShowCertModal] = useState(false);
  const [certMother, setCertMother] = useState<Mother | null>(null);
  const [certChild, setCertChild] = useState<Child | null>(null);
  const [certForm, setCertForm] = useState({
    fatherName: '',
    birthLocation: '',
    agentName: '',
    agentSignature: '',
  });
  const certRef = useRef<HTMLDivElement>(null);
  const [showMotherModal, setShowMotherModal] = useState(false);
  const [selectedMother, setSelectedMother] = useState<Mother | null>(null);
  const [showAddConsultForm, setShowAddConsultForm] = useState(false);
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [childForm, setChildForm] = useState({
    name: '',
    birthDate: '',
    gender: 'female',
    birthWeight: '',
    birthLocation: '',
  });
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const vaccineCalendar = [
    { name: 'BCG', age: 'Naissance', status: 'À faire' },
    { name: 'Polio', age: '6 semaines', status: 'À faire' },
    { name: 'DTC-HepB-Hib', age: '6 semaines', status: 'À faire' },
    { name: 'Rougeole', age: '9 mois', status: 'À faire' },
  ];
  const [childVaccines, setChildVaccines] = useState<any[]>([]);

  const filteredMothers = mothers.filter((mother: Mother) => {
    if (region !== 'Toutes' && mother.region !== region) return false;
    if (status === 'delayed' && getMotherStatus(mother) !== 'delayed') return false;
    if (status === 'upToDate' && getMotherStatus(mother) !== 'upToDate') return false;
    const age = getMotherAge(mother);
    if (ageMin && age < parseInt(ageMin)) return false;
    if (ageMax && age > parseInt(ageMax)) return false;
    if (search && !(
      mother.name.toLowerCase().includes(search.toLowerCase()) ||
      mother.id.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMother: Mother = {
      id: 'mother_' + Math.random().toString(36).substr(2, 9),
      name: form.name,
      birthDate: form.birthDate,
      region: form.region,
      email: form.email || undefined,
      phone: form.phone,
      language: form.language,
      children: addChild && form.childName && form.childBirthDate ? [{
        id: 'child_' + Math.random().toString(36).substr(2, 9),
        name: form.childName,
        hasVaccineDelay: false,
        birthDate: form.childBirthDate,
        gender: form.childGender as 'male' | 'female',
        birthLocation: '',
        vaccinations: [],
        preDeclared: false,
        declared: false,
        motherId: '',
      }] : [],
    };
    setMothers((prev) => [newMother, ...prev]);
    setShowModal(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      language: 'fr',
      region: regions[0],
      birthDate: '',
      childName: '',
      childBirthDate: '',
      childGender: 'female',
      childInitialVaccine: false,
      childVaccineName: '',
      childVaccineDate: '',
    });
    setAddChild(false);
  };

  // Ajout d'une fonction pour ouvrir la modale certificat
  const openCertModal = (mother: Mother, child: Child) => {
    setCertMother(mother);
    setCertChild(child);
    setCertForm({
      fatherName: '',
      birthLocation: child.birthLocation || '',
      agentName: state.user?.name || '',
      agentSignature: '',
    });
    setShowCertModal(true);
  };

  // Impression/PDF
  const handlePrint = useReactToPrint({
    content: () => certRef.current,
    documentTitle: 'Certificat_accouchement',
  } as any);

  // Fonction pour ouvrir le dossier mère
  const openMotherModal = (mother: Mother) => {
    setSelectedMother(mother);
    setShowMotherModal(true);
    setShowAddConsultForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des patients</h2>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Ajouter une patiente</button>
      </div>
      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Région</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="border rounded px-2 py-1">
            <option value="Toutes">Toutes</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1">
            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Âge min</label>
          <input type="number" min="0" value={ageMin} onChange={e => setAgeMin(e.target.value)} className="border rounded px-2 py-1 w-20" placeholder="Min" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Âge max</label>
          <input type="number" min="0" value={ageMax} onChange={e => setAgeMax(e.target.value)} className="border rounded px-2 py-1 w-20" placeholder="Max" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Recherche</label>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1" placeholder="Nom ou ID" />
        </div>
      </div>
      {/* Tableau des patientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nom de la mère</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date de naissance</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Enfants</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMothers.length === 0 ? (
              <tr>
                <td className="px-4 py-2 text-gray-500 italic" colSpan={5}>Aucune donnée pour le moment.</td>
              </tr>
            ) : (
              filteredMothers.map((mother: Mother) => (
                <tr key={mother.id} className="border-t">
                  <td className="px-4 py-2">{mother.name}</td>
                  <td className="px-4 py-2">{mother.id}</td>
                  <td className="px-4 py-2">{new Date(mother.birthDate).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-2">
                    {mother.children.map((child: Child) => (
                      <span key={child.id} className={`inline-block rounded px-2 py-1 text-xs mr-1 mb-1 ${child.hasVaccineDelay ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'}`}>
                        {child.name}
                        {child.hasVaccineDelay && <span className="ml-1 text-[10px]">(Retard)</span>}
                        {/* Bouton Générer certificat pour chaque enfant */}
                        <button
                          title="Générer certificat d'accouchement"
                          className="ml-2 p-1 text-purple-600 hover:bg-purple-50 rounded"
                          onClick={() => openCertModal(mother, child)}
                        >
                          <FilePlus2 className="h-4 w-4 inline" />
                        </button>
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button title="Voir dossier" className="p-1 text-blue-600 hover:bg-blue-50 rounded" onClick={() => openMotherModal(mother)}><Eye className="h-4 w-4" /></button>
                    <button title="Vacciner" className="p-1 text-green-600 hover:bg-green-50 rounded"><Syringe className="h-4 w-4" /></button>
                    <button title="Notes médicales" className="p-1 text-gray-600 hover:bg-gray-100 rounded"><FileText className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modale d'ajout de patiente */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative flex flex-col max-h-screen">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
            <h3 className="text-xl font-bold mb-4 px-8 pt-8">Ajouter une patiente</h3>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto px-8 pb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la mère *</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleFormChange} required className="w-full border rounded px-3 py-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue préférée</label>
                  <select name="language" value={form.language} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                    {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                  <select name="region" value={form.region} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleFormChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="addChild" checked={addChild} onChange={e => setAddChild(e.target.checked)} />
                <label htmlFor="addChild" className="text-sm font-medium text-gray-700">Enfant à enregistrer ?</label>
              </div>
              {addChild && (
                <div className="space-y-2 border-t pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l’enfant *</label>
                    <input type="text" name="childName" value={form.childName} onChange={handleFormChange} required={addChild} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                      <input type="date" name="childBirthDate" value={form.childBirthDate} onChange={handleFormChange} required={addChild} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                      <div className="flex gap-2 mt-2">
                        <label className="flex items-center gap-1">
                          <input type="radio" name="childGender" value="female" checked={form.childGender === 'female'} onChange={handleFormChange} /> Fille
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="radio" name="childGender" value="male" checked={form.childGender === 'male'} onChange={handleFormChange} /> Garçon
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="childInitialVaccine" name="childInitialVaccine" checked={form.childInitialVaccine} onChange={handleFormChange} />
                    <label htmlFor="childInitialVaccine" className="text-sm font-medium text-gray-700">Vaccin initial ?</label>
                  </div>
                  {form.childInitialVaccine && (
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Choix du vaccin</label>
                        <select name="childVaccineName" value={form.childVaccineName} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                          <option value="">Sélectionner</option>
                          {vaccineOptions.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date du vaccin</label>
                        <input type="date" name="childVaccineDate" value={form.childVaccineDate} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Footer sticky pour les boutons */}
              <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 px-0 py-4 flex justify-end gap-2 shadow-lg z-10 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Annuler</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modale certificat d'accouchement */}
      {showCertModal && certMother && certChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative flex flex-col max-h-screen">
            <button onClick={() => setShowCertModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
           
            <div className="flex-1 overflow-y-auto px-8 pb-4">
              <div ref={certRef} className="space-y-3 bg-white p-4 rounded">
                <div className="text-center mb-2">
                  <div className="font-bold text-lg uppercase">RÉPUBLIQUE ISLAMIQUE DE MAURITANIE</div>
                  <div className="font-semibold text-base">Ministère de la Santé</div>
                </div>
                <div className="text-center mb-6">
                  <div className="font-bold text-xl underline">Certificat d'accouchement</div>
                </div>
                <div><span className="font-semibold">Nom de la mère :</span> {certMother.name}</div>
                <div><span className="font-semibold">Nom du père de l'enfant :</span> <input type="text" className="border rounded px-2 py-1 ml-2" value={certForm.fatherName} onChange={e => setCertForm(f => ({ ...f, fatherName: e.target.value }))} /></div>
                <div><span className="font-semibold">Date de naissance de la mère :</span> {new Date(certMother.birthDate).toLocaleDateString('fr-FR')}</div>
                <div><span className="font-semibold">Nom de l’enfant :</span> {certChild.name}</div>
                <div><span className="font-semibold">Date de naissance de l’enfant :</span> {certChild.birthDate ? new Date(certChild.birthDate).toLocaleDateString('fr-FR') : ''}</div>
                <div><span className="font-semibold">Lieu d’accouchement :</span> <input type="text" className="border rounded px-2 py-1 ml-2" value={certForm.birthLocation} onChange={e => setCertForm(f => ({ ...f, birthLocation: e.target.value }))} /></div>
                <div><span className="font-semibold">Nom de l’agent de santé :</span> <input type="text" className="border rounded px-2 py-1 ml-2" value={certForm.agentName} onChange={e => setCertForm(f => ({ ...f, agentName: e.target.value }))} /></div>
                <div><span className="font-semibold">Date de délivrance du certificat :</span> {new Date().toLocaleDateString('fr-FR')}</div>
                <div><span className="font-semibold">Signature de l’agent de santé :</span> <input type="text" className="border rounded px-2 py-1 ml-2" value={certForm.agentSignature} onChange={e => setCertForm(f => ({ ...f, agentSignature: e.target.value }))} /></div>
              </div>
            </div>
            <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 px-8 py-4 flex justify-between gap-2 shadow-lg z-10">
              <button type="button" onClick={handlePrint} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"><Printer className="h-4 w-4" /> Imprimer / PDF</button>
              <button type="button" onClick={() => setShowCertModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Fermer</button>
            </div>
          </div>
        </div>
      )}
      {/* Modale dossier mère */}
      {showMotherModal && selectedMother && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative flex flex-col max-h-screen">
            <button onClick={() => setShowMotherModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
            <div className="flex-1 overflow-y-auto px-8 pb-4 pt-8">
              <h3 className="text-xl font-bold mb-4">Dossier de {selectedMother.name}</h3>
              <div className="mb-4">
                <div><span className="font-semibold">ID :</span> {selectedMother.id}</div>
                <div><span className="font-semibold">Date de naissance :</span> {new Date(selectedMother.birthDate).toLocaleDateString('fr-FR')}</div>
                <div><span className="font-semibold">Région :</span> {selectedMother.region}</div>
                <div><span className="font-semibold">Téléphone :</span> {selectedMother.phone || '-'}</div>
                <div><span className="font-semibold">Email :</span> {selectedMother.email || '-'}</div>
              </div>
              <h4 className="text-lg font-semibold mb-2">Historique des consultations</h4>
              <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200 text-sm mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Date</th>
                    <th className="px-2 py-2">Type</th>
                    <th className="px-2 py-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {mockConsultations.filter(c => c.mere_id === selectedMother.id).length === 0 ? (
                    <tr><td colSpan={3} className="text-center text-gray-400 py-2">Aucune consultation</td></tr>
                  ) : (
                    mockConsultations.filter(c => c.mere_id === selectedMother.id).map(c => (
                      <tr key={c.id} className="border-t">
                        <td className="px-2 py-1">{new Date(c.date).toLocaleDateString('fr-FR')}</td>
                        <td className="px-2 py-1">{c.type}</td>
                        <td className="px-2 py-1">{c.note}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <h4 className="text-lg font-semibold mb-2">Enfants</h4>
              <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200 text-sm mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Nom</th>
                    <th className="px-2 py-2">Date de naissance</th>
                    <th className="px-2 py-2">Sexe</th>
                    <th className="px-2 py-2">Poids (kg)</th>
                    <th className="px-2 py-2">Lieu</th>
                    <th className="px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMother.children && selectedMother.children.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-gray-400 py-2">Aucun enfant</td></tr>
                  ) : (
                    selectedMother.children.map(child => (
                      <tr key={child.id} className="border-t">
                        <td className="px-2 py-1">{child.name}</td>
                        <td className="px-2 py-1">{child.birthDate}</td>
                        <td className="px-2 py-1">{child.gender === 'male' ? 'Garçon' : 'Fille'}</td>
                        <td className="px-2 py-1">{child['birthWeight'] !== undefined ? child['birthWeight'] : '-'}</td>
                        <td className="px-2 py-1">{child.birthLocation}</td>
                        <td className="px-2 py-1">
                          <button className="p-1 text-purple-600 hover:bg-purple-50 rounded border border-purple-200" onClick={() => {
                            setSelectedChild(child);
                            // Initialiser le suivi vaccinal pour cet enfant
                            setChildVaccines(child.vaccinations.length > 0 ? child.vaccinations : vaccineCalendar.map(v => ({ name: v.name, age: v.age, status: v.status })));
                            setShowVaccineModal(true);
                          }}>Suivi vaccinal</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2" onClick={() => setShowAddConsultForm(true)}>Nouvelle consultation</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" onClick={() => setShowAddChildForm(true)}>Ajouter un enfant</button>
              {showAddConsultForm && (
                <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                  <div className="mb-2 font-semibold">Ajouter une consultation pour {selectedMother.name}</div>
                  <form onSubmit={e => { e.preventDefault(); alert('Formulaire à connecter à la vraie logique !'); setShowAddConsultForm(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={selectedMother.id} readOnly className="border rounded px-2 py-1 bg-gray-100 text-gray-500" />
                    <input type="date" required className="border rounded px-2 py-1" />
                    <select required className="border rounded px-2 py-1">
                      <option value="prénatale">Prénatale</option>
                      <option value="postnatale">Postnatale</option>
                      <option value="autre">Autre</option>
                    </select>
                    <input type="text" placeholder="Note" className="border rounded px-2 py-1" />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors md:col-span-2">Enregistrer</button>
                  </form>
                </div>
              )}
              {showAddChildForm && (
                <div className="mt-4 p-4 border rounded-lg bg-green-50">
                  <div className="mb-2 font-semibold">Ajouter un enfant pour {selectedMother.name}</div>
                  <form onSubmit={e => {
                    e.preventDefault();
                    // Ajout de l'enfant à la mère sélectionnée
                    setSelectedMother(mother => mother && ({
                      ...mother,
                      children: [
                        ...(mother.children || []),
                        {
                          id: 'child_' + Math.random().toString(36).substr(2, 9),
                          name: childForm.name,
                          birthDate: childForm.birthDate,
                          gender: childForm.gender === 'male' ? 'male' : 'female',
                          birthWeight: Number(childForm.birthWeight) || 0,
                          birthLocation: childForm.birthLocation,
                          vaccinations: [],
                          hasVaccineDelay: false,
                          preDeclared: false,
                          declared: false,
                          motherId: mother.id,
                        },
                      ],
                    }));
                    setShowAddChildForm(false);
                    setChildForm({ name: '', birthDate: '', gender: 'female', birthWeight: '', birthLocation: '' });
                  }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={childForm.name} onChange={e => setChildForm(f => ({ ...f, name: e.target.value }))} placeholder="Nom de l'enfant" className="border rounded px-2 py-1" required />
                    <input type="date" value={childForm.birthDate} onChange={e => setChildForm(f => ({ ...f, birthDate: e.target.value }))} placeholder="Date de naissance" className="border rounded px-2 py-1" required />
                    <select value={childForm.gender} onChange={e => setChildForm(f => ({ ...f, gender: e.target.value }))} className="border rounded px-2 py-1">
                      <option value="female">Fille</option>
                      <option value="male">Garçon</option>
                    </select>
                    <input type="number" step="0.01" value={childForm.birthWeight} onChange={e => setChildForm(f => ({ ...f, birthWeight: e.target.value }))} placeholder="Poids de naissance (kg)" className="border rounded px-2 py-1" />
                    <input type="text" value={childForm.birthLocation} onChange={e => setChildForm(f => ({ ...f, birthLocation: e.target.value }))} placeholder="Lieu de naissance" className="border rounded px-2 py-1" />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors md:col-span-2">Enregistrer</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Modale suivi vaccinal */}
      {showVaccineModal && selectedChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative flex flex-col max-h-screen">
            <button onClick={() => setShowVaccineModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
            <div className="flex-1 overflow-y-auto px-8 pb-4 pt-8">
              <h3 className="text-xl font-bold mb-4">Suivi vaccinal de {selectedChild.name}</h3>
              <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200 text-sm mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Vaccin</th>
                    <th className="px-2 py-2">Âge recommandé</th>
                    <th className="px-2 py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {childVaccines.map((v, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-2 py-1">{v.name}</td>
                      <td className="px-2 py-1">{v.age}</td>
                      <td className="px-2 py-1">
                        <select value={v.status} onChange={e => {
                          const newStatus = e.target.value;
                          setChildVaccines(vaccs => vaccs.map((vacc, i) => i === idx ? { ...vacc, status: newStatus } : vacc));
                        }} className="border rounded px-2 py-1">
                          <option value="À faire">À faire</option>
                          <option value="Fait">Fait</option>
                          <option value="En retard">En retard</option>
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

export default PatientManagement; 