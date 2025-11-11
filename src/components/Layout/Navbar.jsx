import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services/auth';
import { toast } from 'react-toastify';
import { FiSun, FiMoon, FiLogOut, FiUser, FiCalendar, FiPlus, FiUsers } from 'react-icons/fi';
import Spinner from './Spinner';

const Navbar = () => {
  const { user, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
      navigate('/');
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileHover = () => {
    setShowTooltip(true);
  };

  const handleProfileLeave = () => {
    setShowTooltip(false);
  };

  if (loading) {
    return (
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  Helping Hands
                </span>
              </Link>
            </div>
            <Spinner size="sm" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-4xl hover:bg-gray-500 p-2 rounded-lg font-bold text-primary-600 dark:text-primary-400 transition-colors duration-300">
                Helping <span className='text-yellow-300'>Hands</span> 
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/events"
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Upcoming Events
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <button
                    ref={profileRef}
                    onClick={toggleDropdown}
                    onMouseEnter={handleProfileHover}
                    onMouseLeave={handleProfileLeave}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 relative"
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=0ea5e9&color=fff`}
                      alt={user.displayName || user.email}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>

                  {/* User Name Tooltip */}
                  {showTooltip && !isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap">
                      {user.displayName || user.email}
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 right-3 w-3 h-3 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
                    </div>
                  )}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-600 z-50 transition-colors duration-300">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/create-event"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiPlus className="mr-2" />
                      Create Event
                    </Link>
                    
                    <Link
                      to="/manage-events"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiCalendar className="mr-2" />
                      Manage Events
                    </Link>
                    

                    {/* aita maahin er banano project */}

                    <Link
                      to="/joined-events"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUsers className="mr-2" />
                      Joined Events
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600  hover:bg-gray-500 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;