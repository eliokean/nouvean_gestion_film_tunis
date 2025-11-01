// components/Layout/Header.jsx
import { useState } from 'react';
import { Search, User, Settings, ChevronDown, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from './hooks/useauth';
import PublicNav from './navs/public_nav';
import AdminNav from './navs/admin_nav';
import JuryNav from './navs/jury_nav';

import { Routes, Route } from 'react-router-dom'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();

  // 1️⃣ Protection si user n'est pas encore chargé
  if (!user) return null; // ou spinner, ou nav publique

  const renderNavigation = () => {
    switch (user.role) {
      case 'admin':
        return <AdminNav />;
      case 'jury':
      case 'president-jury':
        return <JuryNav />;
      case 'inspection':
      case 'production':
      default:
        return <PublicNav />;
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DT
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
              Doc à Tunis
            </span>
          </a>
        </div>

        {/* Navigation Dynamique */}
        {renderNavigation()}

        {/* Recherche */}
        {!['admin', 'inspection'].includes(user.role) && (
          <div className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-64"
            />
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-sm font-medium text-gray-700 block">{user.name}</span>
              <span className="text-xs text-gray-500 capitalize">{user.role.replace('-', ' ')}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-red-600 font-medium capitalize mt-1">{user.role.replace('-', ' ')}</p>
              </div>
              <a href="/profil" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700 transition">
                <UserCircle className="w-4 h-4" /> 
                <span>Mon Profil</span>
              </a>
              <a href="/parametres" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700 transition">
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700 transition w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
