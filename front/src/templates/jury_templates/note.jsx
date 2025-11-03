import React, { useState } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Star, CheckCircle, Film, Award } from 'lucide-react';

export default function NoteJuryPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState({});
  const [submittedFilms, setSubmittedFilms] = useState([]);

  // Données de démonstration
  const films = [
    {
      id_film: 1,
      titre: 'Terre des Hommes',
      affiche_film: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      id_realisateur: 'Marie Laurent',
      date_film: '2023-03-15',
      sujet_film: 'Un documentaire captivant sur la relation entre l\'homme et la nature, explorant les défis environnementaux contemporains.'
    },
    {
      id_film: 2,
      titre: 'Horizons Perdus',
      affiche_film: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      id_realisateur: 'Ahmed Ben Said',
      date_film: '2023-06-10',
      sujet_film: 'Exploration des civilisations anciennes et leur héritage dans le monde moderne.'
    },
    {
      id_film: 3,
      titre: 'Voix du Silence',
      affiche_film: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      id_realisateur: 'Fatma Slimani',
      date_film: '2022-11-05',
      sujet_film: 'Portrait intime de musiciens traditionnels et leur lutte pour préserver un patrimoine culturel menacé.'
    },
    {
      id_film: 4,
      titre: 'Mémoires Vivantes',
      affiche_film: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      id_realisateur: 'Karim Mansour',
      date_film: '2021-09-18',
      sujet_film: 'Témoignages poignants de témoins historiques qui racontent les grands événements du siècle dernier.'
    },
    {
      id_film: 5,
      titre: 'Échos du Désert',
      affiche_film: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
      id_realisateur: 'Sarah Benali',
      date_film: '2023-01-22',
      sujet_film: 'Immersion dans la vie nomade au Sahara, entre traditions ancestrales et modernité.'
    }
  ];

  const userEmail = 'jury@doc-tunis.com';

  const handleRatingChange = (filmId, critere, value) => {
    setNotes(prev => ({
      ...prev,
      [filmId]: {
        ...prev[filmId],
        [critere]: value
      }
    }));
  };

  const handleSubmit = (filmId, e) => {
    e.preventDefault();
    
    const filmNotes = notes[filmId];
    if (!filmNotes || !filmNotes.information || !filmNotes.direction || !filmNotes.impact) {
      alert('Veuillez noter tous les critères avant de soumettre !');
      return;
    }

    console.log('Soumission des notes pour le film', filmId, filmNotes);
    setSubmittedFilms(prev => [...prev, filmId]);
    alert('Note soumise avec succès ! Merci pour votre évaluation.');
  };

  const renderRatingButtons = (filmId, critere) => {
    return (
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map(value => (
          <button
            key={value}
            type="button"
            onClick={() => handleRatingChange(filmId, critere, value)}
            className={`w-12 h-12 rounded-lg font-bold transition-all ${
              notes[filmId]?.[critere] === value
                ? 'bg-red-600 text-white scale-110 shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  const getStarRating = (filmId, critere) => {
    const value = notes[filmId]?.[critere] || 0;
    return (
      <div className="flex gap-1 justify-center mt-2">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const isFilmSubmitted = (filmId) => submittedFilms.includes(filmId);
  const isFilmComplete = (filmId) => {
    const filmNotes = notes[filmId];
    return filmNotes && filmNotes.information && filmNotes.direction && filmNotes.impact;
  };

  const filteredFilms = films.filter(film =>
    film.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    film.id_realisateur.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <a href="/dashboard_jury" className="text-gray-700 hover:text-red-600 transition">Accueil</a>
            <a href="/film_jury" className="text-gray-700 hover:text-red-600 transition">Films</a>
            <a href="/planning_jury" className="text-gray-700 hover:text-red-600 transition">Planning</a>
            <a href="/resultats_jury" className="text-gray-700 hover:text-red-600 transition">Résultats</a>
            <a href="/note_jury" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Notes</a>
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Évaluez les Documentaires du Festival</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Notez chaque documentaire selon 3 critères. Vos évaluations contribuent au classement final.
          </p>
        </div>

        {/* Statistiques de progression */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre Progression</h3>
              <p className="text-gray-600">
                {submittedFilms.length} film{submittedFilms.length > 1 ? 's' : ''} évalué{submittedFilms.length > 1 ? 's' : ''} sur {films.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">{submittedFilms.length}</div>
                <div className="text-sm text-gray-600">Terminés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{films.length - submittedFilms.length}</div>
                <div className="text-sm text-gray-600">Restants</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(submittedFilms.length / films.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Liste des films */}
        <div className="space-y-8">
          {filteredFilms.map((film) => (
            <div
              key={film.id_film}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                isFilmSubmitted(film.id_film) ? 'opacity-75' : 'hover:shadow-2xl'
              }`}
            >
              <div className="md:flex">
                {/* Affiche */}
                <div className="md:w-80 relative">
                  <img
                    src={film.affiche_film}
                    alt={film.titre}
                    className="w-full h-full object-cover"
                  />
                  {isFilmSubmitted(film.id_film) && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <div className="text-center text-white">
                        <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-xl font-bold">Évalué</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 p-8">
                  {/* En-tête du film */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-3xl font-bold text-gray-900">{film.titre}</h2>
                      {isFilmSubmitted(film.id_film) && (
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Soumis
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>Réalisateur :</strong> {film.id_realisateur}</p>
                      <p><strong>Date :</strong> {film.date_film}</p>
                      <p className="mt-3"><strong>Description :</strong> {film.sujet_film}</p>
                    </div>
                  </div>

                  {/* Formulaire de notation */}
                  {!isFilmSubmitted(film.id_film) ? (
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Notez ce documentaire
                      </h3>

                      <div className="space-y-6">
                        {/* Critère 1 : Qualité de l'Information */}
                        <div className="bg-blue-50 rounded-lg p-5">
                          <label className="block text-lg font-semibold text-gray-900 mb-3">
                            📊 Qualité de l'Information
                          </label>
                          <p className="text-sm text-gray-600 mb-4">
                            Pertinence, exactitude et profondeur des informations présentées
                          </p>
                          {renderRatingButtons(film.id_film, 'information')}
                          {getStarRating(film.id_film, 'information')}
                        </div>

                        {/* Critère 2 : Direction Artistique */}
                        <div className="bg-purple-50 rounded-lg p-5">
                          <label className="block text-lg font-semibold text-gray-900 mb-3">
                            🎬 Direction Artistique
                          </label>
                          <p className="text-sm text-gray-600 mb-4">
                            Qualité de la réalisation, du montage et des choix esthétiques
                          </p>
                          {renderRatingButtons(film.id_film, 'direction')}
                          {getStarRating(film.id_film, 'direction')}
                        </div>

                        {/* Critère 3 : Impact Émotionnel */}
                        <div className="bg-pink-50 rounded-lg p-5">
                          <label className="block text-lg font-semibold text-gray-900 mb-3">
                            ❤️ Impact Émotionnel
                          </label>
                          <p className="text-sm text-gray-600 mb-4">
                            Capacité à toucher, émouvoir et marquer le spectateur
                          </p>
                          {renderRatingButtons(film.id_film, 'impact')}
                          {getStarRating(film.id_film, 'impact')}
                        </div>
                      </div>

                      {/* Bouton de soumission */}
                      <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {isFilmComplete(film.id_film) ? (
                            <span className="text-green-600 font-semibold flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Tous les critères sont notés
                            </span>
                          ) : (
                            <span className="text-orange-600 font-semibold">
                              ⚠️ Veuillez noter tous les critères
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleSubmit(film.id_film, e)}
                          disabled={!isFilmComplete(film.id_film)}
                          className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                            isFilmComplete(film.id_film)
                              ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Soumettre la Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-6">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-green-900 mb-2">
                          Évaluation soumise avec succès !
                        </h3>
                        <p className="text-green-700">
                          Merci pour votre contribution à la sélection des documentaires.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Information</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {notes[film.id_film]?.information}/5
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Direction</p>
                            <p className="text-2xl font-bold text-purple-600">
                              {notes[film.id_film]?.direction}/5
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Impact</p>
                            <p className="text-2xl font-bold text-pink-600">
                              {notes[film.id_film]?.impact}/5
                            </p>
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

        {filteredFilms.length === 0 && (
          <div className="text-center py-16">
            <Film className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-semibold">Aucun film trouvé</p>
            <p className="text-gray-400 mt-2">Modifiez votre recherche</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Festival de Documentaires. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}