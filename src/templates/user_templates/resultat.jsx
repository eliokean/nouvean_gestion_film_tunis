import React, { useState, useEffect } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Award, Star, TrendingUp, TrendingDown, Trophy } from 'lucide-react';

export default function ResultatsPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('note-desc');
  const [sortedFilms, setSortedFilms] = useState([]);

  // Données de démonstration
  const films = [
    {
      id: 1,
      titre: 'Terre des Hommes',
      date_film: '2023-03-15',
      realisateur: 'Marie Laurent',
      affiche_film: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      note_president: 4.5,
      note_membre1: 4.8,
      note_membre2: 4.6,
      note_globale: 4.63
    },
    {
      id: 2,
      titre: 'Horizons Perdus',
      date_film: '2023-06-10',
      realisateur: 'Ahmed Ben Said',
      affiche_film: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      note_president: 4.2,
      note_membre1: 4.5,
      note_membre2: 4.3,
      note_globale: 4.33
    },
    {
      id: 3,
      titre: 'Voix du Silence',
      date_film: '2022-11-05',
      realisateur: 'Fatma Slimani',
      affiche_film: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      note_president: 4.7,
      note_membre1: 4.9,
      note_membre2: 4.8,
      note_globale: 4.80
    },
    {
      id: 4,
      titre: 'Mémoires Vivantes',
      date_film: '2021-09-18',
      realisateur: 'Karim Mansour',
      affiche_film: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      note_president: 3.8,
      note_membre1: 4.0,
      note_membre2: 3.9,
      note_globale: 3.90
    },
    {
      id: 5,
      titre: 'Échos du Désert',
      date_film: '2023-01-22',
      realisateur: 'Sarah Benali',
      affiche_film: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
      note_president: 4.4,
      note_membre1: 4.6,
      note_membre2: 4.5,
      note_globale: 4.50
    },
    {
      id: 6,
      titre: 'Lumières Urbaines',
      date_film: '2022-04-30',
      realisateur: 'Youssef Trabelsi',
      affiche_film: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
      note_president: 4.1,
      note_membre1: 4.3,
      note_membre2: 4.2,
      note_globale: 4.20
    },
    {
      id: 7,
      titre: 'Racines Profondes',
      date_film: '2021-12-10',
      realisateur: 'Leila Gharbi',
      affiche_film: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
      note_president: 4.6,
      note_membre1: 4.7,
      note_membre2: 4.8,
      note_globale: 4.70
    },
    {
      id: 8,
      titre: 'Océans Infinis',
      date_film: '2023-07-15',
      realisateur: 'Mehdi Khelifi',
      affiche_film: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      note_president: 3.9,
      note_membre1: 4.1,
      note_membre2: 4.0,
      note_globale: 4.00
    }
  ];

  const userEmail = 'utilisateur@doc-tunis.com';

  // Tri des films
  useEffect(() => {
    let sorted = [...films];

    switch (sortOption) {
      case 'note-desc':
        sorted.sort((a, b) => b.note_globale - a.note_globale);
        break;
      case 'note-asc':
        sorted.sort((a, b) => a.note_globale - b.note_globale);
        break;
      case 'titre-asc':
        sorted.sort((a, b) => a.titre.localeCompare(b.titre));
        break;
      case 'titre-desc':
        sorted.sort((a, b) => b.titre.localeCompare(a.titre));
        break;
      default:
        break;
    }

    // Filtre par recherche
    if (searchQuery) {
      sorted = sorted.filter(film =>
        film.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.realisateur.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setSortedFilms(sorted);
  }, [sortOption, searchQuery]);

  // Fonction pour afficher les étoiles
  const renderStars = (note) => {
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    const remaining = 5 - Math.ceil(note);
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  // Fonction pour obtenir le badge selon la note
  const getBadge = (note) => {
    if (note >= 4.5) return { text: 'Excellent', color: 'bg-green-500', icon: <Trophy className="w-4 h-4" /> };
    if (note >= 4.0) return { text: 'Très Bien', color: 'bg-blue-500', icon: <Award className="w-4 h-4" /> };
    if (note >= 3.5) return { text: 'Bien', color: 'bg-yellow-500', icon: <TrendingUp className="w-4 h-4" /> };
    return { text: 'Moyen', color: 'bg-gray-500', icon: <TrendingDown className="w-4 h-4" /> };
  };

  // Top 3 films
  const top3Films = [...films].sort((a, b) => b.note_globale - a.note_globale).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Titre */}
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-10 h-10 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Résultats des Évaluations</h1>
        </div>

        {/* Podium - Top 3 */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8 shadow-lg border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Podium des Meilleurs Films
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {top3Films.map((film, index) => (
              <div
                key={film.id}
                className={`bg-white rounded-xl p-6 shadow-xl border-4 ${
                  index === 0 ? 'border-yellow-400 transform md:-translate-y-4' :
                  index === 1 ? 'border-gray-400' :
                  'border-orange-400'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <img
                  src={film.affiche_film}
                  alt={film.titre}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg text-center mb-2">{film.titre}</h3>
                <div className="flex justify-center gap-1 mb-2">
                  {renderStars(film.note_globale)}
                </div>
                <p className="text-center text-2xl font-bold text-red-600">{film.note_globale.toFixed(2)}/5</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-options" className="text-sm font-medium text-gray-700">
                Trier par :
              </label>
              <select
                id="sort-options"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
              >
                <option value="note-desc">Note décroissante</option>
                <option value="note-asc">Note croissante</option>
                <option value="titre-asc">Titre (A-Z)</option>
                <option value="titre-desc">Titre (Z-A)</option>
              </select>
            </div>

            <div className="lg:hidden w-full">
              <input
                type="text"
                placeholder="Rechercher un film"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">{sortedFilms.length}</span> film(s) évalué(s)
            </p>
          </div>
        </div>

        {/* Liste des films */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedFilms.map((film) => {
            const badge = getBadge(film.note_globale);
            return (
              <div
                key={film.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Badge */}
                <div className="relative">
                  <img
                    src={film.affiche_film}
                    alt={film.titre}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute top-3 right-3 ${badge.color} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}>
                    {badge.icon}
                    {badge.text}
                  </div>
                </div>

                {/* Détails */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{film.titre}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Réalisateur :</strong> {film.realisateur}
                  </p>

                  {/* Notes du jury */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Président:</span>
                      <span className="font-semibold">{film.note_president}/5</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Membre 1:</span>
                      <span className="font-semibold">{film.note_membre1}/5</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Membre 2:</span>
                      <span className="font-semibold">{film.note_membre2}/5</span>
                    </div>
                  </div>

                  {/* Note globale */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Note globale:</span>
                      <span className="text-2xl font-bold text-red-600">{film.note_globale.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {renderStars(film.note_globale)}
                    </div>
                    {/* Barre de progression */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(film.note_globale / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedFilms.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-semibold">Aucun résultat trouvé</p>
            <p className="text-gray-400 mt-2">Modifiez vos critères de recherche</p>
          </div>
        )}
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