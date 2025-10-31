const PublicNav = () => (
  <nav className="hidden md:flex space-x-8">
    <a href="/dashboard" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Accueil</a>
    <a href="/film" className="text-gray-700 hover:text-red-600 transition">Films</a>
    <a href="/planning" className="text-gray-700 hover:text-red-600 transition">Planning</a>
    <a href="/resultats" className="text-gray-700 hover:text-red-600 transition">Résultats</a>
  </nav>
);

export default PublicNav;