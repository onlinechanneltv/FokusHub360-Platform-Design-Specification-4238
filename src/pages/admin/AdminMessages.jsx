import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiMessageSquare, FiPlus, FiSearch, FiFilter, FiMail, FiUser, FiClock, FiFlag, FiReply, FiSend, FiX, FiUsers, FiArrowLeft } = FiIcons;

const AdminMessages = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const messages = [
    {
      id: 1,
      type: 'support',
      from: 'john.doe@acme.com',
      fromName: 'John Doe',
      organization: 'Acme Inc.',
      subject: 'Issue with campaign analytics',
      preview: 'Hi, I\'m having trouble accessing the analytics dashboard for my recent campaign...',
      fullMessage: 'Hi,\n\nI\'m having trouble accessing the analytics dashboard for my recent campaign "Movie Trailer Feedback". Every time I try to open the report, I get an error message saying "Failed to load data". This has been happening for the past 2 days.\n\nI\'ve tried clearing my browser cache and using a different browser, but the issue persists. Could you please help me resolve this?\n\nThanks,\nJohn Doe\nAcme Inc.',
      timestamp: '2024-07-22T10:30:00Z',
      status: 'unread',
      priority: 'high',
      replies: []
    },
    {
      id: 2,
      type: 'billing',
      from: 'billing@netflix.com',
      fromName: 'Netflix Billing',
      organization: 'Netflix',
      subject: 'Invoice #INV-2024-001',
      preview: 'Please find attached the invoice for this month\'s usage...',
      fullMessage: 'Dear Netflix Team,\n\nPlease find attached the invoice #INV-2024-001 for this month\'s usage of FokusHub360 platform.\n\nInvoice Details:\n- Campaign: Movie Trailer Testing\n- Participants: 500\n- Amount: $2,500.00\n- Due Date: July 30, 2024\n\nPayment can be made through your usual payment method.\n\nBest regards,\nFokusHub360 Billing Team',
      timestamp: '2024-07-22T09:15:00Z',
      status: 'read',
      priority: 'medium',
      replies: [
        {
          id: 1,
          from: 'admin@fokushub360.com',
          message: 'Thank you for your payment. Invoice has been marked as paid.',
          timestamp: '2024-07-22T11:30:00Z'
        }
      ]
    },
    {
      id: 3,
      type: 'feedback',
      from: 'sarah.smith@participant.com',
      fromName: 'Sarah Smith',
      organization: 'Participant',
      subject: 'Great experience with focus group',
      preview: 'Just wanted to share my positive experience with the recent focus group...',
      fullMessage: 'Hi FokusHub360 Team,\n\nJust wanted to share my positive experience with the recent focus group I participated in. The platform was very user-friendly and the questions were well-structured.\n\nI particularly liked:\n- The intuitive interface\n- Quick payment processing\n- Clear instructions\n\nI\'ve already recommended your platform to several friends who are interested in participating in market research.\n\nKeep up the great work!\n\nBest regards,\nSarah Smith',
      timestamp: '2024-07-21T16:45:00Z',
      status: 'replied',
      priority: 'low',
      replies: [
        {
          id: 1,
          from: 'admin@fokushub360.com',
          message: 'Thank you so much for your wonderful feedback, Sarah! We\'re thrilled to hear about your positive experience.',
          timestamp: '2024-07-21T18:00:00Z'
        }
      ]
    },
    {
      id: 4,
      type: 'technical',
      from: 'tech@spotify.com',
      fromName: 'Spotify Technical Team',
      organization: 'Spotify',
      subject: 'API integration question',
      preview: 'We\'re looking to integrate with your API and have some technical questions...',
      fullMessage: 'Hello FokusHub360 Technical Team,\n\nWe\'re looking to integrate with your API for automated focus group creation and participant management. We have a few technical questions:\n\n1. What authentication method do you use for API access?\n2. Are there rate limits on API calls?\n3. Do you provide webhooks for real-time updates?\n4. Is there a sandbox environment for testing?\n\nWe\'re planning to launch this integration next quarter and would appreciate any documentation or support you can provide.\n\nBest regards,\nSpotify Technical Team',
      timestamp: '2024-07-21T14:20:00Z',
      status: 'unread',
      priority: 'high',
      replies: []
    },
    {
      id: 5,
      type: 'support',
      from: 'help@airbnb.com',
      fromName: 'Airbnb Support',
      organization: 'Airbnb',
      subject: 'Participant recruitment assistance',
      preview: 'We need help with targeting specific demographics for our upcoming campaign...',
      fullMessage: 'Dear FokusHub360 Team,\n\nWe need assistance with participant recruitment for our upcoming campaign about travel preferences. We\'re looking to target:\n\n- Age: 25-45\n- Income: $50k+\n- Travel frequency: 3+ times per year\n- Location: Urban areas\n\nCould you help us optimize our targeting criteria to ensure we get the most relevant participants?\n\nAlso, what\'s the typical timeline for recruiting 200+ participants with these criteria?\n\nThanks for your help!\n\nAirbnb Marketing Team',
      timestamp: '2024-07-20T11:30:00Z',
      status: 'read',
      priority: 'medium',
      replies: []
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Messages', count: messages.length },
    { id: 'unread', label: 'Unread', count: messages.filter(m => m.status === 'unread').length },
    { id: 'support', label: 'Support', count: messages.filter(m => m.type === 'support').length },
    { id: 'billing', label: 'Billing', count: messages.filter(m => m.type === 'billing').length },
    { id: 'technical', label: 'Technical', count: messages.filter(m => m.type === 'technical').length }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesTab = selectedTab === 'all' || message.type === selectedTab || message.status === selectedTab;
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread': return <Badge variant="warning">Unread</Badge>;
      case 'read': return <Badge variant="default">Read</Badge>;
      case 'replied': return <Badge variant="success">Replied</Badge>;
      default: return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'support': return FiUser;
      case 'billing': return FiMail;
      case 'technical': return FiFlag;
      default: return FiMessageSquare;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleComposeMessage = () => {
    setComposeData({
      to: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    setShowComposeModal(true);
  };

  const handleSendMessage = () => {
    if (!composeData.to || !composeData.subject || !composeData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    setSending(true);
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setShowComposeModal(false);
      toast.success('Message sent successfully');
    }, 1500);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageDetail(true);
    
    // Mark as read if unread
    if (message.status === 'unread') {
      // In a real app, you would update the message status in the backend
      message.status = 'read';
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply message');
      return;
    }

    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReply = {
        id: selectedMessage.replies.length + 1,
        from: 'admin@fokushub360.com',
        message: replyText,
        timestamp: new Date().toISOString()
      };
      
      selectedMessage.replies.push(newReply);
      selectedMessage.status = 'replied';
      
      setReplyText('');
      setSending(false);
      toast.success('Reply sent successfully');
    }, 1500);
  };

  // Users for recipient selection
  const users = [
    { value: 'all@fokushub.com', label: 'All Users' },
    { value: 'john.doe@acme.com', label: 'John Doe (Acme Inc.)' },
    { value: 'sarah.smith@participant.com', label: 'Sarah Smith (Participant)' },
    { value: 'tech@spotify.com', label: 'Spotify Technical Team' },
    { value: 'help@airbnb.com', label: 'Airbnb Support' }
  ];

  // Message Detail View
  if (showMessageDetail && selectedMessage) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center space-x-4">
          <Button
            variant="outline"
            icon={<SafeIcon icon={FiArrowLeft} />}
            onClick={() => setShowMessageDetail(false)}
          >
            Back to Messages
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h1>
            <p className="text-gray-600">
              From: {selectedMessage.fromName} ({selectedMessage.organization})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Original Message */}
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <SafeIcon icon={getTypeIcon(selectedMessage.type)} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedMessage.fromName}</div>
                    <div className="text-sm text-gray-600">{selectedMessage.from}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedMessage.status)}
                  <SafeIcon icon={FiFlag} className={`w-4 h-4 ${getPriorityColor(selectedMessage.priority)}`} />
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                {formatTimestamp(selectedMessage.timestamp)}
              </div>
              
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {selectedMessage.fullMessage}
                </pre>
              </div>
            </Card>

            {/* Replies */}
            {selectedMessage.replies.map((reply) => (
              <Card key={reply.id} className="mb-4 ml-8">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiReply} className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Admin Reply</div>
                    <div className="text-sm text-gray-500">{formatTimestamp(reply.timestamp)}</div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none ml-11">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700">
                    {reply.message}
                  </pre>
                </div>
              </Card>
            ))}

            {/* Reply Form */}
            <Card className="ml-8">
              <h3 className="font-medium text-gray-900 mb-4">Send Reply</h3>
              <div className="space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Type your reply..."
                />
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    icon={<SafeIcon icon={FiSend} />}
                    onClick={handleSendReply}
                    loading={sending}
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Message Info Sidebar */}
          <div>
            <Card>
              <h3 className="font-medium text-gray-900 mb-4">Message Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">From:</span>
                  <div className="font-medium">{selectedMessage.fromName}</div>
                  <div className="text-sm text-gray-600">{selectedMessage.from}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Organization:</span>
                  <div className="font-medium">{selectedMessage.organization}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Type:</span>
                  <div className="font-medium capitalize">{selectedMessage.type}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Priority:</span>
                  <div className={`font-medium capitalize ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Received:</span>
                  <div className="font-medium">{new Date(selectedMessage.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Mark as Unread
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Forward Message
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Archive
                </Button>
                <Button variant="outline" size="sm" className="w-full text-red-600">
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Message Center</h1>
          <p className="text-gray-600">
            Manage platform communications and user messaging
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={handleComposeMessage}
          >
            Compose Message
          </Button>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiMessageSquare} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{messages.length}</div>
          <div className="text-gray-600 text-sm">Total Messages</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiClock} className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {messages.filter(m => m.status === 'unread').length}
          </div>
          <div className="text-gray-600 text-sm">Unread</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiFlag} className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {messages.filter(m => m.priority === 'high').length}
          </div>
          <div className="text-gray-600 text-sm">High Priority</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiReply} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {messages.filter(m => m.status === 'replied').length}
          </div>
          <div className="text-gray-600 text-sm">Replied</div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="mb-6">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.id
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
        <div className="p-4 flex items-center justify-between">
          <div className="relative w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
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

      {/* Messages List */}
      <Card>
        <div className="divide-y divide-gray-200">
          {filteredMessages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                message.status === 'unread' ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={getTypeIcon(message.type)} className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {message.fromName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {message.organization}
                      </span>
                      <SafeIcon icon={FiFlag} className={`w-3 h-3 ${getPriorityColor(message.priority)}`} />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {message.preview}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getStatusBadge(message.status)}
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredMessages.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiMessageSquare} className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </Card>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Compose Message</h3>
                <button
                  onClick={() => setShowComposeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={composeData.to}
                    onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select recipient</option>
                    {users.map(user => (
                      <option key={user.value} value={user.value}>{user.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter message subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={composeData.message}
                    onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high'].map(priority => (
                      <label key={priority} className="inline-flex items-center">
                        <input
                          type="radio"
                          value={priority}
                          checked={composeData.priority === priority}
                          onChange={(e) => setComposeData({ ...composeData, priority: e.target.value })}
                          className="form-radio h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={<SafeIcon icon={FiSend} />}
                  loading={sending}
                  onClick={handleSendMessage}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;