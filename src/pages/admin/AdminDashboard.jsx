import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';

const {
  FiUsers,
  FiDollarSign,
  FiBarChart3,
  FiSettings,
  FiKey,
  FiShield,
  FiTrendingUp,
  FiActivity,
  FiDatabase,
  FiGlobe,
  FiMenu,
  FiX,
  FiHome,
  FiLayers,
  FiMessageSquare,
  FiAlertCircle,
  FiServer,
  FiClock,
  FiGrid,
  FiFile,
  FiUserCheck,
  FiLock
} = FiIcons;

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      icon: FiUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Active Campaigns',
      value: '234',
      change: '+8.2%',
      icon: FiActivity,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Revenue (Month)',
      value: '$45,230',
      change: '+15.3%',
      icon: FiDollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'System Health',
      value: '99.8%',
      change: '+0.1%',
      icon: FiShield,
      color: 'text-green-600',
      bg: 'bg-green-100'
    }
  ];

  const recentActivities = [
    {
      action: 'New user registered',
      details: 'client@example.com',
      time: '2 minutes ago',
      type: 'user'
    },
    {
      action: 'Campaign completed',
      details: 'Movie Trailer Feedback',
      time: '15 minutes ago',
      type: 'campaign'
    },
    {
      action: 'Payment processed',
      details: '$2,500 to Universal Studios',
      time: '1 hour ago',
      type: 'payment'
    },
    {
      action: 'System update deployed',
      details: 'Version 2.1.3',
      time: '2 hours ago',
      type: 'system'
    },
    {
      action: 'New participant verified',
      details: 'participant@example.com',
      time: '3 hours ago',
      type: 'user'
    }
  ];

  const systemMetrics = [
    { name: 'API Requests', value: '2.4M', trend: 'up' },
    { name: 'Storage Used', value: '78%', trend: 'stable' },
    { name: 'Active Sessions', value: '1,234', trend: 'up' },
    { name: 'Error Rate', value: '0.02%', trend: 'down' }
  ];

  const quickActions = [
    { label: 'User Management', icon: FiUsers, href: '/admin/users' },
    { label: 'API Keys', icon: FiKey, href: '/admin/api-keys' },
    { label: 'System Settings', icon: FiSettings, href: '/admin/settings' },
    { label: 'Analytics', icon: FiBarChart3, href: '/admin/analytics' },
    { label: 'Form Builder', icon: FiDatabase, href: '/admin/forms' },
    { label: 'Global Config', icon: FiGlobe, href: '/admin/config' }
  ];

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: FiHome,
      href: '/admin',
      active: location.pathname === '/admin'
    },
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
      label: 'Pages',
      icon: FiFile,
      href: '/admin/pages',
      active: location.pathname === '/admin/pages'
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
      <div className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:block hidden`}>
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
                          item.active
                            ? 'text-primary-600'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant={item.active ? 'primary' : 'default'}
                        size="sm"
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
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
      <div className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:hidden`}>
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
                          item.active
                            ? 'text-primary-600'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant={item.active ? 'primary' : 'default'}
                        size="sm"
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
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
          <div className="w-6 h-6">
            {/* Placeholder for balance */}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              System overview and management controls
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div
                    className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm mb-2">{stat.label}</div>
                  <div className="text-green-600 text-sm font-medium">{stat.change}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.type === 'user'
                            ? 'bg-blue-500'
                            : activity.type === 'campaign'
                            ? 'bg-green-500'
                            : activity.type === 'payment'
                            ? 'bg-yellow-500'
                            : 'bg-purple-500'
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* System Metrics & Quick Actions */}
            <div className="space-y-6">
              {/* System Metrics */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Metrics</h2>
                <div className="space-y-3">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                        <SafeIcon
                          icon={FiTrendingUp}
                          className={`w-4 h-4 ${
                            metric.trend === 'up'
                              ? 'text-green-500'
                              : metric.trend === 'down'
                              ? 'text-red-500'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center space-y-1 h-auto py-3"
                      onClick={() => navigate(action.href)}
                    >
                      <SafeIcon icon={action.icon} className="w-5 h-5" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* System Status */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <Badge variant="success">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Services</span>
                    <Badge variant="success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">File Storage</span>
                    <Badge variant="success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Service</span>
                    <Badge variant="warning">Degraded</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;