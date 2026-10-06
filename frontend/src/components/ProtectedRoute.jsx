import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatusMessage from './StatusMessage';

// Only lets logged-in users see the children; others go to /login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <StatusMessage type="loading" message="Checking your session..." />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
