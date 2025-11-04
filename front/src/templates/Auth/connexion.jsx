import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle, LogIn } from 'lucide-react';

export default function ConnexionPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors([]);
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.email.trim()) {
      newErrors.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('L\'email n\'est pas valide');
    }
    if (!formData.password) {
      newErrors.push('Le mot de passe est requis');
    } else if (formData.password.length < 6) {
      newErrors.push('Le mot de passe doit contenir au moins 6 caractères');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.remember
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors(['Email ou mot de passe incorrect']);
        } else {
          setErrors(['Erreur du serveur. Veuillez réessayer.']);
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      alert('Connexion réussie ! Redirection en cours...');
      // Par exemple, stockez un token puis redirigez
      // localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard';

    } catch (error) {
      setErrors(['Impossible de joindre le serveur']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
            <span className="text-red-600 font-bold text-3xl">DT</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Doc à Tunis</h1>
          <p className="text-red-100">Festival International du Documentaire</p>
        </div>

        {/* Messages d'erreur */}
        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                {errors.map((err, i) => (
                  <p key={i} className="text-red-700 text-sm">{err}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-white">Connexion</h2>
            <p className="text-red-100 text-sm mt-2">Accédez à votre espace personnel</p>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900 transition">Se souvenir de moi</span>
              </label>
              <a href="/mot-de-passe-oublie" className="text-red-600 hover:text-red-700 font-medium transition">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <span>© 2024 Doc à Tunis. Tous droits réservés.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
