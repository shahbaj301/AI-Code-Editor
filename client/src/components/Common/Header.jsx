import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Code,
  Trophy,
  BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();
    toast.success('Logged out successfully');
    navigate('/landing');
  };

  // Mock notifications - will be replaced with real data from backend
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You completed 10 JavaScript challenges',
      time: '2 hours ago',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'course',
      title: 'New Course Available',
      message: 'Advanced React Patterns is now live',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-blue-500'
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>

            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 font-bold text-gray-900">CodeAI</span>
            </div>
          </div>

          {/* Center - Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, challenges, or topics..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right side - Notifications, User pill, and Logout button */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    {/* Notification content */}
                    {/* ... (same as before) */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User pill - ALWAYS visible */}
            <span className="user-pill cursor-default select-none px-4 py-1 rounded-full bg-cyan-400 text-black font-semibold">
              {user?.role || user?.username || 'User'}
            </span>

            {/* LOGOUT button ALWAYS visible */}
            <button
              onClick={handleLogout}
              className="logout-button px-4 py-2 rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-500 transition"
            >
              Logout
            </button>

            {/* User dropdown menu - optional (can keep or remove) */}
            {/* ... your existing dropdown code if wanted ... */}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
