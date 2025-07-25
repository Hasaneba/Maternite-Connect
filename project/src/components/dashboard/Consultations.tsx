import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Consultations() {
  const { state } = useApp();
  const agentId = state.user?.id || '';
  const query = useQuery();
  const mereIdFromUrl = query.get('mere_id') || '';
  // Données fictives pour l'exemple
  const [consultations, setConsultations] = React.useState([
    {
      id: 1,
      mere_id: 101,
      mere_nom: 'Aminata Diallo',
      agent_id: 201,
      date_consultation: '2024-05-01',
      type: 'prénatale',
      poids: 65.2,
      tension_arterielle: '12/8',
      niveau_fer: 'Normal',
      recommandations: 'Continuer le fer, repos',
      note: 'Manque d\'alimentation',
      prochaine_consultation: '2024-06-01',
      created_at: '2024-05-01T10:00:00',
    },
    {
      id: 2,
      mere_id: 102,
      mere_nom: 'Mariam Sow',
      agent_id: 202,
      date_consultation: '2024-05-10',
      type: 'postnatale',
      poids: 70.5,
      tension_arterielle: '13/8',
      niveau_fer: 'Faible',
      recommandations: 'Augmenter la dose de fer',
      note: 'Fatigue signalée',
      prochaine_consultation: '2024-06-10',
      created_at: '2024-05-10T11:30:00',
    },
  ]);

  // Filtres d'affichage
  const [filterType, setFilterType] = React.useState('');
  const [filterDate, setFilterDate] = React.useState('');
  const [filterMereId, setFilterMereId] = React.useState('');
  const [filterAgentId, setFilterAgentId] = React.useState('');

  const filteredConsultations = consultations.filter(c => {
    if (filterType && c.type !== filterType) return false;
    if (filterDate && c.date_consultation !== filterDate) return false;
    if (filterMereId && String(c.mere_id) !== filterMereId) return false;
    if (filterAgentId && String(c.agent_id) !== filterAgentId) return false;
    return true;
  });

  // Formulaire d'ajout
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    mere_id: mereIdFromUrl || '',
    mere_nom: '',
    agent_id: agentId,
    date_consultation: '',
    type: 'prénatale',
    poids: '',
    tension_arterielle: '',
    niveau_fer: '',
    recommandations: '',
    note: '',
    prochaine_consultation: '',
  });

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, agent_id: agentId }));
  }, [agentId, showForm]);
  React.useEffect(() => {
    if (mereIdFromUrl) {
      setForm((prev) => ({ ...prev, mere_id: mereIdFromUrl, mere_nom: '' }));
    } else {
      setForm((prev) => ({ ...prev, mere_id: '', mere_nom: '' }));
    }
  }, [mereIdFromUrl, showForm]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const newConsultation = {
      id: consultations.length ? Math.max(...consultations.map(c => c.id)) + 1 : 1,
      mere_id: Number(form.mere_id),
      mere_nom: form.mere_nom,
      agent_id: Number(form.agent_id),
      date_consultation: form.date_consultation,
      type: form.type,
      poids: parseFloat(form.poids),
      tension_arterielle: form.tension_arterielle,
      niveau_fer: form.niveau_fer,
      recommandations: form.recommandations,
      note: form.note,
      prochaine_consultation: form.prochaine_consultation,
      created_at: new Date().toISOString(),
    };
    setConsultations((prev) => [newConsultation, ...prev]);
    setShowForm(false);
    setForm({
      mere_id: mereIdFromUrl || '',
      mere_nom: '',
      agent_id: agentId,
      date_consultation: '',
      type: 'prénatale',
      poids: '',
      tension_arterielle: '',
      niveau_fer: '',
      recommandations: '',
      note: '',
      prochaine_consultation: '',
    });
  };

  // Modale Voir/Éditer
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'view' | 'edit' | null>(null);
  const [selectedConsultation, setSelectedConsultation] = React.useState<any>(null);

  // Supprimer
  const handleDelete = (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette consultation ?')) {
      setConsultations((prev) => prev.filter(c => c.id !== id));
    }
  };

  // Ouvrir modale Voir
  const handleView = (consultation: any) => {
    setSelectedConsultation(consultation);
    setModalMode('view');
    setModalOpen(true);
  };

  // Ouvrir modale Éditer
  const handleEdit = (consultation: any) => {
    setSelectedConsultation(consultation);
    setModalMode('edit');
    setModalOpen(true);
    setForm({
      mere_id: consultation.mere_id.toString(),
      mere_nom: consultation.mere_nom,
      agent_id: consultation.agent_id.toString(),
      date_consultation: consultation.date_consultation,
      type: consultation.type,
      poids: consultation.poids.toString(),
      tension_arterielle: consultation.tension_arterielle,
      niveau_fer: consultation.niveau_fer,
      recommandations: consultation.recommandations,
      note: consultation.note,
      prochaine_consultation: consultation.prochaine_consultation,
    });
  };

  // Soumission édition
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultations((prev) => prev.map(c =>
      c.id === selectedConsultation.id
        ? {
            ...c,
            mere_id: Number(form.mere_id),
            mere_nom: form.mere_nom,
            agent_id: Number(form.agent_id),
            date_consultation: form.date_consultation,
            type: form.type,
            poids: parseFloat(form.poids),
            tension_arterielle: form.tension_arterielle,
            niveau_fer: form.niveau_fer,
            recommandations: form.recommandations,
            note: form.note,
            prochaine_consultation: form.prochaine_consultation,
          }
        : c
    ));
    setModalOpen(false);
    setModalMode(null);
    setSelectedConsultation(null);
    setForm({
      mere_id: '',
      mere_nom: '',
      agent_id: agentId,
      date_consultation: '',
      type: 'prénatale',
      poids: '',
      tension_arterielle: '',
      niveau_fer: '',
      recommandations: '',
      note: '',
      prochaine_consultation: '',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Consultations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setShowForm(f => !f)}>
          {showForm ? 'Annuler' : 'Ajouter une consultation'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAddConsultation} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ID Mère</label>
            <input type="text" name="mere_id" value={form.mere_id} onChange={handleFormChange} placeholder="ID Mère" className="border rounded px-2 py-1 w-full" required readOnly={Boolean(mereIdFromUrl)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nom de la mère</label>
            <input type="text" name="mere_nom" value={form.mere_nom} onChange={handleFormChange} placeholder="Nom de la mère" className="border rounded px-2 py-1 w-full" required={!Boolean(mereIdFromUrl)} readOnly={Boolean(mereIdFromUrl)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ID Agent</label>
            <input type="text" name="agent_id" value={form.agent_id} readOnly className="border rounded px-2 py-1 w-full bg-gray-100 text-gray-500" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date de consultation</label>
            <input type="date" name="date_consultation" value={form.date_consultation} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required>
              <option value="prénatale">Prénatale</option>
              <option value="postnatale">Postnatale</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Poids (kg)</label>
            <input type="number" step="0.1" name="poids" value={form.poids} onChange={handleFormChange} placeholder="Poids (kg)" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tension artérielle</label>
            <input type="text" name="tension_arterielle" value={form.tension_arterielle} onChange={handleFormChange} placeholder="Tension artérielle" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Niveau fer</label>
            <input type="text" name="niveau_fer" value={form.niveau_fer} onChange={handleFormChange} placeholder="Niveau fer" className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Recommandations</label>
            <input type="text" name="recommandations" value={form.recommandations} onChange={handleFormChange} placeholder="Recommandations" className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Note</label>
            <input type="text" name="note" value={form.note} onChange={handleFormChange} placeholder="Note" className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date du prochain rendez-vous</label>
            <input type="date" name="prochaine_consultation" value={form.prochaine_consultation} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">Enregistrer</button>
          </div>
        </form>
      )}
      <p className="text-gray-600 mb-4">Historique et gestion des consultations médicales.</p>
      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Tous</option>
            <option value="prénatale">Prénatale</option>
            <option value="postnatale">Postnatale</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date consultation</label>
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ID Mère</label>
          <input type="text" value={filterMereId} onChange={e => setFilterMereId(e.target.value)} className="border rounded px-2 py-1" placeholder="ID mère" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">ID Agent</label>
          <input type="text" value={filterAgentId} onChange={e => setFilterAgentId(e.target.value)} className="border rounded px-2 py-1" placeholder="ID agent" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-sm border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">ID Mère</th>
              <th className="px-2 py-2">Nom de la mère</th>
              <th className="px-2 py-2">ID Agent</th>
              <th className="px-2 py-2">Date consultation</th>
              <th className="px-2 py-2">Type</th>
              <th className="px-2 py-2">Poids (kg)</th>
              <th className="px-2 py-2">Tension artérielle</th>
              <th className="px-2 py-2">Niveau fer</th>
              <th className="px-2 py-2">Recommandations</th>
              <th className="px-2 py-2">Note</th>
              <th className="px-2 py-2">Prochaine consultation</th>
              <th className="px-2 py-2">Créé le</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsultations.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-2 py-1">{c.id}</td>
                <td className="px-2 py-1">{c.mere_id}</td>
                <td className="px-2 py-1">{String(('mere_nom' in c ? c['mere_nom'] : '-') || '-')}</td>
                <td className="px-2 py-1">{c.agent_id}</td>
                <td className="px-2 py-1">{new Date(c.date_consultation).toLocaleDateString('fr-FR')}</td>
                <td className="px-2 py-1 capitalize">{c.type}</td>
                <td className="px-2 py-1">{c.poids}</td>
                <td className="px-2 py-1">{c.tension_arterielle}</td>
                <td className="px-2 py-1">{c.niveau_fer}</td>
                <td className="px-2 py-1">{c.recommandations}</td>
                <td className="px-2 py-1">{c.note}</td>
                <td className="px-2 py-1">{new Date(c.prochaine_consultation).toLocaleDateString('fr-FR')}</td>
                <td className="px-2 py-1">{new Date(c.created_at).toLocaleString('fr-FR')}</td>
                <td className="px-2 py-1 space-x-2">
                  <button title="Voir" className="p-1 text-blue-600 hover:bg-blue-50 rounded" onClick={() => handleView(c)}><Eye className="h-4 w-4 inline" /></button>
                  <button title="Éditer" className="p-1 text-green-600 hover:bg-green-50 rounded" onClick={() => handleEdit(c)}><Edit className="h-4 w-4 inline" /></button>
                  <button title="Supprimer" className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 inline" /></button>
                  {c.prochaine_consultation && (
                    <button title="Envoyer un rappel SMS" className="p-1 text-purple-600 hover:bg-purple-50 rounded border border-purple-200" onClick={() => alert(`SMS de rappel envoyé à la mère pour le rendez-vous du ${new Date(c.prochaine_consultation).toLocaleDateString('fr-FR')}`)}>
                      Envoyer un rappel SMS
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MODALE Voir/Éditer */}
      {modalOpen && selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative flex flex-col max-h-screen">
            <button onClick={() => { setModalOpen(false); setModalMode(null); setSelectedConsultation(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">✕</button>
            <div className="flex-1 overflow-y-auto px-8 pb-4 pt-8">
              {modalMode === 'view' ? (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold mb-4">Détails de la consultation</h3>
                  <div><span className="font-semibold">ID :</span> {selectedConsultation.id}</div>
                  <div><span className="font-semibold">ID Mère :</span> {selectedConsultation.mere_id}</div>
                  <div><span className="font-semibold">Nom de la mère :</span> {selectedConsultation.mere_nom}</div>
                  <div><span className="font-semibold">ID Agent :</span> {selectedConsultation.agent_id}</div>
                  <div><span className="font-semibold">Date de consultation :</span> {selectedConsultation.date_consultation}</div>
                  <div><span className="font-semibold">Type :</span> {selectedConsultation.type}</div>
                  <div><span className="font-semibold">Poids (kg) :</span> {selectedConsultation.poids}</div>
                  <div><span className="font-semibold">Tension artérielle :</span> {selectedConsultation.tension_arterielle}</div>
                  <div><span className="font-semibold">Niveau fer :</span> {selectedConsultation.niveau_fer}</div>
                  <div><span className="font-semibold">Recommandations :</span> {selectedConsultation.recommandations}</div>
                  <div><span className="font-semibold">Note :</span> {selectedConsultation.note}</div>
                  <div><span className="font-semibold">Date du prochain rendez-vous :</span> {selectedConsultation.prochaine_consultation}</div>
                  <div><span className="font-semibold">Créé le :</span> {new Date(selectedConsultation.created_at).toLocaleString('fr-FR')}</div>
                </div>
              ) : (
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <h3 className="text-xl font-bold mb-4">Éditer la consultation</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ID Mère</label>
                    <input type="text" name="mere_id" value={form.mere_id} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nom de la mère</label>
                    <input type="text" name="mere_nom" value={form.mere_nom} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ID Agent</label>
                    <input type="text" name="agent_id" value={form.agent_id} readOnly className="border rounded px-2 py-1 w-full bg-gray-100 text-gray-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date de consultation</label>
                    <input type="date" name="date_consultation" value={form.date_consultation} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                    <select name="type" value={form.type} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required>
                      <option value="prénatale">Prénatale</option>
                      <option value="postnatale">Postnatale</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Poids (kg)</label>
                    <input type="number" step="0.1" name="poids" value={form.poids} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tension artérielle</label>
                    <input type="text" name="tension_arterielle" value={form.tension_arterielle} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Niveau fer</label>
                    <input type="text" name="niveau_fer" value={form.niveau_fer} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Recommandations</label>
                    <input type="text" name="recommandations" value={form.recommandations} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Note</label>
                    <input type="text" name="note" value={form.note} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date du prochain rendez-vous</label>
                    <input type="date" name="prochaine_consultation" value={form.prochaine_consultation} onChange={handleFormChange} className="border rounded px-2 py-1 w-full" />
                  </div>
                  <div>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">Enregistrer</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 