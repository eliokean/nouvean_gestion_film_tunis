import React, { useState } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, Calendar, ChevronLeft, ChevronRight, Clock, MapPin, X, Film } from 'lucide-react';

export default function PlanningPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedFilmForReservation, setSelectedFilmForReservation] = useState(null);
  const [reservationData, setReservationData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nbPlaces: 1
  });
  const [reservations, setReservations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Données de démonstration des projections
  const filmData = {
    '2024-11-15': [
      { id: 1, title: 'Terre des Hommes', heure: '14:00', lieu: 'Salle 1', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400', duree: '95 min' },
      { id: 2, title: 'Horizons Perdus', heure: '19:00', lieu: 'Salle 2', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', duree: '110 min' }
    ],
    '2024-11-16': [
      { id: 3, title: 'Voix du Silence', heure: '16:30', lieu: 'Salle 1', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', duree: '88 min' },
      { id: 4, title: 'Mémoires Vivantes', heure: '21:00', lieu: 'Salle 3', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', duree: '120 min' }
    ],
    '2024-11-20': [
      { id: 5, title: 'Échos du Désert', heure: '14:00', lieu: 'Salle 2', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400', duree: '102 min' }
    ],
    '2024-11-22': [
      { id: 6, title: 'Lumières Urbaines', heure: '18:00', lieu: 'Salle 1', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400', duree: '95 min' },
      { id: 7, title: 'Racines Profondes', heure: '20:30', lieu: 'Salle 2', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400', duree: '115 min' }
    ],
    '2024-11-25': [
      { id: 8, title: 'Océans Infinis', heure: '15:00', lieu: 'Salle 3', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', duree: '98 min' }
    ]
  };

  // Films pour la vue hebdomadaire
  const weeklyFilms = [
    {
      id: 1,
      title: 'Mortal Engines',
      rating: '16+',
      duree: '120 min',
      genre: 'Adventure',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      days: ['Lundi 17 Fév', 'Mardi 18 Fév', 'Mercredi 19 Fév', 'Jeudi 20 Fév', 'Vendredi 21 Fév', 'Samedi 22 Fév', 'Dimanche 23 Fév'],
      times: ['11:30', '17:00', '19:45', '21:45']
    }
  ];

  // Génération du calendrier
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, dateKey, hasEvent: !!filmData[dateKey] });
    }

    return days;
  };

  const handleDayClick = (dateKey) => {
    const films = filmData[dateKey] || [];
    setSelectedDate(dateKey);
    setSelectedFilms(films);
    setShowPopup(true);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (dateKey) => {
    const date = new Date(dateKey);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const monthYear = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Titre */}
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-10 h-10 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Planning des Films</h1>
        </div>

        {/* Sélecteur de vue */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveView('calendar')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeView === 'calendar' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setActiveView('weekly')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeView === 'weekly' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Hebdomadaire
          </button>
          <button
            onClick={() => setActiveView('daily')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeView === 'daily' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Journalier
          </button>
        </div>

        {/* Vue Mensuelle (Calendrier) */}
        {activeView === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* En-tête du calendrier */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{monthYear}</h2>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-2">
              {generateCalendar().map((item, index) => (
                <div
                  key={index}
                  onClick={() => item && item.hasEvent && handleDayClick(item.dateKey)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-lg font-medium transition ${
                    item
                      ? item.hasEvent
                        ? 'bg-red-600 text-white cursor-pointer hover:bg-red-700 hover:scale-105'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                      : ''
                  }`}
                >
                  {item ? item.day : ''}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span>Projections programmées</span>
              </div>
            </div>
          </div>
        )}

        {/* Vue Hebdomadaire */}
        {activeView === 'weekly' && (
          <div className="space-y-6">
            {weeklyFilms.map(film => (
              <div key={film.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="md:flex">
                  <img src={film.image} alt={film.title} className="w-full md:w-64 h-64 object-cover" />
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{film.title}</h3>
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
                        {film.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{film.duree} | {film.genre}</p>

                    {/* Jours */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Jours de projection:</h4>
                      <div className="flex flex-wrap gap-2">
                        {film.days.map((day, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Horaires */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Horaires:</h4>
                      <div className="flex flex-wrap gap-2">
                        {film.times.map((time, idx) => (
                          <button
                            key={idx}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vue Journalière */}
        {activeView === 'daily' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Films du {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(filmData)
                .filter(([date]) => new Date(date).toDateString() === new Date().toDateString())
                .flatMap(([, films]) => films)
                .map(film => (
                  <div key={film.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <img src={film.image} alt={film.title} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{film.title}</h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{film.heure} - {film.duree}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{film.lieu}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Films programmés pour le {selectedDate && formatDate(selectedDate)}
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {selectedFilms.length > 0 ? (
                <div className="space-y-4">
                  {selectedFilms.map(film => (
                    <div key={film.id} className="flex gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                      <img src={film.image} alt={film.title} className="w-32 h-32 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{film.title}</h4>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{film.heure} - {film.duree}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{film.lieu}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun film programmé pour cette date.</p>
                </div>
              )}
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