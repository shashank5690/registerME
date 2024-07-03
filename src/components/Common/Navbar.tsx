import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to handle mobile menu

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center">User Management App</h1>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {user && user.roleType === 'admin' && (
                <Link
                  to="/user-list"
                  className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  User List
                </Link>
              )}
              {user && (
                <Link
                  to={`/profile/${user.id}`}
                  className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
              )}
              {!user ? (
                <>
                  {location.pathname !== '/login' && (
                    <Link
                      to="/login"
                      className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    to="/register"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 
              hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && user.roleType === 'admin' && (
              <Link
                to="/user-list"
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                User List
              </Link>
            )}
            {user && (
              <Link
                to={`/profile/${user.id}`}
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
            )}
            {!user ? (
              <>
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                )}
                <Link
                  to="/register"
                  className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
