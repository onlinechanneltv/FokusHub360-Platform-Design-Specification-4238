import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import useAuthStore from '../../store/authStore';

const { 
  FiMenu, FiX, FiUsers, FiSettings, FiBarChart3, FiLayers, 
  FiActivity, FiMessageSquare, FiServer, FiClock, FiLock,
  FiUserCheck, FiShield, FiKey, FiDatabase, FiGlobe, FiMail
} = FiIcons;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', icon: FiBarChart3, href: '/admin', active: location.pathname === '/admin' },
    { 
      label: 'Users', 
      icon: FiUsers, 
      href: '/admin/users', 
      active: location.pathname === '/admin/users', 
      badge: '12,543' 
    },
    { 
      label: 'Organizations', 
      icon: FiLayers, 
      href: '/admin/organizations', 
      active: location.pathname === '/admin/organizations' 
    },
    { 
      label: 'Focus Groups', 
      icon: FiActivity, 
      href: '/admin/focus-groups', 
      active: location.pathname === '/admin/focus-groups', 
      badge: '234' 
    },
    { 
      label: 'Analytics', 
      icon: FiBarChart3, 
      href: '/admin/analytics', 
      active: location.pathname === '/admin/analytics' 
    },
    { 
      label: 'Messages', 
      icon: FiMessageSquare, 
      href: '/admin/messages', 
      active: location.pathname === '/admin/messages', 
      badge: '3' 
    },
    { type: 'divider' },
    { label: 'System', type: 'header' },
    { 
      label: 'API Management', 
      icon: FiServer, 
      href: '/admin/api-keys', 
      active: location.pathname === '/admin/api-keys' 
    },
    { 
      label: 'Form Builder', 
      icon: FiDatabase, 
      href: '/admin/forms', 
      active: location.pathname === '/admin/forms' 
    },
    { 
      label: 'Email Templates', 
      icon: FiMail, 
      href: '/admin/email-templates', 
      active: location.pathname === '/admin/email-templates' 
    },
    { 
      label: 'System Settings', 
      icon: FiSettings, 
      href: '/admin/settings', 
      active: location.pathname === '/admin/settings' 
    },
    { 
      label: 'Global Config', 
      icon: FiGlobe, 
      href: '/admin/config', 
      active: location.pathname === '/admin/config' 
    },
    { type: 'divider' },
    { label: 'Security', type: 'header' },
    { 
      label: 'Permissions', 
      icon: FiLock, 
      href: '/admin/permissions', 
      active: location.pathname === '/admin/permissions' 
    },
    { 
      label: 'User Verification', 
      icon: FiUserCheck, 
      href: '/admin/verification', 
      active: location.pathname === '/admin/verification' 
    },
    { 
      label: 'Audit Logs', 
      icon: FiClock, 
      href: '/admin/audit-logs', 
      active: location.pathname === '/admin/audit-logs' 
    },
    { 
      label: 'Security Reports', 
      icon: FiShield, 
      href: '/admin/security', 
      active: location.pathname === '/admin/security' 
    }
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <div
        className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:block hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">
                Admin Panel
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigationItems.map((item, index) => {
                if (item.type === 'divider') {
                  return <hr key={`divider-${index}`} className="my-3 border-gray-200" />;
                }

                if (item.type === 'header') {
                  return (
                    <div key={`header-${item.label}`} className="px-3 my-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </h3>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      item.active
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <SafeIcon
                        icon={item.icon}
                        className={`w-5 h-5 mr-3 ${
                          item.active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.active ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-4 h-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">
                Admin Panel
              </span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigationItems.map((item, index) => {
                if (item.type === 'divider') {
                  return <hr key={`divider-${index}`} className="my-3 border-gray-200" />;
                }

                if (item.type === 'header') {
                  return (
                    <div key={`header-${item.label}`} className="px-3 my-2">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </h3>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      item.active
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <SafeIcon
                        icon={item.icon}
                        className={`w-5 h-5 mr-3 ${
                          item.active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.active ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-4 h-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <SafeIcon icon={FiMenu} className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-display font-bold text-lg text-gray-900">
              Admin Panel
            </span>
          </div>
          <div className="w-6 h-6">{/* Placeholder for balance */}</div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;