import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';

const { FiKey, FiPlus, FiCopy, FiEye, FiEyeOff, FiRefreshCw, FiTrash2, FiEdit2, FiAlertTriangle, FiCheck, FiInfo, FiClipboard, FiLock } = FiIcons;

const AdminApiKeys = () => {
  const [showSecret, setShowSecret] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  
  // Mock API keys data
  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'fh360_prod_12345678901234567890',
      secret: '••••••••••••••••••••••••••••••••',
      fullSecret: 'sk_live_abcdefghijklmnopqrstuvwxyz1234567890',
      createdAt: '2024-03-15',
      expiresAt: '2025-03-15',
      status: 'active',
      permissions: ['read:users', 'write:users', 'read:focus_groups', 'write:focus_groups', 'read:reports', 'write:reports'],
      lastUsed: '2024-07-22'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'fh360_dev_09876543210987654321',
      secret: '••••••••••••••••••••••••••••••••',
      fullSecret: 'sk_test_zyxwvutsrqponmlkjihgfedcba0987654321',
      createdAt: '2024-04-20',
      expiresAt: '2025-04-20',
      status: 'active',
      permissions: ['read:users', 'write:users', 'read:focus_groups', 'write:focus_groups', 'read:reports', 'write:reports'],
      lastUsed: '2024-07-21'
    },
    {
      id: 3,
      name: 'Analytics API Key',
      key: 'fh360_analytics_13579246801357924680',
      secret: '••••••••••••••••••••••••••••••••',
      fullSecret: 'sk_analytics_abcdefghijklmnopqrstuvwxyz1234567890',
      createdAt: '2024-05-10',
      expiresAt: '2025-05-10',
      status: 'active',
      permissions: ['read:users', 'read:focus_groups', 'read:reports'],
      lastUsed: '2024-07-20'
    },
    {
      id: 4,
      name: 'Integration API Key',
      key: 'fh360_int_24680135792468013579',
      secret: '••••••••••••••••••••••••••••••••',
      fullSecret: 'sk_int_zyxwvutsrqponmlkjihgfedcba0987654321',
      createdAt: '2024-05-25',
      expiresAt: null,
      status: 'revoked',
      permissions: ['read:users', 'read:focus_groups', 'write:focus_groups'],
      lastUsed: '2024-06-15'
    },
    {
      id: 5,
      name: 'Admin API Key',
      key: 'fh360_admin_11223344556677889900',
      secret: '••••••••••••••••••••••••••••••••',
      fullSecret: 'sk_admin_abcdefghijklmnopqrstuvwxyz1234567890',
      createdAt: '2024-06-05',
      expiresAt: '2024-12-05',
      status: 'expiring',
      permissions: ['read:users', 'write:users', 'read:focus_groups', 'write:focus_groups', 'read:reports', 'write:reports', 'read:admin', 'write:admin'],
      lastUsed: '2024-07-19'
    }
  ];
  
  const toggleShowSecret = (id) => {
    setShowSecret(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const copyToClipboard = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(`${id}-${type}`);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };
  
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'expiring': return 'warning';
      case 'revoked': return 'danger';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">API Key Management</h1>
          <p className="text-gray-600">
            Create and manage API keys for third-party integrations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<SafeIcon icon={FiPlus} />}>
            Generate New API Key
          </Button>
        </div>
      </div>

      <Card className="mb-6 p-4 bg-blue-50 border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <SafeIcon icon={FiInfo} className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Security Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>API keys provide full access to your account. Keep them secure and never share them in publicly accessible areas such as GitHub or client-side code.</p>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                View API Documentation
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* API Keys */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your API Keys</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Secret
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map(apiKey => (
                <tr key={apiKey.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <SafeIcon icon={FiKey} className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
                        <div className="text-xs text-gray-500">
                          {apiKey.permissions.length} permissions
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <code className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded">{apiKey.key}</code>
                      <button 
                        onClick={() => copyToClipboard(apiKey.key, apiKey.id, 'key')}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <SafeIcon 
                          icon={copiedKey === `${apiKey.id}-key` ? FiCheck : FiCopy} 
                          className={`h-4 w-4 ${copiedKey === `${apiKey.id}-key` ? 'text-green-500' : ''}`} 
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <code className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded">
                        {showSecret[apiKey.id] ? apiKey.fullSecret : apiKey.secret}
                      </code>
                      <button 
                        onClick={() => toggleShowSecret(apiKey.id)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <SafeIcon 
                          icon={showSecret[apiKey.id] ? FiEyeOff : FiEye} 
                          className="h-4 w-4" 
                        />
                      </button>
                      {showSecret[apiKey.id] && (
                        <button 
                          onClick={() => copyToClipboard(apiKey.fullSecret, apiKey.id, 'secret')}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <SafeIcon 
                            icon={copiedKey === `${apiKey.id}-secret` ? FiCheck : FiCopy} 
                            className={`h-4 w-4 ${copiedKey === `${apiKey.id}-secret` ? 'text-green-500' : ''}`} 
                          />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(apiKey.status)}>
                      {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                    </Badge>
                    {apiKey.status === 'expiring' && (
                      <div className="text-xs text-orange-600 mt-1">
                        Expires in {Math.floor((new Date(apiKey.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(apiKey.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiRefreshCw} />} 
                        disabled={apiKey.status === 'revoked'}
                        title="Rotate Key"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiEdit2} />} 
                        disabled={apiKey.status === 'revoked'}
                        title="Edit Key"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiTrash2} />} 
                        className="text-red-600 hover:bg-red-50"
                        title="Revoke Key"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Key Permissions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Define what actions API keys can perform by assigning specific permissions.
          </p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Users</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">read:users</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">write:users</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Focus Groups</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">read:focus_groups</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">write:focus_groups</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Reports</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">read:reports</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">write:reports</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent API Activity</h2>
          <p className="text-sm text-gray-600 mb-4">
            Monitor recent API calls and their status.
          </p>
          
          <div className="space-y-4">
            {[
              { time: '5 minutes ago', key: 'fh360_prod_123...', method: 'GET', endpoint: '/api/users', status: 200 },
              { time: '10 minutes ago', key: 'fh360_prod_123...', method: 'POST', endpoint: '/api/focus-groups', status: 201 },
              { time: '15 minutes ago', key: 'fh360_dev_098...', method: 'GET', endpoint: '/api/reports/analytics', status: 200 },
              { time: '30 minutes ago', key: 'fh360_dev_098...', method: 'PUT', endpoint: '/api/users/profile', status: 400 },
              { time: '1 hour ago', key: 'fh360_analytics_135...', method: 'GET', endpoint: '/api/reports/summary', status: 200 }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.status >= 200 && activity.status < 300 
                    ? 'bg-green-500' 
                    : activity.status >= 400 
                      ? 'bg-red-500' 
                      : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.method === 'GET' 
                          ? 'bg-blue-100 text-blue-800' 
                          : activity.method === 'POST' 
                            ? 'bg-green-100 text-green-800'
                            : activity.method === 'PUT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}>{activity.method}</span>
                      <span className="ml-2">{activity.endpoint}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-600">{activity.key}</p>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-800">
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminApiKeys;