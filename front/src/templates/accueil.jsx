import React, { useState, useEffect } from 'react';
import { Film, Play, Image as ImageIcon, Users, Mail, ChevronRight, Star, Calendar, Award } from 'lucide-react';

export default function AccueilPublicPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600',
      title: 'Festival International du Documentaire',
      subtitle: 'Doc à Tunis 2024',
      description: 'Découvrez les meilleurs documentaires du monde entier'
    },
    {
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600',
      title: 'Rencontres avec les Réalisateurs',
      subtitle: 'Masterclass & Débats',
      description: 'Échangez avec des cinéastes de renommée internationale'
    },
    {
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600',
      title: 'Compétition Officielle',
      subtitle: 'Prix du Meilleur Documentaire',
      description: 'Suivez la sélection des films en compétition'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Film className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-2xl font-bold">Doc à Tunis</span>
            </div>

            {/* Menu */}
            <ul className="hidden md:flex space-x-8">
              <li>
                <a href="/galerie" className="text-white hover:text-red-600 transition flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Galerie
                </a>
              </li>
              <li>
                <a href="/Apropos" className="text-white hover:text-red-600 transition flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-red-600 transition flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </li>
            </ul>

            {/* Boutons d'action (mobile hidden) */}
            <div className="hidden md:flex space-x-3">
              <a
                href="/connexion"
                className="px-5 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition font-semibold"
              >
                Se connecter
              </a>
              <a
                href="/inscription"
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Inscription
              </a>
            </div>

            {/* Menu mobile */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section avec Carrousel */}
      <section className="relative h-screen">
        {/* Images en arrière-plan */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        ))}

        {/* Contenu */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === activeSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 absolute translate-y-8'
                  }`}
                >
                  <div className="inline-block px-4 py-2 bg-red-600 rounded-full text-white text-sm font-semibold mb-4">
                    {slide.subtitle}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
                    {slide.description}
                  </p>
                </div>
              ))}

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/connexion"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-lg font-semibold group"
                >
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Se connecter
                </a>
                <a
                  href="/inscription"
                  className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition text-lg font-semibold group"
                >
                  Créer un compte
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Indicateurs du carrousel */}
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1 rounded-full transition-all ${
                      index === activeSlide ? 'bg-red-600 w-12' : 'bg-gray-400 w-8'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Film className="w-10 h-10" />, number: '150+', label: 'Documentaires' },
              { icon: <Users className="w-10 h-10" />, number: '85+', label: 'Réalisateurs' },
              { icon: <Calendar className="w-10 h-10" />, number: '200+', label: 'Projections' },
              { icon: <Award className="w-10 h-10" />, number: '12', label: 'Prix Décernés' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-red-600 flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous rejoindre */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pourquoi Doc à Tunis ?
            </h2>
            <p className="text-xl text-gray-400">
              Le rendez-vous incontournable du documentaire en Méditerranée
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Sélection d\'Exception',
                description: 'Des documentaires soigneusement sélectionnés par un jury international de renom'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Rencontres Uniques',
                description: 'Échangez avec les réalisateurs lors de masterclass et débats exclusifs'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Compétition Officielle',
                description: 'Assistez à la remise des prix et découvrez les lauréats du festival'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-all hover:transform hover:scale-105 border border-gray-700"
              >
                <div className="text-red-600 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à découvrir le festival ?
          </h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Créez votre compte dès maintenant et accédez à l'ensemble de notre programmation exclusive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ajouter-user"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition text-lg font-bold shadow-xl"
            >
              Commencer Gratuitement
              <ChevronRight className="w-6 h-6" />
            </a>
            <a
              href="/connexion"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition text-lg font-bold"
            >
              <Play className="w-6 h-6" />
              J'ai déjà un compte
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo et description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl font-bold">Doc à Tunis</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Festival International du Documentaire - Le rendez-vous incontournable du cinéma documentaire en Méditerranée
              </p>
            </div>

            {/* Liens Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="/galerie" className="text-gray-400 hover:text-red-600 transition">Galerie</a></li>
                <li><a href="/Apropos" className="text-gray-400 hover:text-red-600 transition">À propos</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-red-600 transition">Contact</a></li>
              </ul>
            </div>

            {/* Liens Compte */}
            <div>
              <h4 className="text-white font-semibold mb-4">Compte</h4>
              <ul className="space-y-2">
                <li><a href="/connexion" className="text-gray-400 hover:text-red-600 transition">Se connecter</a></li>
                <li><a href="/ajouter-user" className="text-gray-400 hover:text-red-600 transition">Inscription</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Doc à Tunis - Festival International du Documentaire. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}