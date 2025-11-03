// components/Layout/navs/JuryNav.jsx
const JuryNav = () => (
  <nav className="hidden md:flex space-x-8">
    <a href="/dashboard" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">
      Accueil Jury
    </a>
    <a href="/jury/films-a-noter" className="text-gray-700 hover:text-red-600 transition">
      Films à Noter
    </a>
    <a href="/president-jury/notes" className="text-gray-700 hover:text-red-600 transition">
      Mes Notes
    </a>
    <a href="/planning" className="text-gray-700 hover:text-red-600 transition">
      Planning
    </a>
    <a href="/jury/deliberations" className="text-gray-700 hover:text-red-600 transition">
      Délibérations
    </a>
  </nav>
);

export default JuryNav;