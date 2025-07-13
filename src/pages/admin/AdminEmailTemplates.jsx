import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiMail, FiPlus, FiSearch, FiEdit2, FiTrash2, FiSave, FiX } = FiIcons;

const AdminEmailTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to FokusHub360!',
      content: `Dear {{user.name}},

Welcome to FokusHub360! We're excited to have you join our platform.

Your account has been successfully created and you can now access all our features.

Best regards,
The FokusHub360 Team`,
      variables: ['user.name', 'user.email'],
      category: 'onboarding',
      lastModified: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Password Reset',
      subject: 'Reset Your Password',
      content: `Dear {{user.name}},

You have requested to reset your password. Click the link below to set a new password:

{{resetLink}}

If you didn't request this, please ignore this email.

Best regards,
The FokusHub360 Team`,
      variables: ['user.name', 'resetLink'],
      category: 'security',
      lastModified: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Focus Group Invitation',
      subject: 'New Focus Group Opportunity',
      content: `Hi {{participant.name}},

You've been matched with a new focus group: {{focusGroup.title}}

Reward: {{focusGroup.reward}}
Duration: {{focusGroup.duration}}

Click here to participate: {{participationLink}}

Best regards,
The FokusHub360 Team`,
      variables: ['participant.name', 'focusGroup.title', 'focusGroup.reward', 'focusGroup.duration', 'participationLink'],
      category: 'focus_groups',
      lastModified: new Date().toISOString()
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: '',
      subject: '',
      content: '',
      variables: [],
      category: 'general',
      lastModified: new Date().toISOString()
    };
    setEditingTemplate(newTemplate);
    setShowEditor(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate({ ...template });
    setShowEditor(true);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate.name || !editingTemplate.subject || !editingTemplate.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingTemplate.id) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? { ...editingTemplate, lastModified: new Date().toISOString() } : t
      ));
    } else {
      // Create new template
      setTemplates([...templates, { ...editingTemplate, id: Date.now(), lastModified: new Date().toISOString() }]);
    }

    setShowEditor(false);
    setEditingTemplate(null);
    toast.success('Template saved successfully');
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
      toast.success('Template deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Email Templates</h1>
          <p className="text-gray-600">Manage and customize email notifications sent to users</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={handleCreateTemplate}
          >
            Create Template
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Categories</option>
            <option value="onboarding">Onboarding</option>
            <option value="security">Security</option>
            <option value="focus_groups">Focus Groups</option>
            <option value="general">General</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">Subject: {template.subject}</p>
              </div>
              <Badge variant="primary" size="sm">
                {template.category}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {template.content.length > 200 
                    ? template.content.substring(0, 200) + '...' 
                    : template.content}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Variables:</h4>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable) => (
                  <Badge key={variable} variant="default" size="sm">
                    {`{{${variable}}}`}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Last modified: {new Date(template.lastModified).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<SafeIcon icon={FiEdit2} />}
                  onClick={() => handleEditTemplate(template)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<SafeIcon icon={FiTrash2} />}
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Editor Modal */}
      {showEditor && editingTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTemplate.id ? 'Edit Template' : 'Create Template'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editingTemplate.category}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="onboarding">Onboarding</option>
                    <option value="security">Security</option>
                    <option value="focus_groups">Focus Groups</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Content
                </label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                  rows="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
                  placeholder="Enter email content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variables
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder="Add variable (e.g., user.name)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const newVar = e.target.value.trim();
                        if (newVar && !editingTemplate.variables.includes(newVar)) {
                          setEditingTemplate({
                            ...editingTemplate,
                            variables: [...editingTemplate.variables, newVar]
                          });
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  {editingTemplate.variables.map((variable) => (
                    <Badge
                      key={variable}
                      variant="default"
                      size="sm"
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setEditingTemplate({
                          ...editingTemplate,
                          variables: editingTemplate.variables.filter(v => v !== variable)
                        });
                      }}
                    >
                      {`{{${variable}}}`} <SafeIcon icon={FiX} className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={<SafeIcon icon={FiSave} />}
                onClick={handleSaveTemplate}
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminEmailTemplates;