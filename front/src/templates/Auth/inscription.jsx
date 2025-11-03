import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function InscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    dateNaissance: '',
    email: '',
    motDePasse: '',
    confirmerMdp: '',
  });
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
  };

  const validateStep1 = () => {
    const newErrors = [];
    if (!formData.prenom.trim()) newErrors.push('Le prénom est requis');
    if (!formData.nom.trim()) newErrors.push('Le nom est requis');
    if (!formData.dateNaissance) newErrors.push('La date de naissance est requise');
    if (!formData.email.trim()) newErrors.push('L\'email est requis');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.push('L\'email n\'est pas valide');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = [];
    if (!formData.motDePasse) newErrors.push('Le mot de passe est requis');
    else if (formData.motDePasse.length < 6)
      newErrors.push('Le mot de passe doit contenir au moins 6 caractères');
    if (!formData.confirmerMdp) newErrors.push('La confirmation du mot de passe est requise');
    else if (formData.motDePasse !== formData.confirmerMdp)
      newErrors.push('Les mots de passe ne correspondent pas');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          dateNaissance: formData.dateNaissance,
          email: formData.email,
          motDePasse: formData.motDePasse,
          motDePasse_confirmation: formData.confirmerMdp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        localStorage.setItem('auth_token', data.data.token || '');
        localStorage.setItem('user', JSON.stringify(data.data.utilisateur));
        setTimeout(() => {
          alert('Inscription réussie ! Vous allez être redirigé...');
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        const errorMessages = [];
        if (data.errors) Object.values(data.errors).forEach((arr) => errorMessages.push(...arr));
        if (data.message) errorMessages.push(data.message);
        setErrors(errorMessages.length ? errorMessages : ['Erreur inconnue du serveur']);
      }
    } catch (error) {
      setErrors(['Une erreur est survenue. Veuillez réessayer.']);
      console.error(error);
    }
  };

  const progressPercentage = currentStep === 1 ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
            <span className="text-red-600 font-bold text-3xl">DT</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Doc à Tunis</h1>
          <p className="text-red-100">Festival International du Documentaire</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Inscription</h2>
            <p className="text-red-100 text-sm">
              Étape {currentStep} sur 2 - {currentStep === 1 ? 'Informations personnelles' : 'Informations du compte'}
            </p>
          </div>

          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-700 text-sm">{error}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <p className="text-green-700 font-semibold">Inscription réussie ! Redirection en cours...</p>
              </div>
            </div>
          )}

          <div className="p-6">
            {currentStep === 1 && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2 group"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    placeholder="Minimum 6 caractères"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Le mot de passe doit contenir au moins 6 caractères
                </p>

                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmerMdp"
                    value={formData.confirmerMdp}
                    onChange={handleChange}
                    placeholder="Confirmez votre mot de passe"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Récapitulatif :</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom complet:</span>
                      <span className="font-medium text-gray-900">{formData.prenom} {formData.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de naissance:</span>
                      <span className="font-medium text-gray-900">{formData.dateNaissance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    S'inscrire
                  </button>
                </div>
              </>
            )}
          </div>
        </form>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <a href="/connexion" className="text-red-600 hover:text-red-700 font-semibold">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
