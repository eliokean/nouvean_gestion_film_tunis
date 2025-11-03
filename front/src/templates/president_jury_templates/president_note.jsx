import React, { useState } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Star, CheckCircle, Award, TrendingUp } from 'lucide-react';

export default function JuryPresidentPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalRatings, setGlobalRatings] = useState({});
  const [submittedFilms, setSubmittedFilms] = useState([]);

  // Données de démonstration
  const films = [
    {
      id_film: 1,
      titre: 'Terre des Hommes',
      affiche_film: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
      id_realisateur: 'Marie Laurent',
      date_film: '2023-03-15',
      sujet_film: 'Un documentaire captivant sur la relation entre l\'homme et la nature, explorant les défis environnementaux contemporains.',
      notes: [
        { prenom_utilisateur: 'Sophie Martin', role_jury: 'Jury', information: 5, direction: 4, impact: 5 },
        { prenom_utilisateur: 'Ahmed Karim', role_jury: 'Jury', information: 4, direction: 5, impact: 4 },
        { prenom_utilisateur: 'Laura Benali', role_jury: 'Jury', information: 5, direction: 5, impact: 5 }
      ]
    },
    {
      id_film: 2,
      titre: 'Horizons Perdus',
      affiche_film: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      id_realisateur: 'Ahmed Ben Said',
      date_film: '2023-06-10',
      sujet_film: 'Exploration des civilisations anciennes et leur héritage dans le monde moderne.',
      notes: [
        { prenom_utilisateur: 'Sophie Martin', role_jury: 'Jury', information: 4, direction: 4, impact: 3 },
        { prenom_utilisateur: 'Ahmed Karim', role_jury: 'Jury', information: 3, direction: 4, impact: 4 }
      ]
    },
    {
      id_film: 3,
      titre: 'Voix du Silence',
      affiche_film: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      id_realisateur: 'Fatma Slimani',
      date_film: '2022-11-05',
      sujet_film: 'Portrait intime de musiciens traditionnels et leur lutte pour préserver un patrimoine culturel menacé.',
      notes: [
        { prenom_utilisateur: 'Sophie Martin', role_jury: 'Jury', information: 5, direction: 5, impact: 4 },
        { prenom_utilisateur: 'Ahmed Karim', role_jury: 'Jury', information: 4, direction: 5, impact: 5 },
        { prenom_utilisateur: 'Laura Benali', role_jury: 'Jury', information: 4, direction: 4, impact: 5 }
      ]
    },
    {
      id_film: 4,
      titre: 'Mémoires Vivantes',
      affiche_film: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      id_realisateur: 'Karim Mansour',
      date_film: '2021-09-18',
      sujet_film: 'Témoignages poignants de témoins historiques qui racontent les grands événements du siècle dernier.',
      notes: [
        { prenom_utilisateur: 'Sophie Martin', role_jury: 'Jury', information: 3, direction: 3, impact: 4 },
        { prenom_utilisateur: 'Ahmed Karim', role_jury: 'Jury', information: 4, direction: 3, impact: 3 }
      ]
    },
    {
      id_film: 5,
      titre: 'Échos du Désert',
      affiche_film: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
      id_realisateur: 'Sarah Benali',
      date_film: '2023-01-22',
      sujet_film: 'Immersion dans la vie nomade au Sahara, entre traditions ancestrales et modernité.',
      notes: [
        { prenom_utilisateur: 'Sophie Martin', role_jury: 'Jury', information: 5, direction: 4, impact: 5 },
        { prenom_utilisateur: 'Laura Benali', role_jury: 'Jury', information: 4, direction: 5, impact: 4 }
      ]
    }
  ];

  const userEmail = 'president@doc-tunis.com';

  const handleGlobalRatingChange = (filmId, rating) => {
    setGlobalRatings(prev => ({
      ...prev,
      [filmId]: rating
    }));
  };

  const handleSubmit = (filmId, e) => {
    e.preventDefault();
    
    const rating = globalRatings[filmId];
    if (!rating) {
      alert('Veuillez sélectionner une note globale avant de soumettre !');
      return;
    }

    console.log('Soumission de la note globale pour le film', filmId, ':', rating);
    setSubmittedFilms(prev => [...prev, filmId]);
    alert('Note globale soumise avec succès ! Merci pour votre évaluation.');
  };

  const isFilmSubmitted = (filmId) => submittedFilms.includes(filmId);
  const isRatingSelected = (filmId) => !!globalRatings[filmId];

  const calculateAverage = (notes, critere) => {
    if (!notes || notes.length === 0) return 0;
    const juryNotes = notes.filter(n => n.role_jury === 'Jury');
    if (juryNotes.length === 0) return 0;
    const sum = juryNotes.reduce((acc, note) => acc + note[critere], 0);
    return (sum / juryNotes.length).toFixed(1);
  };

  const calculateGlobalAverage = (film) => {
    const avgInfo = parseFloat(calculateAverage(film.notes, 'information'));
    const avgDir = parseFloat(calculateAverage(film.notes, 'direction'));
    const avgImpact = parseFloat(calculateAverage(film.notes, 'impact'));
    return ((avgInfo + avgDir + avgImpact) / 3).toFixed(1);
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
            <a href="/dashboard_president" className="text-gray-700 hover:text-red-600 transition">Accueil</a>
            <a href="/film_president" className="text-gray-700 hover:text-red-600 transition">Films</a>
            <a href="/planning_president" className="text-gray-700 hover:text-red-600 transition">Planning</a>
            <a href="/resultats_president" className="text-gray-700 hover:text-red-600 transition">Résultats</a>
            <a href="/jury_president" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Notes</a>
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
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                P
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
            <Award className="w-12 h-12 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-900">Évaluez les Documentaires du Festival</h1>
          </div>
          <p className="text-gray-600 text-lg">
            En tant que Président, consultez les notes du jury et attribuez votre note globale finale.
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
                <div className="text-4xl font-bold text-amber-600">{submittedFilms.length}</div>
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
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
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

                  {/* Moyenne des notes du jury */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">Moyenne des Notes du Jury</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Information</p>
                        <p className="text-3xl font-bold text-blue-600">
                          {calculateAverage(film.notes, 'information')}
                        </p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(calculateAverage(film.notes, 'information'))
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Direction</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {calculateAverage(film.notes, 'direction')}
                        </p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(calculateAverage(film.notes, 'direction'))
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Impact</p>
                        <p className="text-3xl font-bold text-pink-600">
                          {calculateAverage(film.notes, 'impact')}
                        </p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(calculateAverage(film.notes, 'impact'))
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-center bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Moyenne</p>
                        <p className="text-3xl font-bold text-amber-700">
                          {calculateGlobalAverage(film)}
                        </p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(calculateGlobalAverage(film))
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tableau des notes détaillées */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes détaillées des membres du jury :</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Membre</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Information</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Direction</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Impact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {film.notes && film.notes.length > 0 ? (
                            film.notes
                              .filter(note => note.role_jury === 'Jury')
                              .map((note, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition">
                                  <td className="border border-gray-300 px-4 py-3">{note.prenom_utilisateur}</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                                      {note.information}/5
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
                                      {note.direction}/5
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full font-semibold">
                                      {note.impact}/5
                                    </span>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="border border-gray-300 px-4 py-3 text-center text-gray-500">
                                Aucune note pour ce film.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Section Note Globale du Président */}
                  {!isFilmSubmitted(film.id_film) ? (
                    <div className="border-t pt-6">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Award className="w-6 h-6 text-amber-600" />
                          Note Globale du Président
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          En tant que Président du jury, attribuez votre note globale finale pour ce documentaire
                        </p>

                        <label className="block text-gray-700 font-semibold mb-3">Note globale (sur 5) :</label>
                        <div className="flex gap-3 mb-6">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleGlobalRatingChange(film.id_film, rating)}
                              className={`w-16 h-16 rounded-lg font-bold text-xl transition-all ${
                                globalRatings[film.id_film] === rating
                                  ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white scale-110 shadow-lg'
                                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-amber-400 hover:scale-105'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {isRatingSelected(film.id_film) ? (
                              <span className="text-green-600 font-semibold flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Note sélectionnée
                              </span>
                            ) : (
                              <span className="text-orange-600 font-semibold">
                                ⚠️ Veuillez sélectionner une note
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleSubmit(film.id_film, e)}
                            disabled={!isRatingSelected(film.id_film)}
                            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                              isRatingSelected(film.id_film)
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 hover:scale-105 shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Soumettre la Note Globale
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-6">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-green-900 mb-2">
                          Note globale soumise avec succès !
                        </h3>
                        <p className="text-green-700 mb-4">
                          Votre évaluation en tant que Président a été enregistrée.
                        </p>
                        <div className="bg-white rounded-lg p-6 inline-block">
                          <p className="text-sm text-gray-600 mb-2">Note Globale du Président</p>
                          <p className="text-5xl font-bold text-amber-600 mb-3">
                            {globalRatings[film.id_film]}/5
                          </p>
                          <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < globalRatings[film.id_film]
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
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
          <p className="text-gray-400">&copy; 2024 Festival de Documentaires. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}