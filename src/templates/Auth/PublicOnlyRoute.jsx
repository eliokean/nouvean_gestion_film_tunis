// templates/Auth/PublicOnlyRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../layout/hooks/useauth' // Chemin corrigé
import LoadingSpinner from '../UI/loadingspinner'

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (user && user.role !== 'public') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicOnlyRoute