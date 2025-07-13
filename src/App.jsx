import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import CreateFocusGroup from './pages/client/CreateFocusGroup';

// Participant Pages
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import ParticipantFocusGroupDetail from './pages/participant/ParticipantFocusGroupDetail';
import ParticipantQuestionnaire from './pages/participant/ParticipantQuestionnaire';
import ParticipantCompletion from './pages/participant/ParticipantCompletion';
import ProfileSetup from './components/participant/ProfileSetup';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrganizations from './pages/admin/AdminOrganizations';
import AdminFocusGroups from './pages/admin/AdminFocusGroups';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminMessages from './pages/admin/AdminMessages';
import AdminApiKeys from './pages/admin/AdminApiKeys';
import AdminForms from './pages/admin/AdminForms';
import AdminSettings from './pages/admin/AdminSettings';
import AdminConfig from './pages/admin/AdminConfig';
import AdminPermissions from './pages/admin/AdminPermissions';
import AdminVerification from './pages/admin/AdminVerification';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminSecurity from './pages/admin/AdminSecurity';
import AdminEmailTemplates from './pages/admin/AdminEmailTemplates';
import AdminParticipants from './pages/admin/AdminParticipants';

// Public Pages
import Landing from './pages/Landing';

// Auth Store
import useAuthStore from './store/authStore';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') return <Navigate to="/admin" />;
    if (userRole === 'manager') return <Navigate to="/manager" />;
    if (userRole === 'participant') return <Navigate to="/participant" />;
    return <Navigate to="/client" />;
  }

  return children;
};

function App() {
  const { initialize, isAuthenticated, userRole } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Client Routes */}
            <Route
              path="/client"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/create-group"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin']}>
                  <CreateFocusGroup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/focus-groups"
              element={
                <ProtectedRoute allowedRoles={['client', 'admin', 'manager']}>
                  <AdminFocusGroups />
                </ProtectedRoute>
              }
            />
            
            {/* Participant Routes */}
            <Route
              path="/participant"
              element={
                <ProtectedRoute allowedRoles={['participant', 'admin']}>
                  <ParticipantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/profile-setup"
              element={
                <ProtectedRoute allowedRoles={['participant', 'admin']}>
                  <ProfileSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/groups/:groupId"
              element={
                <ProtectedRoute allowedRoles={['participant', 'admin']}>
                  <ParticipantFocusGroupDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/questionnaire/:groupId"
              element={
                <ProtectedRoute allowedRoles={['participant', 'admin']}>
                  <ParticipantQuestionnaire />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/completion/:groupId"
              element={
                <ProtectedRoute allowedRoles={['participant', 'admin']}>
                  <ParticipantCompletion />
                </ProtectedRoute>
              }
            />

            {/* Manager Routes */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/team"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/campaigns"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <AdminFocusGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/reports"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/tasks"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/schedule"
              element={
                <ProtectedRoute allowedRoles={['manager', 'admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/organizations"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminOrganizations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/focus-groups"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFocusGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/api-keys"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminApiKeys />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/email-templates"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminEmailTemplates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/config"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminConfig />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/permissions"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPermissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/verification"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminVerification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/audit-logs"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAuditLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/security"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSecurity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/participants"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <AdminParticipants />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route - Redirect to appropriate dashboard */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  userRole === 'admin' ? (
                    <Navigate to="/admin" />
                  ) : userRole === 'manager' ? (
                    <Navigate to="/manager" />
                  ) : userRole === 'participant' ? (
                    <Navigate to="/participant" />
                  ) : (
                    <Navigate to="/client" />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;