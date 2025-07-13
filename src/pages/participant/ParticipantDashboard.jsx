import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const {
  FiStar,
  FiDollarSign,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiUsers,
  FiPlay,
  FiCheckCircle,
  FiMenu,
  FiX,
  FiHome,
  FiSettings,
  FiAlertTriangle,
  FiMessageSquare,
  FiCalendar,
  FiToggleLeft,
  FiToggleRight
} = FiIcons;

const ParticipantDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState('available');

  // Toggle availability status
  const toggleAvailability = () => {
    const newStatus = availabilityStatus === 'available' ? 'busy' : 'available';
    setAvailabilityStatus(newStatus);
    toast.success(`Status changed to ${newStatus}`);
    
    // In a real app, this would update the database
    // updateUserStatus(user.id, newStatus);
  };

  const stats = [
    {
      label: 'Groups Completed',
      value: '24',
      icon: FiCheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Total Earnings',
      value: '$1,250',
      icon: FiDollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: FiStar,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      label: 'Response Time',
      value: '2.3h',
      icon: FiClock,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    }
  ];

  const navigationItems = [
    { label: 'Dashboard', icon: FiHome, href: '/participant', active: location.pathname === '/participant' },
    { label: 'Available Groups', icon: FiPlay, href: '/participant/available-groups', active: location.pathname === '/participant/available-groups' },
    { label: 'My Groups', icon: FiTarget, href: '/participant/my-groups', active: location.pathname === '/participant/my-groups' },
    { label: 'Earnings', icon: FiDollarSign, href: '/participant/earnings', active: location.pathname === '/participant/earnings' },
    { label: 'Achievements', icon: FiAward, href: '/participant/achievements', active: location.pathname === '/participant/achievements' },
    { label: 'Profile', icon: FiUsers, href: '/participant/profile', active: location.pathname === '/participant/profile' },
    { label: 'Settings', icon: FiSettings, href: '/participant/settings', active: location.pathname === '/participant/settings' }
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setMobileSidebarOpen(false);
  };

  const availableGroups = [
    {
      id: '1',
      title: 'Movie Trailer Feedback - Action Thriller',
      client: 'Universal Studios',
      reward: '$50',
      duration: '15-20 minutes',
      deadline: '2 days',
      type: 'video',
      matchScore: 95,
      responseDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Mobile App UI Testing',
      client: 'TechStart Inc.',
      reward: '$35',
      duration: '10-15 minutes',
      deadline: '3 days',
      type: 'design',
      matchScore: 88,
      responseDeadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      title: 'Book Cover Design Feedback',
      client: 'Penguin Random House',
      reward: 'Book + $25',
      duration: '5-10 minutes',
      deadline: '5 days',
      type: 'image',
      matchScore: 92,
      responseDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    }
  ];

  const recentCompletions = [
    { title: 'Streaming Service Logo Test', reward: '$45', completedAt: '2 days ago', rating: 5 },
    { title: 'Restaurant App Prototype', reward: '$30', completedAt: '1 week ago', rating: 5 },
    { title: 'Fashion Brand Campaign', reward: '$60', completedAt: '2 weeks ago', rating: 4 }
  ];

  const achievements = [
    { name: 'Quick Responder', description: 'Complete 10 groups within 24h', icon: FiClock, earned: true },
    { name: 'Quality Contributor', description: 'Maintain 4.5+ rating', icon: FiStar, earned: true },
    { name: 'Media Expert', description: 'Complete 50 media reviews', icon: FiPlay, earned: false },
    { name: 'Top Performer', description: 'Earn $1000+ in rewards', icon: FiTrendingUp, earned: true }
  ];

  // Format response deadline
  const formatDeadline = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInHours = Math.round((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
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
            <Link to="/participant" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">Participant</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
          
          {/* Availability Toggle */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Availability Status</span>
              <button
                onClick={toggleAvailability}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  availabilityStatus === 'available' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`${
                    availabilityStatus === 'available' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {availabilityStatus === 'available'
                ? 'You will receive new group invitations'
                : 'You will not receive new invitations'}
            </p>
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
                <p className="text-xs text-gray-500">Participant</p>
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
            <Link to="/participant" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-display font-bold text-lg text-gray-900">Participant</span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
          
          {/* Availability Toggle */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Availability Status</span>
              <button
                onClick={toggleAvailability}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  availabilityStatus === 'available' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`${
                    availabilityStatus === 'available' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {availabilityStatus === 'available'
                ? 'You will receive new group invitations'
                : 'You will not receive new invitations'}
            </p>
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
                <p className="text-xs text-gray-500">Participant</p>
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
            <span className="font-display font-bold text-lg text-gray-900">Participant</span>
          </div>
          <div className="w-6 h-6">
            <SafeIcon 
              icon={availabilityStatus === 'available' ? FiToggleRight : FiToggleLeft} 
              className={`w-6 h-6 ${availabilityStatus === 'available' ? 'text-green-500' : 'text-gray-400'}`}
              onClick={toggleAvailability}
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Discover new focus groups and track your earnings.
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
            {/* Available Focus Groups */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Available Focus Groups</h2>
                  <Badge variant="primary">{availableGroups.length} matches</Badge>
                </div>
                <div className="space-y-4">
                  {availableGroups.map((group) => (
                    <div
                      key={group.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{group.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {group.client}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                              {group.duration}
                            </span>
                            <span className="flex items-center">
                              <SafeIcon icon={FiTarget} className="w-4 h-4 mr-1" />
                              {group.deadline} left
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600 mb-1">
                            {group.reward}
                          </div>
                          <Badge variant="success" size="sm">
                            {group.matchScore}% match
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Response deadline warning */}
                      <div className="flex items-center mb-3 text-xs text-orange-600">
                        <SafeIcon icon={FiAlertTriangle} className="w-3 h-3 mr-1" />
                        <span>Respond within: {formatDeadline(group.responseDeadline)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="primary" size="sm">
                          {group.type}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              toast.success('You declined this focus group');
                              // In a real app, this would call an API
                            }}
                          >
                            Decline
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                          >
                            <Link to={`/participant/groups/${group.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Completions */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Completions</h2>
                <div className="space-y-3">
                  {recentCompletions.map((completion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{completion.title}</p>
                        <p className="text-xs text-gray-600">{completion.completedAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{completion.reward}</p>
                        <div className="flex items-center">
                          {[...Array(completion.rating)].map((_, i) => (
                            <SafeIcon
                              key={i}
                              icon={FiStar}
                              className="w-3 h-3 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Achievements */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          achievement.earned ? 'bg-green-100' : 'bg-gray-200'
                        }`}
                      >
                        <SafeIcon
                          icon={achievement.icon}
                          className={`w-4 h-4 ${
                            achievement.earned ? 'text-green-600' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            achievement.earned ? 'text-green-900' : 'text-gray-600'
                          }`}
                        >
                          {achievement.name}
                        </p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/participant/profile')}
                  >
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/participant/earnings')}
                  >
                    <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/participant/achievements')}
                  >
                    <SafeIcon icon={FiAward} className="w-4 h-4 mr-2" />
                    All Achievements
                  </Button>
                  <Button
                    variant={availabilityStatus === 'available' ? 'outline' : 'primary'}
                    size="sm"
                    className={`w-full justify-start ${
                      availabilityStatus === 'busy' ? 'bg-green-600' : ''
                    }`}
                    onClick={toggleAvailability}
                  >
                    <SafeIcon
                      icon={availabilityStatus === 'available' ? FiToggleLeft : FiToggleRight}
                      className="w-4 h-4 mr-2"
                    />
                    {availabilityStatus === 'available' ? 'Mark as Busy' : 'Mark as Available'}
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

export default ParticipantDashboard;