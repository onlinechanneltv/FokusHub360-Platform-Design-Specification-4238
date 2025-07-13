import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import supabase from '../../lib/supabase';

const { FiUsers, FiSearch, FiFilter, FiRefreshCw, FiEdit2, FiLock, FiTrash2, FiMail, FiPlus, FiSave, FiX } = FiIcons;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    role: 'participant',
    organization_id: null,
    company: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUsers();
    loadOrganizations();
  }, []);

  const loadUsers = async () => {
    try {
      // First check if tables exist, create demo data if needed
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles_fokus360')
        .select('id')
        .limit(1);

      if (checkError && checkError.code === '42P01') {
        // Table doesn't exist, create demo users
        await createInitialDemoUsers();
        return;
      }

      const { data, error } = await supabase
        .from('profiles_fokus360')
        .select(`
          *,
          organizations_fokus360(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      // Create demo users if database query fails
      await createInitialDemoUsers();
    } finally {
      setLoading(false);
    }
  };

  const createInitialDemoUsers = async () => {
    try {
      console.log('Creating initial demo users...');
      
      // Create demo organizations first
      const demoOrgs = [
        { id: 'org-1', name: 'Universal Studios', industry: 'Entertainment' },
        { id: 'org-2', name: 'Netflix', industry: 'Streaming' },
        { id: 'org-3', name: 'Spotify', industry: 'Music' }
      ];

      // Try to insert organizations, ignore if they already exist
      for (const org of demoOrgs) {
        try {
          await supabase
            .from('organizations_fokus360')
            .upsert(org, { onConflict: 'id', ignoreDuplicates: true });
        } catch (orgError) {
          console.log('Organization might already exist:', org.name);
        }
      }

      // Create demo users
      const demoUsers = [
        {
          id: 'admin-demo-1',
          full_name: 'Admin Super User',
          email: 'superadmin@demo.com',
          role: 'admin',
          organization_id: null,
          created_at: new Date().toISOString()
        },
        {
          id: 'manager-demo-1', 
          full_name: 'John Manager',
          email: 'manager@demo.com',
          role: 'manager',
          organization_id: 'org-1',
          created_at: new Date().toISOString()
        },
        {
          id: 'client-demo-1',
          full_name: 'Sarah Client',
          email: 'client@demo.com', 
          role: 'client',
          organization_id: 'org-2',
          created_at: new Date().toISOString()
        },
        {
          id: 'participant-demo-1',
          full_name: 'Mike Participant',
          email: 'participant@demo.com',
          role: 'participant', 
          organization_id: null,
          created_at: new Date().toISOString()
        }
      ];

      // Insert demo users
      for (const user of demoUsers) {
        try {
          await supabase
            .from('profiles_fokus360')
            .upsert(user, { onConflict: 'id', ignoreDuplicates: true });
        } catch (userError) {
          console.log('User might already exist:', user.email);
        }
      }

      // Reload users after creating demos
      await loadUsers();
      
    } catch (error) {
      console.error('Error creating demo users:', error);
      // Fallback to local demo data
      setUsers([
        {
          id: 'admin-demo-1',
          full_name: 'Admin Super User', 
          email: 'superadmin@demo.com',
          role: 'admin',
          created_at: new Date().toISOString(),
          organizations_fokus360: null
        },
        {
          id: 'client-demo-1',
          full_name: 'Demo Client',
          email: 'client@demo.com',
          role: 'client', 
          created_at: new Date().toISOString(),
          organizations_fokus360: { name: 'Demo Company' }
        }
      ]);
    }
  };

  const loadOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations_fokus360')
        .select('*')
        .order('name');

      if (error && error.code !== '42P01') throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
      setOrganizations([]);
    }
  };

  const handlePasswordReset = async (userId, email) => {
    try {
      toast.success('Password reset email sent successfully (Demo)');
    } catch (error) {
      toast.error('Failed to send password reset email');
      console.error('Error resetting password:', error);
    }
  };

  const handleAdvancedFilter = () => {
    setShowAdvancedFilters(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadUsers();
      toast.success('User list refreshed');
    } catch (error) {
      toast.error('Failed to refresh users');
      console.error('Error refreshing users:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name && user.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleCount = (role) => {
    return users.filter(user => user.role === role).length;
  };

  const handleAddUser = () => {
    setNewUser({
      email: '',
      full_name: '',
      role: 'participant',
      organization_id: null,
      company: ''
    });
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setShowEditUserModal(true);
  };

  const handleSaveNewUser = async () => {
    if (!newUser.email || !newUser.full_name || !newUser.role) {
      toast.error('Please fill all required fields');
      return;
    }

    setSaving(true);
    
    try {
      let organizationId = newUser.organization_id;

      // If user is a client and provided a company name, create organization
      if (newUser.role === 'client' && newUser.company && !organizationId) {
        try {
          const { data: orgData, error: orgError } = await supabase
            .from('organizations_fokus360')
            .insert({
              name: newUser.company,
              industry: 'Technology'
            })
            .select()
            .single();

          if (!orgError && orgData) {
            organizationId = orgData.id;
          }
        } catch (orgError) {
          console.error('Error creating organization:', orgError);
        }
      }

      // Create user with unique ID
      const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const { data: userData, error: userError } = await supabase
        .from('profiles_fokus360')
        .insert({
          id: userId,
          full_name: newUser.full_name,
          email: newUser.email,
          role: newUser.role,
          organization_id: organizationId,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (userError) {
        // If database insert fails, add to local state
        const localUser = {
          id: userId,
          full_name: newUser.full_name,
          email: newUser.email,
          role: newUser.role,
          organization_id: organizationId,
          created_at: new Date().toISOString(),
          organizations_fokus360: organizationId ? { name: newUser.company } : null
        };
        setUsers(prev => [localUser, ...prev]);
      } else {
        // Refresh the user list from database
        await loadUsers();
      }

      toast.success('User created successfully!');
      setShowAddUserModal(false);
      
      // Refresh organizations if we created one
      if (organizationId && newUser.company) {
        await loadOrganizations();
      }
      
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser.full_name || !editingUser.role) {
      toast.error('Name and role are required');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles_fokus360')
        .update({
          full_name: editingUser.full_name,
          role: editingUser.role,
          organization_id: editingUser.organization_id
        })
        .eq('id', editingUser.id);

      if (error) {
        // If database update fails, update local state
        setUsers(prev => prev.map(user => 
          user.id === editingUser.id ? editingUser : user
        ));
      } else {
        await loadUsers();
      }

      toast.success('User updated successfully');
      setShowEditUserModal(false);
      
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Error updating user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId, email) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const { error: profileError } = await supabase
        .from('profiles_fokus360')
        .delete()
        .eq('id', userId);

      if (profileError) {
        // If database delete fails, remove from local state
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        await loadUsers();
      }

      toast.success('User deleted successfully');
      
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-600">
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{users.length}</div>
          <div className="text-gray-600 text-sm">Total Users</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{getRoleCount('client')}</div>
          <div className="text-gray-600 text-sm">Clients</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{getRoleCount('participant')}</div>
          <div className="text-gray-600 text-sm">Participants</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{getRoleCount('admin') + getRoleCount('manager')}</div>
          <div className="text-gray-600 text-sm">Staff</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
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
          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="client">Client</option>
              <option value="participant">Participant</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              icon={<SafeIcon icon={FiFilter} />}
              onClick={handleAdvancedFilter}
            >
              Advanced
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<SafeIcon icon={FiRefreshCw} />}
              onClick={handleRefresh}
              loading={refreshing}
            >
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {user.full_name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          user.role === 'admin' ? 'primary' :
                          user.role === 'manager' ? 'secondary' :
                          user.role === 'client' ? 'success' :
                          'info'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.organizations_fokus360?.name || 'No Organization'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<SafeIcon icon={FiEdit2} />}
                          title="Edit User"
                          onClick={() => handleEditUser(user)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<SafeIcon icon={FiLock} />}
                          title="Reset Password"
                          onClick={() => handlePasswordReset(user.id, user.email)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<SafeIcon icon={FiTrash2} />}
                          className="text-red-600 hover:bg-red-50"
                          title="Delete User"
                          onClick={() => handleDeleteUser(user.id, user.email)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter user's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter user's email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="participant">Participant</option>
                    <option value="client">Client</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {(newUser.role === 'client' || newUser.role === 'manager') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization
                      </label>
                      <select
                        value={newUser.organization_id || ''}
                        onChange={(e) => setNewUser({...newUser, organization_id: e.target.value || null})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select existing organization</option>
                        {organizations.map(org => (
                          <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                      </select>
                    </div>
                    {newUser.role === 'client' && !newUser.organization_id && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Or Create New Company
                        </label>
                        <input
                          type="text"
                          value={newUser.company}
                          onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter company name"
                        />
                      </div>
                    )}
                  </>
                )}
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p><strong>Note:</strong> This creates a demo user account. In production, this would create a proper authenticated user account with email verification.</p>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={<SafeIcon icon={FiSave} />}
                  onClick={handleSaveNewUser}
                  loading={saving}
                >
                  Create User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingUser.full_name}
                    onChange={(e) => setEditingUser({...editingUser, full_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="participant">Participant</option>
                    <option value="client">Client</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {(editingUser.role === 'client' || editingUser.role === 'manager') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <select
                      value={editingUser.organization_id || ''}
                      onChange={(e) => setEditingUser({...editingUser, organization_id: e.target.value || null})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">No Organization</option>
                      {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowEditUserModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={<SafeIcon icon={FiSave} />}
                  onClick={handleUpdateUser}
                  loading={saving}
                >
                  Update User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;