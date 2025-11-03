// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from "./templates/layout/hooks/useauth";
import Header from './templates/layout/header'
import LoadingSpinner from './templates/UI/loadingspinner'

// Pages utilisateur
import Dashboard from './templates/user_templates/dashboard'
import FilmsPage from './templates/user_templates/film'
import PlanningPage from './templates/user_templates/planning'
import ResultsPage from './templates/user_templates/resultat'

// Pages Admin / Jury / Président
import Admin from './templates/admin/admin'
import AdminFilmsPage from './templates/admin/admin_film'
import NoteJuryPage from './templates/jury_templates/note'
import JuryPresidentPage from './templates/president_jury_templates/president_note'

// Auth
import ProtectedRoute from './templates/Auth/ProtectedRoute'
import PublicOnlyRoute from './templates/Auth/PublicOnlyRoute'
import InscriptionPage from './templates/Auth/inscription'

const Login = () => <div className="container mx-auto px-4 py-8">Page de Connexion</div>
const Register = () => <div className="container mx-auto px-4 py-8">Page d'Inscription</div>

function App() {
  const { user, loading } = useAuth()

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
        <span className="ml-4">Chargement...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<InscriptionPage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/resultats" element={<ResultsPage />} />

          {/* Authentification */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Administration */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/planning" element={<PlanningPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/films" element={<AdminFilmsPage />} />
            <Route path="/admin/resultats" element={<ResultsPage />} />
          </Route>

          {/* Jury */}
          <Route element={<ProtectedRoute allowedRoles={['jury']} />}>
            <Route path="/jury/dashboard" element={<Dashboard />} />
            <Route path="/jury/films" element={<FilmsPage />} />
            <Route path="/jury/planning" element={<PlanningPage />} />
            <Route path="/jury/resultats" element={<ResultsPage />} />
            <Route path="/jury/notes" element={<NoteJuryPage />} />
          </Route>

          {/* Président du Jury */}
          <Route element={<ProtectedRoute allowedRoles={['president-jury']} />}>
            <Route path="/president-jury" element={<Dashboard />} />
            <Route path="/president-jury/films" element={<FilmsPage />} />
            <Route path="/president-jury/planning" element={<PlanningPage />} />
            <Route path="/president-jury/resultats" element={<ResultsPage />} />
            <Route path="/president-jury/notes" element={<JuryPresidentPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page non trouvée</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
