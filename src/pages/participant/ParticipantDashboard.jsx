import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useAuthStore from '../../store/authStore';

const { 
  FiStar, FiDollarSign, FiClock, FiTrendingUp, FiAward,
  FiTarget, FiUsers, FiPlay, FiCheckCircle
} = FiIcons;

const ParticipantDashboard = () => {
  const { user } = useAuthStore();

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

  const availableGroups = [
    {
      id: '1',
      title: 'Movie Trailer Feedback - Action Thriller',
      client: 'Universal Studios',
      reward: '$50',
      duration: '15-20 minutes',
      deadline: '2 days',
      type: 'video',
      matchScore: 95
    },
    {
      id: '2',
      title: 'Mobile App UI Testing',
      client: 'TechStart Inc.',
      reward: '$35',
      duration: '10-15 minutes',
      deadline: '3 days',
      type: 'design',
      matchScore: 88
    },
    {
      id: '3',
      title: 'Book Cover Design Feedback',
      client: 'Penguin Random House',
      reward: 'Book + $25',
      duration: '5-10 minutes',
      deadline: '5 days',
      type: 'image',
      matchScore: 92
    }
  ];

  const recentCompletions = [
    { title: 'Streaming Service Logo Test', reward: '$45', completedAt: '2 days ago', rating: 5 },
    { title: 'Restaurant App Prototype', reward: '$30', completedAt: '1 week ago', rating: 5 },
    { title: 'Fashion Brand Campaign', reward: '$60', completedAt: '2 weeks ago', rating: 4 },
  ];

  const achievements = [
    { name: 'Quick Responder', description: 'Complete 10 groups within 24h', icon: FiClock, earned: true },
    { name: 'Quality Contributor', description: 'Maintain 4.5+ rating', icon: FiStar, earned: true },
    { name: 'Media Expert', description: 'Complete 50 media reviews', icon: FiPlay, earned: false },
    { name: 'Top Performer', description: 'Earn $1000+ in rewards', icon: FiTrendingUp, earned: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Available Focus Groups */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Focus Groups</h2>
                <Badge variant="primary">{availableGroups.length} matches</Badge>
              </div>

              <div className="space-y-4">
                {availableGroups.map((group) => (
                  <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
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
                        <div className="text-lg font-semibold text-green-600 mb-1">{group.reward}</div>
                        <Badge variant="success" size="sm">{group.matchScore}% match</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="primary" size="sm">{group.type}</Badge>
                      <Button variant="primary" size="sm">
                        <Link to={`/participant/groups/${group.id}`}>Join Group</Link>
                      </Button>
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
                          <SafeIcon key={i} icon={FiStar} className="w-3 h-3 text-yellow-400 fill-current" />
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
                  <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${achievement.earned ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${achievement.earned ? 'bg-green-100' : 'bg-gray-200'}`}>
                      <SafeIcon icon={achievement.icon} className={`w-4 h-4 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
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
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                  <Link to="/participant/profile">Update Profile</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
                  <Link to="/participant/earnings">View Earnings</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <SafeIcon icon={FiAward} className="w-4 h-4 mr-2" />
                  <Link to="/participant/achievements">All Achievements</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;