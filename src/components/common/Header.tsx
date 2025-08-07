import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Heart, Menu, X, User, LogOut, Home } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsProfileOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'text-white bg-primary-600'
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
    }`;

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Heart className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-primary-800">
                  {t('common.brand')}
                </span>
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <NavLink to="/" className={navLinkClass}>
                {t('nav.home')}
              </NavLink>
              <NavLink to="/orphanages" className={navLinkClass}>
                {t('nav.orphanages')}
              </NavLink>
              <NavLink to="/campaigns" className={navLinkClass}>
                {t('nav.campaigns')}
              </NavLink>
              <NavLink to="/disaster-relief" className={navLinkClass}>
                {t('nav.disaster')}
              </NavLink>
              <NavLink to="/events" className={navLinkClass}>
                {t('nav.events')}
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                {t('nav.about')}
              </NavLink>
            </nav>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <LanguageSwitcher />
            <Link
              to="/donate"
              className="btn-primary flex items-center space-x-1"
            >
              <Heart className="h-4 w-4" />
              <span>{t('common.donate')}</span>
            </Link>
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={toggleProfile}
                  >
                    <span className="sr-only">{t('common.openUserMenu')}</span>
                    <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        {t('nav.dashboard')}
                      </div>
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('auth.logout')}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-outline">
                  {t('auth.login')}
                </Link>
                <Link to="/register" className="btn-secondary">
                  {t('auth.register')}
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">{t('common.openMenu')}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/orphanages"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.orphanages')}
            </NavLink>
            <NavLink
              to="/campaigns"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.campaigns')}
            </NavLink>
            <NavLink
              to="/disaster-relief"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.disaster')}
            </NavLink>
            <NavLink
              to="/events"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.events')}
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t('nav.about')}
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-4 space-y-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2" />
                      {t('nav.dashboard')}
                    </div>
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-2" />
                      {t('auth.logout')}
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col px-4 space-y-2">
                <Link
                  to="/login"
                  className="btn-outline text-center"
                  onClick={closeMenu}
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary text-center"
                  onClick={closeMenu}
                >
                  {t('auth.register')}
                </Link>
              </div>
            )}
            <div className="mt-3 px-4">
              <Link
                to="/donate"
                className="w-full btn-primary flex items-center justify-center space-x-1"
                onClick={closeMenu}
              >
                <Heart className="h-5 w-5" />
                <span>{t('common.donate')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;