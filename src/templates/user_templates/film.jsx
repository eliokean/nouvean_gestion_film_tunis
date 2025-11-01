import React, { useState, useEffect } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Filter, Calendar, Film, Eye } from 'lucide-react';

export default function FilmsPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [filteredFilms, setFilteredFilms] = useState([]);

  // Données de démonstration
  const films = [
    {
      id: 1,
      titre: 'Bridesmaids',
      date_film: '2021-05-13',
      sujet_film: 'Comédie',
      realisateur: 'Jane Doe',
      affiche_film: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      genre: 'comedy',
      annee: '2021'
    },
    {
      id: 2,
      titre: 'Niceville',
      date_film: '2022-08-20',
      sujet_film: 'Drame',
      realisateur: 'John Doe',
      affiche_film: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
      genre: 'drama',
      annee: '2022'
    },
    {
      id: 3,
      titre: 'Terre des Hommes',
      date_film: '2023-03-15',
      sujet_film: 'Documentaire sur la nature et l\'environnement',
      realisateur: 'Marie Laurent',
      affiche_film: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      genre: 'drama',
      annee: '2023'
    },
    {
      id: 4,
      titre: 'Horizons Perdus',
      date_film: '2023-06-10',
      sujet_film: 'Exploration des civilisations anciennes',
      realisateur: 'Ahmed Ben Said',
      affiche_film: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      genre: 'action',
      annee: '2023'
    },
    {
      id: 5,
      titre: 'Voix du Silence',
      date_film: '2022-11-05',
      sujet_film: 'Portrait intime de musiciens',
      realisateur: 'Fatma Slimani',
      affiche_film: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      genre: 'drama',
      annee: '2022'
    },
    {
      id: 6,
      titre: 'Mémoires Vivantes',
      date_film: '2021-09-18',
      sujet_film: 'Témoignages historiques',
      realisateur: 'Karim Mansour',
      affiche_film: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      genre: 'drama',
      annee: '2021'
    },
    {
      id: 7,
      titre: 'Échos du Désert',
      date_film: '2023-01-22',
      sujet_film: 'Vie nomade au Sahara',
      realisateur: 'Sarah Benali',
      affiche_film: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
      genre: 'action',
      annee: '2023'
    },
    {
      id: 8,
      titre: 'Lumières Urbaines',
      date_film: '2022-04-30',
      sujet_film: 'La vie nocturne des grandes villes',
      realisateur: 'Youssef Trabelsi',
      affiche_film: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
      genre: 'comedy',
      annee: '2022'
    },
    {
      id: 9,
      titre: 'Racines Profondes',
      date_film: '2021-12-10',
      sujet_film: 'Traditions ancestrales tunisiennes',
      realisateur: 'Leila Gharbi',
      affiche_film: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
      genre: 'drama',
      annee: '2021'
    },
    {
      id: 10,
      titre: 'Océans Infinis',
      date_film: '2023-07-15',
      sujet_film: 'Exploration des fonds marins',
      realisateur: 'Mehdi Khelifi',
      affiche_film: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      genre: 'action',
      annee: '2023'
    },
    {
      id: 11,
      titre: 'Rires et Larmes',
      date_film: '2022-02-14',
      sujet_film: 'Comédie dramatique sur la famille',
      realisateur: 'Sonia Hamdi',
      affiche_film: 'https://images.unsplash.com/photo-1574267432644-f261a223f7e1?w=400',
      genre: 'comedy',
      annee: '2022'
    },
    {
      id: 12,
      titre: 'Chemins Croisés',
      date_film: '2023-10-08',
      sujet_film: 'Rencontres inattendues',
      realisateur: 'Nabil Ayari',
      affiche_film: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      genre: 'drama',
      annee: '2023'
    }
  ];


  // Filtrage des films
  useEffect(() => {
    let result = films;

    // Filtre par recherche
    if (searchQuery) {
      result = result.filter(film =>
        film.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.sujet_film.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.realisateur.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par genre
    if (selectedGenre !== 'all') {
      result = result.filter(film => film.genre === selectedGenre);
    }

    // Filtre par année
    if (selectedYear !== 'all') {
      result = result.filter(film => film.annee === selectedYear);
    }

    setFilteredFilms(result);
  }, [searchQuery, selectedGenre, selectedYear]);

  // Initialisation
  useEffect(() => {
    setFilteredFilms(films);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section>
          {/* Titre de la section */}
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Liste des Films</h1>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Filtres</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Recherche Mobile */}
              <div className="lg:hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                <input
                  type="text"
                  placeholder="Titre, réalisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Filtre par genre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                >
                  <option value="all">Tous les genres</option>
                  <option value="comedy">Comédie</option>
                  <option value="drama">Drame</option>
                  <option value="action">Action</option>
                </select>
              </div>

              {/* Filtre par année */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                >
                  <option value="all">Toutes les années</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>

            {/* Résumé des filtres */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{filteredFilms.length}</span> film(s) trouvé(s)
              </p>
              {(selectedGenre !== 'all' || selectedYear !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedGenre('all');
                    setSelectedYear('all');
                    setSearchQuery('');
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </div>

          {/* Liste des films */}
          {filteredFilms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  {/* Affiche du film */}
                  <div className="relative overflow-hidden">
                    <img
                      src={film.affiche_film}
                      alt={`Affiche de ${film.titre}`}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Détails du film */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{film.titre}</h2>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-semibold">Genre:</span> {film.sujet_film}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="font-semibold">Réalisateur:</span> {film.realisateur}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">Sortie:</span> {film.date_film}
                      </p>
                    </div>

                    <a
                      href={`/film/details/${film.id}`}
                      className="block w-full py-2 px-4 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                      Voir les détails
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Film className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 font-semibold">Aucun film trouvé</p>
              <p className="text-gray-400 mt-2">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </section>
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