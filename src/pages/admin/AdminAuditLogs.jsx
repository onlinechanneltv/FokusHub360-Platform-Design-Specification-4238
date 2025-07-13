import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';

const { FiClock, FiSearch, FiFilter, FiDownload, FiRefreshCw, FiUser, FiServer, FiShield, FiDatabase } = FiIcons;

const AdminAuditLogs = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [exportingLogs, setExportingLogs] = useState(false);
  
  // Mock data for audit logs
  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-07-22T10:30:00Z',
      user: 'admin@demo.com',
      action: 'USER_LOGIN',
      details: 'Admin user logged in from IP 192.168.1.1',
      type: 'auth',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-07-22T09:45:00Z',
      user: 'client@demo.com',
      action: 'FOCUS_GROUP_CREATED',
      details: 'Created new focus group "Movie Trailer Feedback"',
      type: 'data',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-07-22T09:15:00Z',
      user: 'tech@spotify.com',
      action: 'API_KEY_GENERATED',
      details: 'Generated new API key with read permissions',
      type: 'security',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-07-21T16:45:00Z',
      user: 'john.doe@acme.com',
      action: 'PASSWORD_RESET_REQUESTED',
      details: 'Password reset requested from IP 10.0.0.1',
      type: 'auth',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-07-21T14:20:00Z',
      user: 'sarah.smith@participant.com',
      action: 'USER_PROFILE_UPDATED',
      details: 'User profile information updated',
      type: 'data',
      status: 'success'
    },
    {
      id: 6,
      timestamp: '2024-07-21T12:10:00Z',
      user: 'system',
      action: 'SCHEDULED_BACKUP',
      details: 'Automatic database backup completed',
      type: 'system',
      status: 'success'
    },
    {
      id: 7,
      timestamp: '2024-07-20T09:30:00Z',
      user: 'unknown',
      action: 'FAILED_LOGIN_ATTEMPT',
      details: 'Failed login attempt for user admin@demo.com from IP 203.0.113.1',
      type: 'security',
      status: 'error'
    },
    {
      id: 8,
      timestamp: '2024-07-19T16:45:00Z',
      user: 'admin@demo.com',
      action: 'USER_DELETED',
      details: 'Deleted user account test@example.com',
      type: 'data',
      status: 'success'
    },
    {
      id: 9,
      timestamp: '2024-07-19T14:30:00Z',
      user: 'system',
      action: 'DATABASE_MIGRATION',
      details: 'Applied database schema update v2.3.1',
      type: 'system',
      status: 'success'
    },
    {
      id: 10,
      timestamp: '2024-07-18T11:20:00Z',
      user: 'admin@demo.com',
      action: 'PERMISSION_UPDATED',
      details: 'Updated role permissions for "Manager"',
      type: 'security',
      status: 'success'
    }
  ];

  // Filter logs based on search query, type filter, and date range
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    
    // Simple date range filter (in a real app, use proper date filtering)
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
    
    const matchesDateRange = 
      dateRange === 'all' || 
      (dateRange === '1d' && diffInDays < 1) ||
      (dateRange === '7d' && diffInDays < 7) ||
      (dateRange === '30d' && diffInDays < 30);
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'auth': return FiUser;
      case 'data': return FiDatabase;
      case 'security': return FiShield;
      case 'system': return FiServer;
      default: return FiClock;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'auth': return 'bg-blue-100 text-blue-800';
      case 'data': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success': return <Badge variant="success">Success</Badge>;
      case 'error': return <Badge variant="danger">Error</Badge>;
      case 'warning': return <Badge variant="warning">Warning</Badge>;
      default: return <Badge variant="default">Info</Badge>;
    }
  };

  const refreshLogs = () => {
    setLoading(true);
    // In a real app, this would fetch fresh logs from the server
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const exportLogs = () => {
    setExportingLogs(true);
    
    // Create CSV content
    const headers = ['Timestamp', 'User', 'Action', 'Details', 'Type', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toISOString(),
        log.user,
        log.action,
        `"${log.details.replace(/"/g, '""')}"`, // Escape quotes
        log.type,
        log.status
      ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => {
      setExportingLogs(false);
    }, 1000);
  };

  // Stats for the dashboard
  const stats = [
    {
      label: 'Auth Events',
      value: auditLogs.filter(log => log.type === 'auth').length,
      icon: FiUser,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Data Changes',
      value: auditLogs.filter(log => log.type === 'data').length,
      icon: FiDatabase,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Security Events',
      value: auditLogs.filter(log => log.type === 'security').length,
      icon: FiShield,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    {
      label: 'System Operations',
      value: auditLogs.filter(log => log.type === 'system').length,
      icon: FiServer,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Audit Logs</h1>
          <p className="text-gray-600">
            Comprehensive system audit trails for security and compliance
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<SafeIcon icon={FiDownload} />}
            onClick={exportLogs}
            loading={exportingLogs}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<SafeIcon icon={FiRefreshCw} />}
            onClick={refreshLogs}
            loading={loading}
          >
            Refresh
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

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="auth">Authentication</option>
              <option value="data">Data Changes</option>
              <option value="security">Security</option>
              <option value="system">System</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
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
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No audit logs found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                        <SafeIcon icon={getTypeIcon(log.type)} className="w-3 h-3 mr-1" />
                        {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.details}
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

export default AdminAuditLogs;