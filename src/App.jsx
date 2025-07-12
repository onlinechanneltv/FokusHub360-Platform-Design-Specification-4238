import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProfileSetup from './components/participant/ProfileSetup';
import useAuthStore from './store/authStore';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const DashboardRedirect = () => {
  const { userRole } = useAuthStore();
  
  switch (userRole) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'manager':
      return <Navigate to="/manager" replace />;
    case 'participant':
      return <Navigate to="/participant" replace />;
    default:
      return <Navigate to="/client" replace />;
  }
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            {/* Dashboard Redirect */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            } />

            {/* Client Routes */}
            <Route path="/client" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />

            {/* Participant Routes */}
            <Route path="/participant" element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/participant/profile-setup" element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ProfileSetup />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Manager Routes */}
            <Route path="/manager" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Manager Dashboard</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;