import React, { useState } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Users, Shield, FileText, Download, Plus, X, Edit, Trash2, Film, TrendingUp, Calendar, Award } from 'lucide-react';

export default function AdminPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedJury, setSelectedJury] = useState(null);

  // Données de démonstration
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

  const utilisateurs = [
    { id: 1, nom: 'Dupont', prenom: 'Jean', role: 'Responsable_Inspection', email: 'jean.dupont@doc.tn' },
    { id: 2, nom: 'Martin', prenom: 'Marie', role: 'Responsable_Production', email: 'marie.martin@doc.tn' },
    { id: 3, nom: 'Bernard', prenom: 'Pierre', role: 'President_du_Jury', email: 'pierre.bernard@doc.tn' },
    { id: 4, nom: 'Dubois', prenom: 'Sophie', role: 'Jury', email: 'sophie.dubois@doc.tn' },
    { id: 5, nom: 'Lambert', prenom: 'Lucas', role: 'Jury', email: 'lucas.lambert@doc.tn' },
    { id: 6, nom: 'Leroy', prenom: 'Emma', role: 'Visiteur', email: 'emma.leroy@doc.tn' },
    { id: 7, nom: 'Moreau', prenom: 'Thomas', role: 'Visiteur', email: 'thomas.moreau@doc.tn' },
    { id: 8, nom: 'Simon', prenom: 'Camille', role: 'Jury', email: 'camille.simon@doc.tn' }
  ];

  const films = [
    { id: 1, titre: 'Terre des Hommes' },
    { id: 2, titre: 'Horizons Perdus' },
    { id: 3, titre: 'Voix du Silence' },
    { id: 4, titre: 'Mémoires Vivantes' },
    { id: 5, titre: 'Échos du Désert' }
  ];

  const userEmail = 'admin@doc-tunis.com';

  const handleRoleChange = (userId, newRole) => {
    if (newRole === 'Responsable_Production' || newRole === 'Responsable_Inspection' || newRole === 'President_du_Jury') {
      if (!confirm('Ce rôle est unique. Si un autre utilisateur possède déjà ce rôle, il sera modifié. Voulez-vous continuer ?')) {
        return;
      }
    }
    
    console.log(`Mise à jour du rôle de l'utilisateur ${userId} vers ${newRole}`);
    alert('Rôle mis à jour avec succès !');
  };

  const handleAssignFilm = (jury) => {
    setSelectedJury(jury);
    setShowAssignModal(true);
  };

  const handleExportCSV = () => {
    alert('Export CSV en cours...');
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    alert('Utilisateur ajouté avec succès !');
    setShowUserModal(false);
  };

  const handleSubmitAssign = (e) => {
    e.preventDefault();
    alert('Film assigné avec succès !');
    setShowAssignModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DT
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/admin_dashboard" className="text-gray-700 hover:text-red-600 transition">Accueil</a>
            <a href="/admin_film" className="text-gray-700 hover:text-red-600 transition">Films</a>
            <a href="/admin_planning" className="text-gray-700 hover:text-red-600 transition">Planning</a>
            <a href="/admin_resultats" className="text-gray-700 hover:text-red-600 transition">Résultats</a>
            <a href="/admin" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Administration</a>
          </nav>

          <div className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Rechercher un film"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
              <Search className="w-4 h-4" /> Rechercher
            </button>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <span className="hidden md:block text-sm text-gray-700">{userEmail}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <a href="/profil" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <UserCircle className="w-4 h-4" /> Profil
                </a>
                <a href="/logout" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <LogOut className="w-4 h-4" /> Déconnexion
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Titre */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        </div>

        {/* Dashboard Statistiques Générales */}
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

        {/* Statistiques Utilisateurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Total Utilisateurs</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.responsable_inspection}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Resp. Inspection</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <Film className="w-8 h-8 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.responsable_production}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Resp. Production</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.jury}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Membres Jury</h3>
          </div>
        </div>

        {/* Barre d'actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
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
        </div>

        {/* Tableau des utilisateurs */}
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
                {utilisateurs.filter(user => 
                  user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.prenom.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((user) => (
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
                        <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {(user.role === 'Jury' || user.role === 'President_du_Jury') && (
                          <button
                            onClick={() => handleAssignFilm(user)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                          >
                            <Film className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Ajouter Utilisateur */}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Nom de famille"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white">
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

      {/* Modal Assigner Film */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Doc à Tunis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}