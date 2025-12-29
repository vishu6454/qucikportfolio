import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  Eye,
  Palette,
  LogIn,
  UserPlus
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // ✅ centralized logout
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              QuickPortfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/templates">Templates</NavLink>
            <NavLink to="/create">Create</NavLink>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(p => !p)}
                  className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name || 'Profile'}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2"
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>

                      <DropdownLink to="/create" icon={<Palette />}>
                        Create Portfolio
                      </DropdownLink>

                      <DropdownLink to="/dashboard" icon={<Eye />}>
                        Dashboard
                      </DropdownLink>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-slate-700 hover:text-blue-600">
                  <LogIn className="inline h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <UserPlus className="inline h-4 w-4 mr-1" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(p => !p)}
            className="md:hidden text-slate-700"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                <MobileLink to="/" onClick={setIsMenuOpen}>Home</MobileLink>
                <MobileLink to="/templates" onClick={setIsMenuOpen}>Templates</MobileLink>
                <MobileLink to="/create" onClick={setIsMenuOpen}>Create</MobileLink>

                {!user ? (
                  <>
                    <MobileLink to="/login" onClick={setIsMenuOpen}>Login</MobileLink>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-center"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:bg-red-50 px-2 py-2 rounded"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

/* ---------------- SMALL HELPERS ---------------- */

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="
      relative text-slate-700 font-medium transition-colors
      hover:text-blue-600
      after:absolute after:left-0 after:-bottom-1
      after:h-0.5 after:w-0 after:bg-blue-600
      after:transition-all hover:after:w-full
    "
  >
    {children}
  </Link>
);

const DropdownLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-2 hover:bg-slate-50"
  >
    <span className="mr-2 h-4 w-4">{icon}</span>
    {children}
  </Link>
);

const MobileLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={() => onClick(false)}
    className="text-slate-700 hover:text-blue-600 transition py-2"
  >
    {children}
  </Link>
);

export default Navbar;
