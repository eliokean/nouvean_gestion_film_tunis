// components/Layout/navs/AdminNav.jsx
const AdminNav = () => (
  <nav className="hidden md:flex space-x-8">
    <a href="/dashboard" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">
      Tableau de Bord
    </a>
    <a href="/admin/utilisateurs" className="text-gray-700 hover:text-red-600 transition">
      Utilisateurs
    </a>
    <a href="/admin/roles" className="text-gray-700 hover:text-red-600 transition">
      Rôles
    </a>
    <a href="/admin/logs" className="text-gray-700 hover:text-red-600 transition">
      Logs Système
    </a>
    <a href="/admin/audit" className="text-gray-700 hover:text-red-600 transition">
      Audit
    </a>
  </nav>
);

export default AdminNav;