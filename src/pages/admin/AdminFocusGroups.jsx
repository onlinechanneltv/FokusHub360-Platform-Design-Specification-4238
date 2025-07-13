import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';

const { FiActivity, FiPlus, FiSearch, FiPlay, FiUsers, FiEye, FiEdit2, FiBarChart3 } = FiIcons;

const AdminFocusGroups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const focusGroups = [
    {
      id: 1,
      title: 'Movie Trailer Feedback - Action Thriller',
      organization: 'Universal Studios',
      status: 'active',
      participants: 45,
      targetParticipants: 50,
      responses: 42,
      createdAt: '2024-07-15',
      endsAt: '2024-07-30',
      contentType: 'video',
      reward: '$50'
    },
    {
      id: 2,
      title: 'Mobile App UI Testing',
      organization: 'TechStart Inc.',
      status: 'completed',
      participants: 25,
      targetParticipants: 25,
      responses: 25,
      createdAt: '2024-07-01',
      endsAt: '2024-07-14',
      contentType: 'design',
      reward: '$35'
    },
    {
      id: 3,
      title: 'Book Cover Design Feedback',
      organization: 'Penguin Random House',
      status: 'active',
      participants: 18,
      targetParticipants: 30,
      responses: 15,
      createdAt: '2024-07-20',
      endsAt: '2024-08-05',
      contentType: 'image',
      reward: '$25'
    },
    {
      id: 4,
      title: 'Streaming Service Logo Test',
      organization: 'Netflix',
      status: 'draft',
      participants: 0,
      targetParticipants: 100,
      responses: 0,
      createdAt: '2024-07-22',
      endsAt: '2024-08-10',
      contentType: 'image',
      reward: '$45'
    },
    {
      id: 5,
      title: 'Restaurant App Prototype',
      organization: 'FoodTech Corp',
      status: 'paused',
      participants: 12,
      targetParticipants: 40,
      responses: 8,
      createdAt: '2024-07-10',
      endsAt: '2024-07-25',
      contentType: 'prototype',
      reward: '$30'
    }
  ];

  const filteredGroups = focusGroups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'draft': return 'warning';
      case 'paused': return 'danger';
      default: return 'default';
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return FiPlay;
      case 'image': return FiEye;
      case 'design': return FiBarChart3;
      case 'prototype': return FiActivity;
      default: return FiActivity;
    }
  };

  const stats = [
    {
      label: 'Total Groups',
      value: focusGroups.length.toString(),
      icon: FiActivity,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Active Groups',
      value: focusGroups.filter(g => g.status === 'active').length.toString(),
      icon: FiPlay,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Total Participants',
      value: focusGroups.reduce((sum, g) => sum + g.participants, 0).toString(),
      icon: FiUsers,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Completed Groups',
      value: focusGroups.filter(g => g.status === 'completed').length.toString(),
      icon: FiBarChart3,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100'
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Focus Groups Management</h1>
          <p className="text-gray-600">
            Oversee all focus groups and monitor campaign status
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<SafeIcon icon={FiPlus} />}>
            Create Focus Group
          </Button>
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

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search focus groups..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            {['all', 'active', 'completed', 'draft', 'paused'].map(status => (
              <Button
                key={status}
                variant="outline"
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Focus Group
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGroups.map(group => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={getContentTypeIcon(group.contentType)} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{group.title}</div>
                        <div className="text-sm text-gray-500">{group.contentType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.organization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {group.participants}/{group.targetParticipants} participants
                    </div>
                    <div className="text-sm text-gray-500">
                      {group.responses} responses
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(group.participants / group.targetParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(group.status)}>
                      {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.reward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(group.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" icon={<SafeIcon icon={FiEye} />} />
                      <Button variant="outline" size="sm" icon={<SafeIcon icon={FiEdit2} />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiActivity} className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No focus groups found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
};

export default AdminFocusGroups;