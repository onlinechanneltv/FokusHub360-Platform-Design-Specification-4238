import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useFocusGroupStore from '../../store/focusGroupStore';
import useAuthStore from '../../store/authStore';

const { 
  FiPlus, FiUsers, FiBarChart3, FiClock, FiDollarSign, 
  FiTrendingUp, FiEye, FiMessageSquare, FiPlay 
} = FiIcons;

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const { focusGroups, loadFocusGroups, loading } = useFocusGroupStore();

  useEffect(() => {
    loadFocusGroups();
  }, [loadFocusGroups]);

  const stats = [
    {
      label: 'Active Campaigns',
      value: focusGroups.filter(g => g.status === 'active').length,
      icon: FiPlay,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Total Participants',
      value: focusGroups.reduce((sum, g) => sum + g.participantCount, 0),
      icon: FiUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Completed Groups',
      value: focusGroups.filter(g => g.status === 'completed').length,
      icon: FiBarChart3,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Total Spent',
      value: `$${focusGroups.reduce((sum, g) => sum + (g.budget || 0), 0).toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'draft': return 'warning';
      default: return 'default';
    }
  };

  const recentActivities = [
    { action: 'New participant joined', campaign: 'Movie Trailer Feedback', time: '2 hours ago' },
    { action: 'Report generated', campaign: 'App UI/UX Design Review', time: '4 hours ago' },
    { action: 'Campaign completed', campaign: 'Book Cover Design Testing', time: '1 day ago' },
    { action: 'Payment processed', campaign: 'Movie Trailer Feedback', time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                Manage your focus groups and track insights from your dashboard.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="primary" 
                size="lg"
                icon={<SafeIcon icon={FiPlus} />}
              >
                <Link to="/client/create-group">Create Focus Group</Link>
              </Button>
            </div>
          </div>
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
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Focus Groups */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Focus Groups</h2>
                <Link to="/focus-groups" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="rounded-lg bg-gray-200 h-16 w-16"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {focusGroups.slice(0, 3).map((group) => (
                    <div key={group.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={FiPlay} className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{group.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                              {group.participantCount}/{group.targetCount}
                            </span>
                            <span className="flex items-center">
                              <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                              {new Date(group.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={getStatusColor(group.status)}>
                          {group.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Link to={`/focus-groups/${group.id}`}>
                            <SafeIcon icon={FiEye} className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.campaign}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  <Link to="/client/create-group">New Campaign</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiBarChart3} className="w-4 h-4 mr-2" />
                  <Link to="/reports">View Reports</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                  <Link to="/participants">Browse Participants</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2" />
                  <Link to="/support">Contact Support</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;