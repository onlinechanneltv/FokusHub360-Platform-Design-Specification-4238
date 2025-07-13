import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminOrganizations from './pages/admin/AdminOrganizations'
import AdminFocusGroups from './pages/admin/AdminFocusGroups'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminMessages from './pages/admin/AdminMessages'
import AdminApiKeys from './pages/admin/AdminApiKeys'
import AdminForms from './pages/admin/AdminForms'
import AdminSettings from './pages/admin/AdminSettings'
import AdminConfig from './pages/admin/AdminConfig'
import AdminPermissions from './pages/admin/AdminPermissions'
import AdminVerification from './pages/admin/AdminVerification'
import AdminAuditLogs from './pages/admin/AdminAuditLogs'
import AdminSecurity from './pages/admin/AdminSecurity'
import AdminEmailTemplates from './pages/admin/AdminEmailTemplates'
import AdminParticipants from './pages/admin/AdminParticipants'
import AdminPages from './pages/admin/AdminPages'

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import CreateFocusGroup from './pages/client/CreateFocusGroup'
import FocusGroupsList from './pages/client/FocusGroupsList'
import Reports from './pages/client/Reports'
import Participants from './pages/client/Participants'
import Messages from './pages/client/Messages'
import Settings from './pages/client/Settings'

// Participant Pages
import ParticipantDashboard from './pages/participant/ParticipantDashboard'
import ProfileSetup from './components/participant/ProfileSetup'
import ParticipantFocusGroupDetail from './pages/participant/ParticipantFocusGroupDetail'
import ParticipantQuestionnaire from './pages/participant/ParticipantQuestionnaire'
import ParticipantCompletion from './pages/participant/ParticipantCompletion'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

// Public Route Component (redirects if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuthStore()

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'admin': return <Navigate to="/admin" replace />
      case 'manager': return <Navigate to="/manager" replace />
      case 'participant': return <Navigate to="/participant" replace />
      default: return <Navigate to="/client" replace />
    }
  }

  return children
}

// Layout wrapper for pages that need navbar and footer
const PageLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PageLayout>
                <Landing />
              </PageLayout>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
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
            path="/admin/email-templates" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminEmailTemplates />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/participants" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminParticipants />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/pages" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPages />
              </ProtectedRoute>
            } 
          />

          {/* Manager Routes */}
          <Route 
            path="/manager" 
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Client Routes */}
          <Route 
            path="/client" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/client/create-group" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <CreateFocusGroup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/focus-groups" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <FocusGroupsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Reports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participants" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Participants />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Messages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* Participant Routes */}
          <Route 
            path="/participant" 
            element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/profile-setup" 
            element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ProfileSetup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/groups/:groupId" 
            element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantFocusGroupDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/questionnaire/:groupId" 
            element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantQuestionnaire />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participant/completion/:groupId" 
            element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantCompletion />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Routes */}
          <Route 
            path="/unauthorized" 
            element={
              <PageLayout>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
                    <button 
                      onClick={() => window.history.back()} 
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </PageLayout>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <PageLayout>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                    <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                    <a href="/" className="text-primary-600 hover:text-primary-700">
                      Return Home
                    </a>
                  </div>
                </div>
              </PageLayout>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App