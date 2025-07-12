import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';

const { 
  FiUsers, FiDollarSign, FiBarChart3, FiSettings, FiKey, 
  FiShield, FiTrendingUp, FiActivity, FiDatabase, FiGlobe
} = FiIcons;

const AdminDashboard = () => {
  const { user } = useAuthStore();

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
    { action: 'New user registered', details: 'client@example.com', time: '2 minutes ago', type: 'user' },
    { action: 'Campaign completed', details: 'Movie Trailer Feedback', time: '15 minutes ago', type: 'campaign' },
    { action: 'Payment processed', details: '$2,500 to Universal Studios', time: '1 hour ago', type: 'payment' },
    { action: 'System update deployed', details: 'Version 2.1.3', time: '2 hours ago', type: 'system' },
    { action: 'New participant verified', details: 'participant@example.com', time: '3 hours ago', type: 'user' }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
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
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'campaign' ? 'bg-green-500' :
                      activity.type === 'payment' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}></div>
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
                          metric.trend === 'up' ? 'text-green-500' :
                          metric.trend === 'down' ? 'text-red-500' :
                          'text-gray-500'
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
      </div>
    </div>
  );
};

export default AdminDashboard;