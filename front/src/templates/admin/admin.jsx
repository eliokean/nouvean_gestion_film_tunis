import React, { useState, useEffect } from 'react';
import { Search, Shield, TrendingUp, Film, Calendar, Users, Award, Plus, Download, X, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedJury, setSelectedJury] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: 'Visiteur'
  });

  const stats = {
    total: 45,
    responsable_inspection: 2,
    responsable_production: 2,
    president_jury: 1,
    jury: 8,
    visiteurs: 32,
    reservations_total: 156,
    films_total: 12,
    projections_total: 24
  };

  const films = [
    { id: 1, titre: 'Terre des Hommes' },
    { id: 2, titre: 'Horizons Perdus' },
    { id: 3, titre: 'Voix du Silence' },
    { id: 4, titre: 'Mémoires Vivantes' },
    { id: 5, titre: 'Échos du Désert' }
  ];

  const roles = [
    { value: 'Visiteur', label: 'Visiteur', unique: false },
    { value: 'Responsable_Production', label: 'Production', unique: true },
    { value: 'Responsable_Inspection', label: 'Inspection', unique: true },
    { value: 'President_du_Jury', label: 'Président', unique: true },
    { value: 'Jury', label: 'Jury', unique: false }
  ];

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/users', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs');
      }
      
      const data = await response.json();
      setUtilisateurs(data);
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const roleInfo = roles.find(r => r.value === newRole);
    
    if (roleInfo.unique) {
      const existingUser = utilisateurs.find(u => u.role === newRole && u.id !== userId);
      if (existingUser) {
        if (!window.confirm(`Ce rôle est unique. ${existingUser.prenom} ${existingUser.nom} possède déjà ce rôle. Voulez-vous le remplacer ?`)) {
          return;
        }
      }
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du rôle');
      }

      setUtilisateurs(prev => prev.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      
      alert('Rôle mis à jour avec succès !');
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la mise à jour du rôle');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setUtilisateurs(prev => prev.filter(u => u.id !== userId));
      alert('Utilisateur supprimé avec succès !');
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const handleAssignFilm = (jury) => {
    setSelectedJury(jury);
    setShowAssignModal(true);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['ID', 'Prénom', 'Nom', 'Email', 'Rôle'],
      ...utilisateurs.map(u => [u.id, u.prenom, u.nom, u.email || '', u.role])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleSubmitUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }

      const data = await response.json();
      setUtilisateurs(prev => [...prev, data]);
      setShowUserModal(false);
      setNewUser({ nom: '', prenom: '', email: '', role: 'Visiteur' });
      alert('Utilisateur ajouté avec succès !');
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  const handleSubmitAssign = () => {
    alert('Film assigné avec succès !');
    setShowAssignModal(false);
  };

  const filteredUsers = utilisateurs.filter(user =>
    user.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-7 h-7" />
            Statistiques Globales du Festival
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-5 h-5" />
                <span className="text-sm font-medium">Films</span>
              </div>
              <p className="text-3xl font-bold">{stats.films_total}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Projections</span>
              </div>
              <p className="text-3xl font-bold">{stats.projections_total}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Réservations</span>
              </div>
              <p className="text-3xl font-bold">{stats.reservations_total}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Membres Jury</span>
              </div>
              <p className="text-3xl font-bold">{stats.jury + stats.president_jury}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-1/2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowUserModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" /> Ajouter
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-semibold"
            >
              <Download className="w-5 h-5" /> Export CSV
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          <span className="font-semibold">{filteredUsers.length}</span> utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Prénom</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nom</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Visiteur</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Production</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Inspection</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Président</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Jury</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.prenom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.nom}</td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="radio"
                          name={`role-${user.id}`}
                          checked={user.role === 'Visiteur'}
                          onChange={() => handleRoleChange(user.id, 'Visiteur')}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="radio"
                          name={`role-${user.id}`}
                          checked={user.role === 'Responsable_Production'}
                          onChange={() => handleRoleChange(user.id, 'Responsable_Production')}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="radio"
                          name={`role-${user.id}`}
                          checked={user.role === 'Responsable_Inspection'}
                          onChange={() => handleRoleChange(user.id, 'Responsable_Inspection')}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="radio"
                          name={`role-${user.id}`}
                          checked={user.role === 'President_du_Jury'}
                          onChange={() => handleRoleChange(user.id, 'President_du_Jury')}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="radio"
                          name={`role-${user.id}`}
                          checked={user.role === 'Jury'}
                          onChange={() => handleRoleChange(user.id, 'Jury')}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" 
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" 
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {(user.role === 'Jury' || user.role === 'President_du_Jury') && (
                            <button
                              onClick={() => handleAssignFilm(user)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                              title="Assigner un film"
                            >
                              <Film className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Ajouter un utilisateur</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  required
                  value={newUser.nom}
                  onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Nom de famille"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  required
                  value={newUser.prenom}
                  onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                >
                  <option value="Visiteur">Visiteur</option>
                  <option value="Responsable_Inspection">Responsable d'inspection</option>
                  <option value="Responsable_Production">Responsable de production</option>
                  <option value="President_du_Jury">Président du Jury</option>
                  <option value="Jury">Membre du Jury</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmitUser}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedJury && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Assigner un film</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Jury sélectionné</p>
                <p className="font-bold text-gray-900">{selectedJury.prenom} {selectedJury.nom}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choisir un film</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white">
                  {films.map(film => (
                    <option key={film.id} value={film.id}>{film.titre}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAssign}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Assigner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Doc à Tunis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}