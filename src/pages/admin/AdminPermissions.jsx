import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiLock, FiUsers, FiShield, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiSave, FiSearch, FiSettings } = FiIcons;

const AdminPermissions = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: ['all'],
      system: true,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access to most features',
      userCount: 5,
      permissions: ['users.read', 'users.write', 'organizations.read', 'organizations.write', 'campaigns.read', 'campaigns.write', 'reports.read'],
      system: true,
      createdAt: '2024-01-01'
    },
    {
      id: 3,
      name: 'Manager',
      description: 'Team and campaign management access',
      userCount: 12,
      permissions: ['users.read', 'organizations.read', 'campaigns.read', 'campaigns.write', 'reports.read'],
      system: true,
      createdAt: '2024-01-01'
    },
    {
      id: 4,
      name: 'Client',
      description: 'Client access to create and manage focus groups',
      userCount: 45,
      permissions: ['campaigns.read', 'campaigns.write', 'reports.read', 'participants.read'],
      system: true,
      createdAt: '2024-01-01'
    },
    {
      id: 5,
      name: 'Participant',
      description: 'Participant access to join focus groups',
      userCount: 2847,
      permissions: ['campaigns.participate', 'profile.read', 'profile.write'],
      system: true,
      createdAt: '2024-01-01'
    },
    {
      id: 6,
      name: 'Research Analyst',
      description: 'Custom role for research team members',
      userCount: 8,
      permissions: ['campaigns.read', 'reports.read', 'reports.write', 'analytics.read'],
      system: false,
      createdAt: '2024-03-15'
    }
  ]);

  const permissions = [
    {
      category: 'Users',
      permissions: [
        { id: 'users.read', name: 'View Users', description: 'View user profiles and information' },
        { id: 'users.write', name: 'Manage Users', description: 'Create, edit, and delete users' },
        { id: 'users.admin', name: 'User Administration', description: 'Advanced user management and permissions' }
      ]
    },
    {
      category: 'Organizations',
      permissions: [
        { id: 'organizations.read', name: 'View Organizations', description: 'View organization details' },
        { id: 'organizations.write', name: 'Manage Organizations', description: 'Create, edit, and delete organizations' },
        { id: 'organizations.admin', name: 'Organization Administration', description: 'Advanced organization settings' }
      ]
    },
    {
      category: 'Campaigns',
      permissions: [
        { id: 'campaigns.read', name: 'View Campaigns', description: 'View focus group campaigns' },
        { id: 'campaigns.write', name: 'Manage Campaigns', description: 'Create, edit, and delete campaigns' },
        { id: 'campaigns.participate', name: 'Participate in Campaigns', description: 'Join and respond to focus groups' },
        { id: 'campaigns.admin', name: 'Campaign Administration', description: 'Advanced campaign settings and controls' }
      ]
    },
    {
      category: 'Reports',
      permissions: [
        { id: 'reports.read', name: 'View Reports', description: 'View generated reports and analytics' },
        { id: 'reports.write', name: 'Manage Reports', description: 'Create and edit custom reports' },
        { id: 'reports.export', name: 'Export Reports', description: 'Export reports in various formats' }
      ]
    },
    {
      category: 'Analytics',
      permissions: [
        { id: 'analytics.read', name: 'View Analytics', description: 'Access to platform analytics and insights' },
        { id: 'analytics.advanced', name: 'Advanced Analytics', description: 'Access to detailed analytics and metrics' }
      ]
    },
    {
      category: 'System',
      permissions: [
        { id: 'system.settings', name: 'System Settings', description: 'Manage global system settings' },
        { id: 'system.integrations', name: 'Integrations', description: 'Manage third-party integrations' },
        { id: 'system.api', name: 'API Management', description: 'Manage API keys and access' },
        { id: 'system.audit', name: 'Audit Logs', description: 'View system audit logs and security events' }
      ]
    }
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      toast.error('Name and description are required');
      return;
    }

    const role = {
      id: Math.max(...roles.map(r => r.id)) + 1,
      ...newRole,
      userCount: 0,
      system: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateRoleModal(false);
    toast.success('Role created successfully');
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role });
    setShowEditRoleModal(true);
  };

  const handleUpdateRole = () => {
    if (!editingRole.name || !editingRole.description) {
      toast.error('Name and description are required');
      return;
    }

    setRoles(roles.map(role =>
      role.id === editingRole.id ? editingRole : role
    ));
    setShowEditRoleModal(false);
    setEditingRole(null);
    toast.success('Role updated successfully');
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.system) {
      toast.error('Cannot delete system roles');
      return;
    }

    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
      toast.success('Role deleted successfully');
    }
  };

  const handlePermissionToggle = (permissionId, isChecked, targetRole) => {
    if (isChecked) {
      targetRole.permissions = [...targetRole.permissions, permissionId];
    } else {
      targetRole.permissions = targetRole.permissions.filter(p => p !== permissionId);
    }
  };

  const renderRolesTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiShield} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{roles.length}</div>
          <div className="text-gray-600 text-sm">Total Roles</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {roles.reduce((sum, role) => sum + role.userCount, 0).toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm">Total Users</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiLock} className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {roles.filter(r => !r.system).length}
          </div>
          <div className="text-gray-600 text-sm">Custom Roles</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheck} className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {permissions.reduce((sum, cat) => sum + cat.permissions.length, 0)}
          </div>
          <div className="text-gray-600 text-sm">Total Permissions</div>
        </Card>
      </div>

      {/* Search and Create */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search roles..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={() => setShowCreateRoleModal(true)}
          >
            Create Role
          </Button>
        </div>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    {role.system && (
                      <Badge variant="info" size="sm">System</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{role.userCount} users</span>
                    <span>{role.permissions.length} permissions</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions:</h4>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map(permission => (
                    <Badge key={permission} variant="default" size="sm">
                      {permission.replace('.', ' ')}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="default" size="sm">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Created: {new Date(role.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiEdit2} />}
                    onClick={() => handleEditRole(role)}
                    disabled={role.system}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiTrash2} />}
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteRole(role.id)}
                    disabled={role.system}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Permission Categories</h2>
        <p className="text-gray-600 mb-6">
          These are the available permissions that can be assigned to roles. System permissions are managed automatically.
        </p>

        <div className="space-y-6">
          {permissions.map(category => (
            <div key={category.category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.permissions.map(permission => (
                  <div key={permission.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{permission.name}</h4>
                      <Badge variant="default" size="sm">{permission.id}</Badge>
                    </div>
                    <p className="text-xs text-gray-600">{permission.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Permission Management</h1>
          <p className="text-gray-600">
            Configure role-based access control, custom permissions, and security policies
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Roles ({roles.length})
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Permissions ({permissions.reduce((sum, cat) => sum + cat.permissions.length, 0)})
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'roles' && renderRolesTab()}
      {activeTab === 'permissions' && renderPermissionsTab()}

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Role</h3>
                <button
                  onClick={() => setShowCreateRoleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                    placeholder="Describe the role"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                    {permissions.map(category => (
                      <div key={category.category} className="mb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{category.category}</h4>
                        {category.permissions.map(permission => (
                          <label key={permission.id} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={newRole.permissions.includes(permission.id)}
                              onChange={(e) => handlePermissionToggle(permission.id, e.target.checked, newRole)}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateRoleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateRole}
                  icon={<SafeIcon icon={FiSave} />}
                >
                  Create Role
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && editingRole && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Role</h3>
                <button
                  onClick={() => setShowEditRoleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={editingRole.system}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                    disabled={editingRole.system}
                  />
                </div>
                {!editingRole.system && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                    <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                      {permissions.map(category => (
                        <div key={category.category} className="mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">{category.category}</h4>
                          {category.permissions.map(permission => (
                            <label key={permission.id} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                checked={editingRole.permissions.includes(permission.id)}
                                onChange={(e) => handlePermissionToggle(permission.id, e.target.checked, editingRole)}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditRoleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdateRole}
                  icon={<SafeIcon icon={FiSave} />}
                  disabled={editingRole.system}
                >
                  Update Role
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPermissions;