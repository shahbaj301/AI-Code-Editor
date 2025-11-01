import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-40 w-12 h-12 bg-pink-200 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-2000"></div>
      
      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
