

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import Loader from '../UI/Loader';

export default function RegisterForm({ onRequestLogin, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await signup(registrationData);
      localStorage.setItem('token', response.data.data.token);
      setUser(response.data.data.user);
      navigate('/');
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-center mb-6">Join the intelligent coding community</p>
        {error && <div className="bg-red-600 text-red-100 p-3 rounded mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${validationErrors.firstName ? 'border-red-500 ring-red-500' : ''}`}
              />
              {validationErrors.firstName && (
                <span className="text-red-500 text-sm mt-1 block">{validationErrors.firstName}</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${validationErrors.username ? 'border-red-500 ring-red-500' : ''}`}
          />
          {validationErrors.username && (
            <span className="text-red-500 text-sm mt-1 block">{validationErrors.username}</span>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${validationErrors.email ? 'border-red-500 ring-red-500' : ''}`}
          />
          {validationErrors.email && (
            <span className="text-red-500 text-sm mt-1 block">{validationErrors.email}</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${validationErrors.password ? 'border-red-500 ring-red-500' : ''}`}
          />
          {validationErrors.password && (
            <span className="text-red-500 text-sm mt-1 block">{validationErrors.password}</span>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${validationErrors.confirmPassword ? 'border-red-500 ring-red-500' : ''}`}
          />
          {validationErrors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1 block">{validationErrors.confirmPassword}</span>
          )}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-gray-900 font-semibold py-3 rounded transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            className="text-cyan-400 hover:underline font-medium transition-colors duration-200"
            onClick={onRequestLogin}
          >
            Sign in
          </button>
        </div>
        {loading && <Loader />}
      </div>
    </div>
  );
}
