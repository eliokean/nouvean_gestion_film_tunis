import React, { useState } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, BarChart3, TrendingUp, Users, Star, Calendar, Award, Eye, Filter, Download } from 'lucide-react';

export default function AdminFilmsPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Données de démonstration
  const filmsStats = [
    {
      id: 1,
      titre: 'Terre des Hommes',
      affiche: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      note_globale: 4.63,
      note_president: 4.5,
      note_membre1: 4.8,
      note_membre2: 4.6,
      reservations_total: 45,
      capacite_salle: 150,
      taux_remplissage: 30,
      projections: 3,
      revenus: 1350,
      commentaires: 12
    },
    {
      id: 2,
      titre: 'Horizons Perdus',
      affiche: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      note_globale: 4.33,
      note_president: 4.2,
      note_membre1: 4.5,
      note_membre2: 4.3,
      reservations_total: 38,
      capacite_salle: 150,
      taux_remplissage: 25,
      projections: 2,
      revenus: 1140,
      commentaires: 8
    },
    {
      id: 3,
      titre: 'Voix du Silence',
      affiche: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      note_globale: 4.80,
      note_president: 4.7,
      note_membre1: 4.9,
      note_membre2: 4.8,
      reservations_total: 52,
      capacite_salle: 150,
      taux_remplissage: 35,
      projections: 4,
      revenus: 1560,
      commentaires: 15
    },
    {
      id: 4,
      titre: 'Mémoires Vivantes',
      affiche: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      note_globale: 3.90,
      note_president: 3.8,
      note_membre1: 4.0,
      note_membre2: 3.9,
      reservations_total: 28,
      capacite_salle: 100,
      taux_remplissage: 28,
      projections: 2,
      revenus: 840,
      commentaires: 6
    },
    {
      id: 5,
      titre: 'Échos du Désert',
      affiche: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
      note_globale: 4.50,
      note_president: 4.4,
      note_membre1: 4.6,
      note_membre2: 4.5,
      reservations_total: 41,
      capacite_salle: 150,
      taux_remplissage: 27,
      projections: 3,
      revenus: 1230,
      commentaires: 10
    },
    {
      id: 6,
      titre: 'Lumières Urbaines',
      affiche: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
      note_globale: 4.20,
      note_president: 4.1,
      note_membre1: 4.3,
      note_membre2: 4.2,
      reservations_total: 35,
      capacite_salle: 100,
      taux_remplissage: 35,
      projections: 2,
      revenus: 1050,
      commentaires: 9
    }
  ];

  const userEmail = 'admin@doc-tunis.com';

  // Calculs statistiques globaux
  const totalReservations = filmsStats.reduce((sum, film) => sum + film.reservations_total, 0);
  const totalRevenus = filmsStats.reduce((sum, film) => sum + film.revenus, 0);
  const moyenneNotes = (filmsStats.reduce((sum, film) => sum + film.note_globale, 0) / filmsStats.length).toFixed(2);
  const tauxMoyenRemplissage = Math.round(filmsStats.reduce((sum, film) => sum + film.taux_remplissage, 0) / filmsStats.length);

  // Filtrage
  const filteredFilms = filmsStats.filter(film => {
    const matchSearch = film.titre.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') return matchSearch;
    if (filterType === 'best') return matchSearch && film.note_globale >= 4.5;
    if (filterType === 'popular') return matchSearch && film.reservations_total > 40;
    return matchSearch;
  });

  // Top 3 films
  const topFilmsByNote = [...filmsStats].sort((a, b) => b.note_globale - a.note_globale).slice(0, 3);
  const topFilmsByReservations = [...filmsStats].sort((a, b) => b.reservations_total - a.reservations_total).slice(0, 3);

  // Fonction pour afficher les étoiles
  const renderStars = (note) => {
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    const remaining = 5 - Math.ceil(note);
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
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
            <a href="/stats_films" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Statistiques</a>
          </nav>

          <div className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Rechercher un film"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Statistiques des Films</h1>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold">
            <Download className="w-5 h-5" /> Export PDF
          </button>
        </div>

        {/* Statistiques Globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8" />
              <span className="text-sm font-medium">Total Réservations</span>
            </div>
            <p className="text-4xl font-bold">{totalReservations}</p>
            <p className="text-sm mt-2 opacity-80">Sur tous les films</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-sm font-medium">Revenus Totaux</span>
            </div>
            <p className="text-4xl font-bold">{totalRevenus} DT</p>
            <p className="text-sm mt-2 opacity-80">Prix moyen: 30 DT</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-8 h-8" />
              <span className="text-sm font-medium">Note Moyenne</span>
            </div>
            <p className="text-4xl font-bold">{moyenneNotes}/5</p>
            <p className="text-sm mt-2 opacity-80">Sur {filmsStats.length} films</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8" />
              <span className="text-sm font-medium">Taux Remplissage</span>
            </div>
            <p className="text-4xl font-bold">{tauxMoyenRemplissage}%</p>
            <p className="text-sm mt-2 opacity-80">Moyenne générale</p>
          </div>
        </div>

        {/* Top 3 - Double Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top 3 par Note */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">Top 3 - Meilleures Notes</h2>
            </div>
            <div className="space-y-4">
              {topFilmsByNote.map((film, index) => (
                <div key={film.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <img src={film.affiche} alt={film.titre} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{film.titre}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(film.note_globale)}
                      <span className="text-sm ml-2 font-bold text-red-600">{film.note_globale.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 par Réservations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Top 3 - Plus Réservés</h2>
            </div>
            <div className="space-y-4">
              {topFilmsByReservations.map((film, index) => (
                <div key={film.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : 'bg-blue-300'
                  }`}>
                    {index + 1}
                  </div>
                  <img src={film.affiche} alt={film.titre} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{film.titre}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="font-bold text-blue-600">{film.reservations_total} réservations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtrer:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous les films
              </button>
              <button
                onClick={() => setFilterType('best')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === 'best' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Meilleures notes (≥4.5)
              </button>
              <button
                onClick={() => setFilterType('popular')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === 'popular' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Plus populaires (&gt;40 rés.)
              </button>
            </div>
          </div>
        </div>

        {/* Liste détaillée des films */}
        <div className="space-y-6">
          {filteredFilms.map((film) => (
            <div key={film.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="md:flex">
                {/* Affiche */}
                <div className="md:w-64 h-64 md:h-auto relative">
                  <img src={film.affiche} alt={film.titre} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{film.id}
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{film.titre}</h2>
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(film.note_globale)}
                        <span className="text-xl font-bold text-red-600 ml-2">{film.note_globale.toFixed(2)}/5</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFilm(selectedFilm === film.id ? null : film.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {selectedFilm === film.id ? 'Masquer' : 'Détails'}
                    </button>
                  </div>

                  {/* Statistiques en ligne */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600">Réservations</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{film.reservations_total}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-gray-600">Revenus</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{film.revenus} DT</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-gray-600">Projections</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{film.projections}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-gray-600">Remplissage</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">{film.taux_remplissage}%</p>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Capacité: {film.reservations_total}/{film.capacite_salle}</span>
                      <span className="font-semibold">{film.taux_remplissage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          film.taux_remplissage >= 80 ? 'bg-red-600' :
                          film.taux_remplissage >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${film.taux_remplissage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Détails étendus */}
                  {selectedFilm === film.id && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-bold text-gray-900 mb-3">Notes détaillées du Jury</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Président du Jury</p>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold text-gray-900">{film.note_president}/5</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Membre 1</p>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold text-gray-900">{film.note_membre1}/5</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Membre 2</p>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold text-gray-900">{film.note_membre2}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Doc à Tunis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}