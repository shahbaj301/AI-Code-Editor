import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <header className="bg-gray-900 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-cyan-400 font-extrabold text-xl">
        <Link to="/" className="hover:text-cyan-300 transition-colors duration-200">
          Intelligent Code Editor
        </Link>
      </h1>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/codes" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              My Snippets
            </Link>
            <span className="text-gray-400 font-medium">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-1 rounded font-semibold transition-colors duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
