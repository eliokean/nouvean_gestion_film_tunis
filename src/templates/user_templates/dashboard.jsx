import React, { useState, useEffect } from 'react';
import { Search, User, ChevronDown, LogOut, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [storyScroll, setStoryScroll] = useState(0);

  // Données de démonstration
  const carouselImages = [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    'https://images.unsplash.com/photo-1574267432644-f261a223f7e1?w=800'
  ];

  const projections = [
    { id: 1, titre: 'Terre des Hommes', date: '2024-11-15', heure: '14:00', lieu: 'Salle 1', affiche: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400' },
    { id: 2, titre: 'Horizons Perdus', date: '2024-11-15', heure: '16:30', lieu: 'Salle 2', affiche: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
    { id: 3, titre: 'Voix du Silence', date: '2024-11-16', heure: '19:00', lieu: 'Salle 1', affiche: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
    { id: 4, titre: 'Mémoires Vivantes', date: '2024-11-16', heure: '21:00', lieu: 'Salle 3', affiche: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
    { id: 5, titre: 'Échos du Désert', date: '2024-11-17', heure: '14:00', lieu: 'Salle 2', affiche: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400' },
    { id: 6, titre: 'Lumières Urbaines', date: '2024-11-17', heure: '18:00', lieu: 'Salle 1', affiche: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400' }
  ];

  const films = [
    { id: 1, titre: 'La Route Sauvage', date: '2024-01-15', affiche: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400' },
    { id: 2, titre: 'Océans Bleus', date: '2024-02-20', affiche: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
    { id: 3, titre: 'Dans les Montagnes', date: '2024-03-10', affiche: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
    { id: 4, titre: 'Cultures du Monde', date: '2024-04-05', affiche: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
    { id: 5, titre: 'Histoires Oubliées', date: '2024-05-12', affiche: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
    { id: 6, titre: 'Visions d\'Avenir', date: '2024-06-18', affiche: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' }
  ];

  const userEmail = 'utilisateur@doc-tunis.com';

  // Carrousel automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll des projections
  useEffect(() => {
    const timer = setInterval(() => {
      setStoryScroll((prev) => (prev + 1) % projections.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section avec Carrousel */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Texte de présentation */}
          <section className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Doc à Tunis</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Le Festival du Cinéma 2024 est un événement exceptionnel qui rassemble les passionnés du septième art pour une immersion dans l'univers cinématographique mondial. Ce festival met à l'honneur la diversité des genres et des cultures, avec une sélection de films primés, de projections inédites et des rencontres enrichissantes avec des réalisateurs, des acteurs et des experts du cinéma.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/galerie">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                  Galerie
                </button>
              </a>
              <a href="/contact">
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-semibold">
                  Contact
                </button>
              </a>
              <a href="/Apropos">
                <button className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold">
                  À propos
                </button>
              </a>
            </div>
          </section>

          {/* Carrousel */}
          <section className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <img src={img} alt={`Affiche ${index + 1}`} className="w-full h-96 object-cover" />
                </div>
              ))}
            </div>

            {/* Navigation du carrousel */}
            <div className="flex items-center justify-center mt-4 gap-4">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </div>

        {/* Projections Programmées (Stories) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Projections programmées</h2>
          <div className="relative">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {projections.map((projection) => (
                <div
                  key={projection.id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition snap-start"
                >
                  <img src={projection.affiche} alt={projection.titre} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{projection.titre}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Date : {projection.date} | Heure : {projection.heure}
                    </p>
                    <p className="text-sm text-gray-600">Lieu : {projection.lieu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Liste des Films */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Films du festival</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {films.map((film) => (
              <div
                key={film.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition hover:scale-105 cursor-pointer"
              >
                <img src={film.affiche} alt={film.titre} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{film.titre}</h3>
                  <p className="text-sm text-gray-600">Date de sortie : {film.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistiques */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Statistiques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Films Enregistrés</h3>
              <p className="text-5xl font-bold">{films.length}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Projections Planifiées</h3>
              <p className="text-5xl font-bold">{projections.length}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}