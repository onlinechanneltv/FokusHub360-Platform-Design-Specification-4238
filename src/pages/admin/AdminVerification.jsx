import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiUserCheck, FiSearch, FiFilter, FiCheck, FiX, FiEye, FiUser, FiMail, FiPhone, FiFileText, FiClock, FiShield, FiAlertTriangle } = FiIcons;

const AdminVerification = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [verificationRequests, setVerificationRequests] = useState([
    {
      id: 1,
      userId: 'user_12345',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      type: 'participant',
      status: 'pending',
      submittedAt: '2024-07-20T10:30:00Z',
      documents: [
        { type: 'government_id', name: 'drivers_license.jpg', url: '/docs/dl_12345.jpg' },
        { type: 'proof_of_address', name: 'utility_bill.pdf', url: '/docs/utility_12345.pdf' }
      ],
      notes: 'Standard participant verification request',
      reviewedBy: null,
      reviewedAt: null
    },
    {
      id: 2,
      userId: 'user_67890',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-555-0456',
      type: 'client',
      status: 'pending',
      submittedAt: '2024-07-19T14:15:00Z',
      documents: [
        { type: 'business_license', name: 'business_license.pdf', url: '/docs/bl_67890.pdf' },
        { type: 'tax_document', name: 'tax_form.pdf', url: '/docs/tax_67890.pdf' },
        { type: 'government_id', name: 'passport.jpg', url: '/docs/passport_67890.jpg' }
      ],
      notes: 'Client verification for TechCorp Inc.',
      reviewedBy: null,
      reviewedAt: null
    },
    {
      id: 3,
      userId: 'user_11111',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1-555-0789',
      type: 'participant',
      status: 'approved',
      submittedAt: '2024-07-18T09:20:00Z',
      documents: [
        { type: 'government_id', name: 'state_id.jpg', url: '/docs/state_11111.jpg' }
      ],
      notes: 'Verified participant - all documents valid',
      reviewedBy: 'admin_001',
      reviewedAt: '2024-07-18T11:45:00Z'
    },
    {
      id: 4,
      userId: 'user_22222',
      name: 'Emily Davis',
      email: 'emily.davis@startup.io',
      phone: '+1-555-0321',
      type: 'client',
      status: 'rejected',
      submittedAt: '2024-07-17T16:30:00Z',
      documents: [
        { type: 'government_id', name: 'license.jpg', url: '/docs/license_22222.jpg' }
      ],
      notes: 'Rejected - documents unclear, requested resubmission',
      reviewedBy: 'admin_002',
      reviewedAt: '2024-07-17T18:15:00Z'
    },
    {
      id: 5,
      userId: 'user_33333',
      name: 'David Wilson',
      email: 'david.wilson@freelance.com',
      phone: '+1-555-0654',
      type: 'participant',
      status: 'under_review',
      submittedAt: '2024-07-21T12:00:00Z',
      documents: [
        { type: 'government_id', name: 'passport.jpg', url: '/docs/passport_33333.jpg' },
        { type: 'proof_of_address', name: 'bank_statement.pdf', url: '/docs/bank_33333.pdf' }
      ],
      notes: 'Currently under manual review - additional verification needed',
      reviewedBy: 'admin_003',
      reviewedAt: null
    }
  ]);

  const filteredRequests = verificationRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = 
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = (requestId) => {
    setVerificationRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'approved',
              reviewedBy: 'current_admin',
              reviewedAt: new Date().toISOString(),
              notes: request.notes + ' - Approved by admin'
            }
          : request
      )
    );
    toast.success('Verification request approved');
  };

  const handleReject = (requestId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      setVerificationRequests(requests =>
        requests.map(request =>
          request.id === requestId
            ? {
                ...request,
                status: 'rejected',
                reviewedBy: 'current_admin',
                reviewedAt: new Date().toISOString(),
                notes: request.notes + ` - Rejected: ${reason}`
              }
            : request
        )
      );
      toast.success('Verification request rejected');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      default: return 'default';
    }
  };

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case 'client': return 'primary';
      case 'participant': return 'secondary';
      case 'manager': return 'info';
      default: return 'default';
    }
  };

  const stats = [
    {
      label: 'Total Requests',
      value: verificationRequests.length,
      icon: FiFileText,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Pending Review',
      value: verificationRequests.filter(r => r.status === 'pending').length,
      icon: FiClock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      label: 'Approved',
      value: verificationRequests.filter(r => r.status === 'approved').length,
      icon: FiCheck,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Under Review',
      value: verificationRequests.filter(r => r.status === 'under_review').length,
      icon: FiShield,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Requests', count: verificationRequests.length },
    { id: 'pending', label: 'Pending', count: verificationRequests.filter(r => r.status === 'pending').length },
    { id: 'under_review', label: 'Under Review', count: verificationRequests.filter(r => r.status === 'under_review').length },
    { id: 'approved', label: 'Approved', count: verificationRequests.filter(r => r.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: verificationRequests.filter(r => r.status === 'rejected').length }
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">User Verification</h1>
          <p className="text-gray-600">
            Review and approve user verification requests and manage identity verification processes
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

      {/* Tabs and Search */}
      <Card className="mb-6">
        <div className="flex flex-wrap border-b border-gray-200 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="default" size="sm" className="ml-2">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" icon={<SafeIcon icon={FiFilter} />}>
            Filter
          </Button>
        </div>
      </Card>

      {/* Verification Requests Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getTypeBadgeVariant(request.type)}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(request.status)}>
                      {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.documents.length} document{request.documents.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<SafeIcon icon={FiEye} />}
                        onClick={() => handleViewDetails(request)}
                      />
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<SafeIcon icon={FiCheck} />}
                            className="text-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(request.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<SafeIcon icon={FiX} />}
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(request.id)}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiUserCheck} className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No verification requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Verification Request Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Information */}
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">User Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-sm text-gray-900">{selectedRequest.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-sm text-gray-900">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-sm text-gray-900">{selectedRequest.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <Badge variant={getTypeBadgeVariant(selectedRequest.type)}>
                        {selectedRequest.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Documents</h4>
                  <div className="space-y-3">
                    {selectedRequest.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Document
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Notes */}
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>
                        {selectedRequest.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Submitted</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedRequest.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {selectedRequest.reviewedAt && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Reviewed By</label>
                        <p className="text-sm text-gray-900">{selectedRequest.reviewedBy}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Reviewed At</label>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedRequest.reviewedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedRequest.notes}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </Button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      icon={<SafeIcon icon={FiX} />}
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => {
                        handleReject(selectedRequest.id);
                        setShowDetailModal(false);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      icon={<SafeIcon icon={FiCheck} />}
                      onClick={() => {
                        handleApprove(selectedRequest.id);
                        setShowDetailModal(false);
                      }}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVerification;