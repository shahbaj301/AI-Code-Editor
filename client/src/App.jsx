import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import useAuth from './hooks/useAuth';
import Header from './components/UI/Header';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Editor from './pages/Editor';
import SavedCodes from './pages/SavedCodes';
import Loader from './components/UI/Loader';

// Protected Route wrapper remains the same
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <Loader text="Loading app..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header is shown only for authenticated users */}
      {user && <Header />}

      <Routes>
        {/* Public Routes accessible to everyone */}
        <Route path="/landing" element={<LandingPage />} />

        {/* --- Main Change Here --- */}
        {/* Root route logic: directs to dashboard if logged in, otherwise to the landing page. */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />}
        />

        {/* Protected Routes for logged-in users */}
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/codes" element={<ProtectedRoute><SavedCodes /></ProtectedRoute>} />

        {/* Redirect any unknown routes to the root to be handled correctly */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}