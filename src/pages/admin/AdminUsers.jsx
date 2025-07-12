import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';

const { FiUsers, FiPlus, FiSearch, FiSliders, FiFilter, FiRefreshCw, FiDownload, FiTrash2, FiEdit2, FiMoreVertical, FiMail, FiPhone, FiCheck } = FiIcons;

const AdminUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'client',
      company: 'Acme Inc.',
      status: 'active',
      verified: true,
      joinedDate: '2023-09-15',
      lastLogin: '2024-07-22'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'participant',
      company: '',
      status: 'active',
      verified: true,
      joinedDate: '2023-10-05',
      lastLogin: '2024-07-21'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'client',
      company: 'XYZ Corp',
      status: 'active',
      verified: true,
      joinedDate: '2023-11-12',
      lastLogin: '2024-07-20'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'participant',
      company: '',
      status: 'inactive',
      verified: true,
      joinedDate: '2023-12-08',
      lastLogin: '2024-06-15'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'manager',
      company: 'ABC Solutions',
      status: 'active',
      verified: true,
      joinedDate: '2024-01-20',
      lastLogin: '2024-07-22'
    },
    {
      id: 6,
      name: 'Sarah Thompson',
      email: 'sarah.thompson@example.com',
      role: 'participant',
      company: '',
      status: 'pending',
      verified: false,
      joinedDate: '2024-02-10',
      lastLogin: null
    },
    {
      id: 7,
      name: 'David Miller',
      email: 'david.miller@example.com',
      role: 'client',
      company: 'Global Enterprises',
      status: 'active',
      verified: true,
      joinedDate: '2024-03-05',
      lastLogin: '2024-07-19'
    },
    {
      id: 8,
      name: 'Olivia Brown',
      email: 'olivia.brown@example.com',
      role: 'participant',
      company: '',
      status: 'banned',
      verified: true,
      joinedDate: '2024-04-15',
      lastLogin: '2024-05-10'
    }
  ];
  
  const filteredUsers = users.filter(user => {
    // Filter by search query
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status
    const matchesFilter = 
      currentFilter === 'all' || 
      user.status === currentFilter ||
      (currentFilter === 'verified' && user.verified) ||
      (currentFilter === 'unverified' && !user.verified);
      
    return matchesSearch && matchesFilter;
  });
  
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'manager': return 'secondary';
      case 'client': return 'info';
      case 'participant': return 'success';
      default: return 'default';
    }
  };
  
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'pending': return 'info';
      case 'banned': return 'danger';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-600">
            Manage all users across the platform
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<SafeIcon icon={FiPlus} />}>
            Add New User
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentFilter('all')}
                className={currentFilter === 'all' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentFilter('active')}
                className={currentFilter === 'active' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                Active
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentFilter('inactive')}
                className={currentFilter === 'inactive' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                Inactive
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentFilter('pending')}
                className={currentFilter === 'pending' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                Pending
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentFilter('banned')}
                className={currentFilter === 'banned' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
              >
                Banned
              </Button>
            </div>
            
            <Button variant="outline" size="sm" icon={<SafeIcon icon={FiSliders} />}>
              Advanced
            </Button>
            
            <Button variant="outline" size="sm" icon={<SafeIcon icon={FiRefreshCw} />}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Users Table */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
              onChange={handleSelectAll}
            />
            <span className="ml-2 text-sm text-gray-700">
              {selectedUsers.length > 0 ? `${selectedUsers.length} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" icon={<SafeIcon icon={FiMail} />}>
                Email
              </Button>
              <Button variant="danger" size="sm" icon={<SafeIcon icon={FiTrash2} />}>
                Delete
              </Button>
            </div>
          )}
          
          {selectedUsers.length === 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" icon={<SafeIcon icon={FiDownload} />}>
                Export
              </Button>
              <Button variant="outline" size="sm" icon={<SafeIcon icon={FiFilter} />}>
                Filter
              </Button>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.company && (
                          <div className="text-xs text-gray-500">{user.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                      {user.verified && (
                        <span className="flex items-center text-xs text-green-600">
                          <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" icon={<SafeIcon icon={FiEdit2} />} />
                      <Button variant="outline" size="sm" icon={<SafeIcon icon={FiMoreVertical} />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiUsers} className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> users
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminUsers;