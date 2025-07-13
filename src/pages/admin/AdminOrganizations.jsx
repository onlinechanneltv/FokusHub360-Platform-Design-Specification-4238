import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiLayers, FiPlus, FiSearch, FiBuilding, FiUsers, FiBarChart3, FiEdit2, FiMoreVertical, FiCalendar, FiTrash2, FiX, FiSave } = FiIcons;

const AdminOrganizations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(null);
  const [newOrganization, setNewOrganization] = useState({
    name: '',
    industry: '',
    plan: 'Basic',
    status: 'active'
  });

  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: 'Universal Studios',
      industry: 'Entertainment',
      users: 45,
      campaigns: 28,
      status: 'active',
      plan: 'Enterprise',
      joinedDate: '2023-01-15',
      lastActivity: '2024-07-22'
    },
    {
      id: 2,
      name: 'Netflix',
      industry: 'Streaming',
      users: 125,
      campaigns: 89,
      status: 'active',
      plan: 'Enterprise',
      joinedDate: '2022-08-20',
      lastActivity: '2024-07-21'
    },
    {
      id: 3,
      name: 'Spotify',
      industry: 'Music',
      users: 78,
      campaigns: 52,
      status: 'active',
      plan: 'Premium',
      joinedDate: '2023-03-10',
      lastActivity: '2024-07-20'
    },
    {
      id: 4,
      name: 'Airbnb',
      industry: 'Travel',
      users: 34,
      campaigns: 19,
      status: 'inactive',
      plan: 'Premium',
      joinedDate: '2023-11-05',
      lastActivity: '2024-06-15'
    },
    {
      id: 5,
      name: 'TechStart Inc.',
      industry: 'Technology',
      users: 12,
      campaigns: 8,
      status: 'trial',
      plan: 'Basic',
      joinedDate: '2024-01-20',
      lastActivity: '2024-07-19'
    }
  ]);

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = currentFilter === 'all' || org.status === currentFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddOrganization = () => {
    if (!newOrganization.name || !newOrganization.industry) {
      toast.error('Name and industry are required');
      return;
    }

    const organization = {
      id: Math.max(...organizations.map(o => o.id)) + 1,
      ...newOrganization,
      users: 0,
      campaigns: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };

    setOrganizations([...organizations, organization]);
    setNewOrganization({ name: '', industry: '', plan: 'Basic', status: 'active' });
    setShowAddModal(false);
    toast.success('Organization added successfully');
  };

  const handleEditOrganization = (org) => {
    setEditingOrganization({ ...org });
    setShowEditModal(true);
  };

  const handleUpdateOrganization = () => {
    if (!editingOrganization.name || !editingOrganization.industry) {
      toast.error('Name and industry are required');
      return;
    }

    setOrganizations(organizations.map(org => 
      org.id === editingOrganization.id ? editingOrganization : org
    ));
    setShowEditModal(false);
    setEditingOrganization(null);
    toast.success('Organization updated successfully');
  };

  const handleDeleteOrganization = (orgId) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      setOrganizations(organizations.filter(org => org.id !== orgId));
      toast.success('Organization deleted successfully');
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'trial': return 'info';
      default: return 'default';
    }
  };

  const getPlanBadgeVariant = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'primary';
      case 'Premium': return 'secondary';
      case 'Basic': return 'default';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Organization Management</h1>
          <p className="text-gray-600">
            Manage client organizations and team structures
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary" 
            icon={<SafeIcon icon={FiPlus} />}
            onClick={() => setShowAddModal(true)}
          >
            Add Organization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiBuilding} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{organizations.length}</div>
          <div className="text-gray-600 text-sm">Total Organizations</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {organizations.reduce((sum, org) => sum + org.users, 0)}
          </div>
          <div className="text-gray-600 text-sm">Total Users</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {organizations.reduce((sum, org) => sum + org.campaigns, 0)}
          </div>
          <div className="text-gray-600 text-sm">Total Campaigns</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiLayers} className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {organizations.filter(org => org.status === 'active').length}
          </div>
          <div className="text-gray-600 text-sm">Active Organizations</div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search organizations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
              onClick={() => setCurrentFilter('trial')}
              className={currentFilter === 'trial' ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
            >
              Trial
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrgs.map(org => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiBuilding} className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-500">ID: {org.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {org.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {org.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {org.campaigns}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getPlanBadgeVariant(org.plan)}>
                      {org.plan}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(org.status)}>
                      {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(org.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiEdit2} />}
                        onClick={() => handleEditOrganization(org)}
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiTrash2} />}
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteOrganization(org.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Organization Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Organization</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={newOrganization.name}
                    onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    value={newOrganization.industry}
                    onChange={(e) => setNewOrganization({ ...newOrganization, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                  <select
                    value={newOrganization.plan}
                    onChange={(e) => setNewOrganization({ ...newOrganization, plan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newOrganization.status}
                    onChange={(e) => setNewOrganization({ ...newOrganization, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="trial">Trial</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddOrganization}
                  icon={<SafeIcon icon={FiSave} />}
                >
                  Add Organization
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Organization Modal */}
      {showEditModal && editingOrganization && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Organization</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={editingOrganization.name}
                    onChange={(e) => setEditingOrganization({ ...editingOrganization, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    value={editingOrganization.industry}
                    onChange={(e) => setEditingOrganization({ ...editingOrganization, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                  <select
                    value={editingOrganization.plan}
                    onChange={(e) => setEditingOrganization({ ...editingOrganization, plan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingOrganization.status}
                    onChange={(e) => setEditingOrganization({ ...editingOrganization, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="trial">Trial</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdateOrganization}
                  icon={<SafeIcon icon={FiSave} />}
                >
                  Update Organization
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrganizations;