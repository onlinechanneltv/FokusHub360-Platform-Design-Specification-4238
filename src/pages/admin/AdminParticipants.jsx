import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { 
  FiUsers, FiSearch, FiFilter, FiUserCheck, FiUserX, 
  FiToggleLeft, FiToggleRight, FiStar, FiClock, FiAlertTriangle, 
  FiMail, FiDollarSign, FiRefreshCw, FiEye 
} = FiIcons;

const AdminParticipants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWarnings, setFilterWarnings] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock participant data
  const participants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      status: 'available',
      rating: 4.8,
      completedGroups: 24,
      earnings: 1250,
      joinedDate: '2023-10-15',
      lastActive: '2024-07-20T14:30:00Z',
      warnings: 0,
      averageResponseTime: '1.2h'
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      status: 'busy',
      rating: 4.9,
      completedGroups: 42,
      earnings: 2150,
      joinedDate: '2023-08-22',
      lastActive: '2024-07-21T09:15:00Z',
      warnings: 0,
      averageResponseTime: '0.8h'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      status: 'available',
      rating: 4.6,
      completedGroups: 18,
      earnings: 850,
      joinedDate: '2023-12-05',
      lastActive: '2024-07-18T16:45:00Z',
      warnings: 1,
      averageResponseTime: '2.5h'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      status: 'available',
      rating: 4.2,
      completedGroups: 12,
      earnings: 620,
      joinedDate: '2024-02-10',
      lastActive: '2024-07-15T11:20:00Z',
      warnings: 2,
      averageResponseTime: '3.1h'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      email: 'jessica.martinez@example.com',
      status: 'busy',
      rating: 4.7,
      completedGroups: 31,
      earnings: 1580,
      joinedDate: '2023-09-18',
      lastActive: '2024-07-19T13:40:00Z',
      warnings: 0,
      averageResponseTime: '1.5h'
    },
    {
      id: 6,
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      status: 'banned',
      rating: 3.2,
      completedGroups: 5,
      earnings: 220,
      joinedDate: '2024-01-25',
      lastActive: '2024-06-30T08:50:00Z',
      warnings: 3,
      averageResponseTime: '5.2h'
    }
  ];

  // Filter participants based on search query and filters
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus;
    
    const matchesWarnings = 
      filterWarnings === 'all' || 
      (filterWarnings === 'with' && participant.warnings > 0) ||
      (filterWarnings === 'without' && participant.warnings === 0);
    
    return matchesSearch && matchesStatus && matchesWarnings;
  });

  const refreshData = () => {
    setLoading(true);
    // In a real app, this would fetch fresh data
    setTimeout(() => {
      setLoading(false);
      toast.success('Participant data refreshed');
    }, 1000);
  };

  const toggleParticipantStatus = (id, currentStatus) => {
    // In a real app, this would update the database
    const newStatus = currentStatus === 'available' ? 'busy' : 'available';
    
    // Update local state (mock)
    const updatedParticipants = participants.map(p => 
      p.id === id ? {...p, status: newStatus} : p
    );
    
    toast.success(`Participant status updated to ${newStatus}`);
  };

  const sendWarning = (id) => {
    // In a real app, this would send a warning and update the database
    toast.success('Warning sent to participant');
  };

  const banParticipant = (id) => {
    if (window.confirm('Are you sure you want to ban this participant?')) {
      // In a real app, this would update the database
      toast.success('Participant has been banned');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge variant="success">Available</Badge>;
      case 'busy':
        return <Badge variant="warning">Busy</Badge>;
      case 'banned':
        return <Badge variant="danger">Banned</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Participant Management</h1>
          <p className="text-gray-600">
            Monitor participant status, activity, and manage warnings
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<SafeIcon icon={FiRefreshCw} />} 
            onClick={refreshData}
            loading={loading}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<SafeIcon icon={FiMail} />}
          >
            Message All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{participants.length}</div>
          <div className="text-gray-600 text-sm">Total Participants</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUserCheck} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {participants.filter(p => p.status === 'available').length}
          </div>
          <div className="text-gray-600 text-sm">Available</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiAlertTriangle} className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {participants.filter(p => p.warnings > 0).length}
          </div>
          <div className="text-gray-600 text-sm">With Warnings</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUserX} className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {participants.filter(p => p.status === 'banned').length}
          </div>
          <div className="text-gray-600 text-sm">Banned</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search participants..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="banned">Banned</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={filterWarnings}
              onChange={(e) => setFilterWarnings(e.target.value)}
            >
              <option value="all">All Warnings</option>
              <option value="with">With Warnings</option>
              <option value="without">No Warnings</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Participants Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Groups
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warnings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No participants found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                          <div className="text-sm text-gray-500">{participant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(participant.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-bold ${getRatingColor(participant.rating)}`}>
                        {participant.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon 
                            key={i} 
                            icon={FiStar} 
                            className={`w-3 h-3 ${i < Math.round(participant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{participant.completedGroups} completed</div>
                      <div className="text-sm text-green-600">${participant.earnings}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${participant.warnings > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                        {participant.warnings > 0 ? `${participant.warnings} warning${participant.warnings !== 1 ? 's' : ''}` : 'None'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        <span>{participant.averageResponseTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          icon={<SafeIcon icon={FiEye} />}
                          title="View Profile"
                        />
                        {participant.status !== 'banned' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              icon={<SafeIcon icon={participant.status === 'available' ? FiToggleRight : FiToggleLeft} />}
                              title={`Mark as ${participant.status === 'available' ? 'Busy' : 'Available'}`}
                              onClick={() => toggleParticipantStatus(participant.id, participant.status)}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              icon={<SafeIcon icon={FiAlertTriangle} />}
                              className="text-orange-600 hover:bg-orange-50"
                              title="Send Warning"
                              onClick={() => sendWarning(participant.id)}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              icon={<SafeIcon icon={FiUserX} />}
                              className="text-red-600 hover:bg-red-50"
                              title="Ban Participant"
                              onClick={() => banParticipant(participant.id)}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminParticipants;