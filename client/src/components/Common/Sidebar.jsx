import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Code2, 
  Trophy, 
  User, 
  BarChart3,
  Settings,
  HelpCircle,
  Sparkles,
  X,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      color: 'text-blue-600'
    },
    {
      title: 'Courses',
      icon: BookOpen,
      path: '/courses',
      color: 'text-green-600'
    },
    {
      title: 'Practice',
      icon: Code2,
      path: '/practice',
      color: 'text-purple-600'
    },
    {
      title: 'Achievements',
      icon: Trophy,
      path: '/achievements',
      color: 'text-yellow-600'
    },
    {
      title: 'Progress',
      icon: BarChart3,
      path: '/progress',
      color: 'text-indigo-600'
    },
    {
      title: 'Profile',
      icon: User,
      path: '/profile',
      color: 'text-gray-600'
    }
  ];

  const bottomMenuItems = [
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings'
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      path: '/help'
    }
  ];

  return (
    <div className="h-full bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">CodeAI</h1>
              <p className="text-gray-500 text-xs">Learning Assistant</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900 text-sm">AI Assistant</span>
          </div>
          <p className="text-blue-700 text-xs mb-3">
            Get instant help with your coding questions and challenges.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
            Ask AI Assistant
          </button>
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="mt-8 px-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
              <span className="text-sm text-gray-500">5/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '71%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-600">
              Great progress! Complete 2 more challenges to reach your weekly goal.
            </p>
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
