import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Heart, 
  Home, 
  Users, 
  Calendar, 
  AlertTriangle, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

const DashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const isOrphanageManager = user?.role === 'orphanage_manager';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
      isActive
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }`;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Heart className="h-8 w-8 text-white" />
                <span className="ml-2 text-white text-xl font-bold">
                  {t('common.brand')}
                </span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                <NavLink to="/dashboard" end className={navLinkClass}>
                  <Home className="mr-3 h-5 w-5" />
                  {t('dashboard.overview')}
                </NavLink>

                {isOrphanageManager && (
                  <>
                    <NavLink to="/dashboard/orphanages" className={navLinkClass}>
                      <Home className="mr-3 h-5 w-5" />
                      {t('dashboard.myOrphanage')}
                    </NavLink>
                    <NavLink to="/dashboard/orphans" className={navLinkClass}>
                      <Users className="mr-3 h-5 w-5" />
                      {t('dashboard.orphans')}
                    </NavLink>
                  </>
                )}

                {isAdmin && (
                  <>
                    <NavLink to="/dashboard/orphanages" className={navLinkClass}>
                      <Home className="mr-3 h-5 w-5" />
                      {t('dashboard.orphanages')}
                    </NavLink>
                    <NavLink to="/dashboard/users" className={navLinkClass}>
                      <Users className="mr-3 h-5 w-5" />
                      {t('dashboard.users')}
                    </NavLink>
                  </>
                )}

                <NavLink to="/dashboard/campaigns" className={navLinkClass}>
                  <Calendar className="mr-3 h-5 w-5" />
                  {t('dashboard.campaigns')}
                </NavLink>

                {isAdmin && (
                  <NavLink to="/dashboard/disaster" className={navLinkClass}>
                    <AlertTriangle className="mr-3 h-5 w-5" />
                    {t('dashboard.disasterRelief')}
                  </NavLink>
                )}

                <NavLink to="/dashboard/donations" className={navLinkClass}>
                  <DollarSign className="mr-3 h-5 w-5" />
                  {t('dashboard.donations')}
                </NavLink>

                {(isAdmin || isOrphanageManager) && (
                  <NavLink to="/dashboard/reports" className={navLinkClass}>
                    <BarChart3 className="mr-3 h-5 w-5" />
                    {t('dashboard.reports')}
                  </NavLink>
                )}

                <NavLink to="/dashboard/settings" className={navLinkClass}>
                  <Settings className="mr-3 h-5 w-5" />
                  {t('dashboard.settings')}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-primary-600 hover:text-white"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  {t('auth.logout')}
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs font-medium text-primary-200">
                      {user?.role === 'admin'
                        ? t('roles.admin')
                        : user?.role === 'orphanage_manager'
                        ? t('roles.orphanageManager')
                        : t('roles.donor')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75\" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Heart className="h-8 w-8 text-white" />
                  <span className="ml-2 text-white text-xl font-bold">
                    {t('common.brand')}
                  </span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {/* Same links as desktop sidebar */}
                  <NavLink to="/dashboard" end className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                    <Home className="mr-3 h-5 w-5" />
                    {t('dashboard.overview')}
                  </NavLink>

                  {isOrphanageManager && (
                    <>
                      <NavLink to="/dashboard/orphanages" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                        <Home className="mr-3 h-5 w-5" />
                        {t('dashboard.myOrphanage')}
                      </NavLink>
                      <NavLink to="/dashboard/orphans" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                        <Users className="mr-3 h-5 w-5" />
                        {t('dashboard.orphans')}
                      </NavLink>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <NavLink to="/dashboard/orphanages" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                        <Home className="mr-3 h-5 w-5" />
                        {t('dashboard.orphanages')}
                      </NavLink>
                      <NavLink to="/dashboard/users" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                        <Users className="mr-3 h-5 w-5" />
                        {t('dashboard.users')}
                      </NavLink>
                    </>
                  )}

                  <NavLink to="/dashboard/campaigns" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                    <Calendar className="mr-3 h-5 w-5" />
                    {t('dashboard.campaigns')}
                  </NavLink>

                  {isAdmin && (
                    <NavLink to="/dashboard/disaster" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                      <AlertTriangle className="mr-3 h-5 w-5" />
                      {t('dashboard.disasterRelief')}
                    </NavLink>
                  )}

                  <NavLink to="/dashboard/donations" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                    <DollarSign className="mr-3 h-5 w-5" />
                    {t('dashboard.donations')}
                  </NavLink>

                  {(isAdmin || isOrphanageManager) && (
                    <NavLink to="/dashboard/reports" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                      <BarChart3 className="mr-3 h-5 w-5" />
                      {t('dashboard.reports')}
                    </NavLink>
                  )}

                  <NavLink to="/dashboard/settings" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                    <Settings className="mr-3 h-5 w-5" />
                    {t('dashboard.settings')}
                  </NavLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-primary-600 hover:text-white"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    {t('auth.logout')}
                  </button>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs font-medium text-primary-200">
                        {user?.role === 'admin'
                          ? t('roles.admin')
                          : user?.role === 'orphanage_manager'
                          ? t('roles.orphanageManager')
                          : t('roles.donor')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex justify-between items-center bg-white shadow-sm">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center px-4">
            <Heart className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-800">
              {t('common.brand')}
            </span>
          </div>
          <div className="pr-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center focus:outline-none"
            >
              {user?.name.charAt(0).toUpperCase()}
              {mobileMenuOpen ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="py-1">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('auth.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;