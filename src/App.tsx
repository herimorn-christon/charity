import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OrphanagesPage from './pages/OrphanagesPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import LoginPage from './pages/LoginPage';
import OrphanageDetailPage from './pages/OrphanageDetailPage';
import DisasterReliefPage from './pages/DisasterReliefPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import RegisterPage from './pages/RegisterPage';
import DonatePage from './pages/DonatePage';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import OrphanageManagement from './pages/dashboard/OrphanageManagement';
import OrphanProfiles from './pages/dashboard/OrphanProfiles';
import CampaignManagement from './pages/dashboard/CampaignManagement';
import DonationHistory from './pages/dashboard/DonationHistory';
import UserManagement from './pages/dashboard/UserManagement';
import ReportsPage from './pages/dashboard/ReportsPage';
import AccountSettings from './pages/dashboard/AccountSettings';

// Components
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="orphanages" element={<OrphanagesPage />} />
          <Route path="orphanages/:id" element={<OrphanageDetailPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="disaster-relief" element={<DisasterReliefPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="orphanages" element={<OrphanageManagement />} />
          <Route path="orphans" element={<OrphanProfiles />} />
          <Route path="campaigns" element={<CampaignManagement />} />
          <Route path="donations" element={<DonationHistory />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;