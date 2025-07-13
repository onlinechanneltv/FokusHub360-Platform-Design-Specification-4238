import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';

const { FiUsers, FiBarChart3, FiActivity, FiDollarSign, FiTarget, FiTrendingUp, FiClock, FiCheckCircle, 
  FiMenu, FiX, FiHome, FiLayers, FiMessageSquare, FiSettings } = FiIcons;

const ManagerDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Team Members',
      value: '12',
      icon: FiUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Active Campaigns',
      value: '8',
      icon: FiActivity,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Monthly Revenue',
      value: '$24,500',
      icon: FiDollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Team Performance',
      value: '94%',
      icon: FiTrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  const teamMembers = [
    { name: 'Alice Johnson', role: 'Senior Researcher', campaigns: 5, status: 'active' },
    { name: 'Bob Smith', role: 'Market Analyst', campaigns: 3, status: 'active' },
    { name: 'Carol Davis', role: 'UX Researcher', campaigns: 4, status: 'busy' },
    { name: 'David Wilson', role: 'Data Analyst', campaigns: 2, status: 'active' }
  ];

  const recentCampaigns = [
    { id: 1, title: 'Movie Trailer Analysis', client: 'Universal Studios', status: 'active', progress: 75 },
    { id: 2, title: 'App UI Testing', client: 'TechStart Inc.', status: 'completed', progress: 100 },
    { id: 3, title: 'Brand Logo Research', client: 'Fashion Co.', status: 'planning', progress: 25 }
  ];

  const navigationItems = [
    { label: 'Dashboard', icon: FiHome, href: '/manager', active: location.pathname === '/manager' },
    { label: 'Team', icon: FiUsers, href: '/manager/team', active: location.pathname === '/manager/team' },
    { label: 'Campaigns', icon: FiActivity, href: '/manager/campaigns', active: location.pathname === '/manager/campaigns' },
    { label: 'Reports', icon: FiBarChart3, href: '/manager/reports', active: location.pathname === '/manager/reports' },
    { label: 'Tasks', icon: FiTarget, href: '/manager/tasks', active: location.pathname === '/manager/tasks' },
    { label: 'Messages', icon: FiMessageSquare, href: '/manager/messages', active: location.pathname === '/manager/messages' },
    { label: 'Settings', icon: FiSettings, href: '/manager/settings', active: location.pathname === '/manager/settings' }
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setMobileSidebarOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'primary';
      case 'planning':
        return 'warning';
      case 'busy':
        return 'danger';
      default:
        return 'default';
    }
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
            <Link to="/manager" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">Manager Panel</span>
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
              {navigationItems.map((item) => (
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
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-4 h-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Manager</p>
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
            <Link to="/manager" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">Manager Panel</span>
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
              {navigationItems.map((item) => (
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
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-4 h-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Manager</p>
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
            <span className="font-display font-bold text-lg text-gray-900">Manager Panel</span>
          </div>
          <div className="w-6 h-6">{/* Placeholder for balance */}</div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Manage your team and oversee focus group operations.
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
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Campaigns */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Campaigns</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate('/manager/campaigns')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{campaign.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{campaign.client}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge variant={getStatusColor(campaign.status)} className="mb-2">
                          {campaign.status}
                        </Badge>
                        <div className="text-sm text-gray-500">{campaign.progress}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Team Overview */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Overview</h2>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(member.status)} size="sm">
                          {member.status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {member.campaigns} campaigns
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/manager/team')}
                  >
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                    Manage Team
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/manager/reports')}
                  >
                    <SafeIcon icon={FiBarChart3} className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/manager/tasks')}
                  >
                    <SafeIcon icon={FiTarget} className="w-4 h-4 mr-2" />
                    Assign Tasks
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/manager/schedule')}
                  >
                    <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;