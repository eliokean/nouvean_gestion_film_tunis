// components/Layout/navs/AdminNav.jsx
const AdminNav = () => (
  <nav className="hidden md:flex space-x-8">
    <a href="/admin/dashboard" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">
      Accueil
    </a>
    <a href="/admin/films" className="text-gray-700 hover:text-red-600 transition">
      Films
    </a>
    <a href="/admin/planning" className="text-gray-700 hover:text-red-600 transition">
      Planning
    </a>
    <a href="/admin/resultats" className="text-gray-700 hover:text-red-600 transition">
      Résultats
    </a>
    <a href="/admin" className="text-gray-700 hover:text-red-600 transition">
      Administration
    </a>
  </nav>
);

export default AdminNav;