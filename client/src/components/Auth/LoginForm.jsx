import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import Loader from '../UI/Loader';

export default function LoginForm({ onRequestRegister, onClose }) {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.data.token);
      setUser(res.data.data.user);
      nav('/');
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full shadow-lg border border-cyan-400/30 ring-1 ring-cyan-400/20"
      >
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-8 text-center tracking-wide">
          Login
        </h2>
        {error && (
          <p className="bg-red-600 text-red-100 py-3 px-4 rounded-lg mb-6 text-center font-semibold shadow-md">
              {error}
          </p>
        )}
        <div className="space-y-6 mb-8">
          <input
            type="text"
            placeholder="Email or Username"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-shadow duration-300 shadow-sm hover:shadow-cyan-600/40"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-shadow duration-300 shadow-sm hover:shadow-cyan-600/40"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold py-4 rounded-2xl shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300 disabled:bg-cyan-300 disabled:cursor-not-allowed disabled:brightness-90 focus:outline-none focus:ring-4 focus:ring-cyan-600"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        <div className="mt-8 text-center text-gray-300 font-medium">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-cyan-400 hover:underline font-semibold transition-colors duration-200"
            onClick={onRequestRegister}
          >
            Register
          </button>
        </div>
        {loading && <Loader />}
      </form>
    </div>
  );
}
