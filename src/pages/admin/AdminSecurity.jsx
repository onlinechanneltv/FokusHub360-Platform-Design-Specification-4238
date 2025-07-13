import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';

const { 
  FiShield, FiAlertTriangle, FiLock, FiRefreshCw, FiDownload, FiSearch, 
  FiUser, FiGlobe, FiServer, FiKey, FiClock, FiCheck, FiX
} = FiIcons;

const AdminSecurity = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [securityScan, setSecurityScan] = useState({
    inProgress: false,
    lastScan: '2024-07-21T14:30:00Z',
    progress: 0
  });
  
  // Mock security events
  const securityEvents = [
    {
      id: 1,
      timestamp: '2024-07-22T08:15:00Z',
      type: 'login_failure',
      severity: 'medium',
      source: '203.0.113.1',
      target: 'admin@demo.com',
      details: 'Multiple failed login attempts detected',
      resolved: false
    },
    {
      id: 2,
      timestamp: '2024-07-21T16:30:00Z',
      type: 'permission_change',
      severity: 'high',
      source: 'admin@demo.com',
      target: 'system',
      details: 'Admin permissions modified for user manager@demo.com',
      resolved: true
    },
    {
      id: 3,
      timestamp: '2024-07-21T10:45:00Z',
      type: 'api_key_created',
      severity: 'low',
      source: 'client@demo.com',
      target: 'API',
      details: 'New API key generated with read/write permissions',
      resolved: true
    },
    {
      id: 4,
      timestamp: '2024-07-20T14:20:00Z',
      type: 'unusual_activity',
      severity: 'medium',
      source: '198.51.100.1',
      target: 'participant@demo.com',
      details: 'Unusual login location detected',
      resolved: true
    },
    {
      id: 5,
      timestamp: '2024-07-19T09:30:00Z',
      type: 'data_export',
      severity: 'medium',
      source: 'manager@demo.com',
      target: 'Reports',
      details: 'Large data export containing sensitive information',
      resolved: true
    },
    {
      id: 6,
      timestamp: '2024-07-18T11:15:00Z',
      type: 'security_scan',
      severity: 'info',
      source: 'system',
      target: 'system',
      details: 'Automated security scan completed with 2 warnings',
      resolved: true
    },
    {
      id: 7,
      timestamp: '2024-07-17T16:40:00Z',
      type: 'brute_force',
      severity: 'critical',
      source: '192.0.2.1',
      target: 'API',
      details: 'Potential brute force attack on API endpoints detected',
      resolved: false
    }
  ];

  // Filter security events based on search query
  const filteredEvents = securityEvents.filter(event => {
    return (
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Security stats
  const securityStats = [
    {
      label: 'Active Threats',
      value: securityEvents.filter(e => !e.resolved && e.severity === 'critical').length,
      icon: FiAlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    {
      label: 'Security Score',
      value: '87/100',
      icon: FiShield,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Open Issues',
      value: securityEvents.filter(e => !e.resolved).length,
      icon: FiLock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      label: 'Last Scan',
      value: new Date(securityScan.lastScan).toLocaleDateString(),
      icon: FiClock,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    }
  ];

  // Security recommendations
  const securityRecommendations = [
    {
      id: 1,
      title: 'Enable Two-Factor Authentication',
      description: 'Require 2FA for all admin and manager accounts',
      impact: 'high',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Review API Key Permissions',
      description: 'Some API keys have excessive permissions',
      impact: 'medium',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Update Password Policy',
      description: 'Strengthen password requirements',
      impact: 'high',
      status: 'implemented'
    },
    {
      id: 4,
      title: 'Restrict Admin IP Access',
      description: 'Limit admin access to specific IP ranges',
      impact: 'medium',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Regular Security Audits',
      description: 'Implement monthly security audits',
      impact: 'medium',
      status: 'implemented'
    }
  ];

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'low':
        return <Badge variant="success">Low</Badge>;
      case 'info':
        return <Badge variant="default">Info</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'login_failure':
        return FiUser;
      case 'permission_change':
        return FiLock;
      case 'api_key_created':
        return FiKey;
      case 'unusual_activity':
        return FiAlertTriangle;
      case 'data_export':
        return FiDownload;
      case 'security_scan':
        return FiShield;
      case 'brute_force':
        return FiServer;
      default:
        return FiGlobe;
    }
  };

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'high':
        return <Badge variant="danger">High Impact</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="info">Low Impact</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'implemented':
        return <Badge variant="success">Implemented</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const runSecurityScan = () => {
    setSecurityScan({
      ...securityScan,
      inProgress: true,
      progress: 0
    });
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setSecurityScan(prev => {
        const newProgress = prev.progress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            inProgress: false,
            progress: 100,
            lastScan: new Date().toISOString()
          };
        }
        
        return {
          ...prev,
          progress: newProgress
        };
      });
    }, 500);
  };

  const refreshSecurityEvents = () => {
    setLoading(true);
    // In a real app, this would fetch fresh security events from the server
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Security Center</h1>
          <p className="text-gray-600">
            Monitor and manage platform security and compliance
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<SafeIcon icon={FiRefreshCw} />}
            onClick={refreshSecurityEvents}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<SafeIcon icon={FiShield} />}
            onClick={runSecurityScan}
            loading={securityScan.inProgress}
            disabled={securityScan.inProgress}
          >
            Run Security Scan
          </Button>
        </div>
      </div>

      {/* Security Scan Progress */}
      {securityScan.inProgress && (
        <Card className="mb-6">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-900">Security scan in progress...</div>
                <div className="text-sm text-gray-500">{securityScan.progress}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${securityScan.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {securityStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Security Events */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Events</h2>
              <div className="relative w-64">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <SafeIcon icon={getTypeIcon(event.type)} className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {event.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                            <div className="text-sm text-gray-500">{event.details}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(event.severity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.target}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.resolved ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                            Resolved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                            Open
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Security Recommendations */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h2>
            <div className="space-y-4">
              {securityRecommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{recommendation.title}</h3>
                    {getImpactBadge(recommendation.impact)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                  <div className="flex justify-between items-center">
                    {getStatusBadge(recommendation.status)}
                    {recommendation.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Implement
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Score */}
          <Card className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Score</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Security</span>
              <span className="text-sm font-medium text-gray-700">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Authentication</span>
                  <span className="text-sm font-medium text-gray-700">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Data Protection</span>
                  <span className="text-sm font-medium text-gray-700">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">API Security</span>
                  <span className="text-sm font-medium text-gray-700">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Compliance</span>
                  <span className="text-sm font-medium text-gray-700">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;