import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiFile, FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiSave, FiX, FiGlobe } = FiIcons;

const AdminPages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Terms of Service',
      slug: 'terms',
      content: `# Terms of Service

## 1. Acceptance of Terms
By accessing and using FokusHub360, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Service Description
FokusHub360 is an AI-powered virtual focus group platform that connects businesses with participants for market research purposes.

## 3. User Responsibilities
- Provide accurate information
- Respect intellectual property rights
- Follow community guidelines
- Maintain account security

## 4. Privacy and Data Protection
We are committed to protecting your privacy. Please review our Privacy Policy for detailed information about how we collect, use, and protect your data.

## 5. Intellectual Property
All content, trademarks, and intellectual property on FokusHub360 are owned by us or our licensors.

## 6. Limitation of Liability
FokusHub360 shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 7. Modifications
We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.

## 8. Contact Information
For questions about these Terms, please contact us at legal@fokushub360.com.

Last updated: ${new Date().toLocaleDateString()}`,
      status: 'published',
      lastModified: new Date().toISOString(),
      isSystem: true
    },
    {
      id: 2,
      title: 'Privacy Policy',
      slug: 'privacy',
      content: `# Privacy Policy

## Information We Collect
We collect information you provide directly to us, information we collect automatically when you use our services, and information from third parties.

### Personal Information
- Name and contact information
- Account credentials
- Profile information
- Payment information

### Usage Information
- Log data
- Device information
- Location data
- Cookies and tracking technologies

## How We Use Your Information
- Provide and improve our services
- Process transactions
- Send communications
- Ensure security
- Comply with legal obligations

## Information Sharing
We do not sell your personal information. We may share information in limited circumstances:
- With your consent
- For legal compliance
- To protect rights and safety
- In business transfers

## Data Security
We implement appropriate technical and organizational measures to protect your personal information.

## Your Rights
- Access your information
- Correct inaccuracies
- Delete your data
- Object to processing
- Data portability

## Contact Us
For privacy questions, contact us at privacy@fokushub360.com.

Last updated: ${new Date().toLocaleDateString()}`,
      status: 'published',
      lastModified: new Date().toISOString(),
      isSystem: true
    },
    {
      id: 3,
      title: 'Cookie Policy',
      slug: 'cookies',
      content: `# Cookie Policy

## What Are Cookies
Cookies are small text files stored on your device when you visit our website.

## Types of Cookies We Use
- **Essential cookies**: Required for basic functionality
- **Analytics cookies**: Help us understand how you use our site
- **Marketing cookies**: Used to deliver relevant advertisements

## Managing Cookies
You can control cookies through your browser settings. However, disabling certain cookies may affect functionality.

## Third-Party Cookies
We may use third-party services that set cookies, including:
- Google Analytics
- Social media platforms
- Advertising networks

## Contact Us
Questions about our use of cookies? Contact us at support@fokushub360.com.

Last updated: ${new Date().toLocaleDateString()}`,
      status: 'published',
      lastModified: new Date().toISOString(),
      isSystem: true
    },
    {
      id: 4,
      title: 'Help Center',
      slug: 'help',
      content: `# Help Center

## Getting Started
Learn how to use FokusHub360 effectively.

### For Clients
1. Create your account
2. Set up your organization
3. Create your first focus group
4. Review and analyze results

### For Participants
1. Complete your profile
2. Join relevant focus groups
3. Provide thoughtful feedback
4. Earn rewards

## Frequently Asked Questions

### How does payment work?
Payments are processed securely through our platform. Participants receive payments within 3-5 business days after completing a focus group.

### How are participants matched?
Our AI algorithm matches participants based on demographic data, interests, and past participation history.

### Can I cancel a focus group?
Yes, you can cancel a focus group before the deadline. Partial refunds may apply based on participation levels.

## Contact Support
Need more help? Contact our support team at support@fokushub360.com.`,
      status: 'published',
      lastModified: new Date().toISOString(),
      isSystem: false
    }
  ]);

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePage = () => {
    setEditingPage({
      id: null,
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      isSystem: false
    });
    setShowEditor(true);
  };

  const handleEditPage = (page) => {
    setEditingPage({ ...page });
    setShowEditor(true);
  };

  const handleSavePage = () => {
    if (!editingPage.title || !editingPage.slug || !editingPage.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingPage.id) {
      // Update existing page
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { ...editingPage, lastModified: new Date().toISOString() }
          : page
      ));
      toast.success('Page updated successfully');
    } else {
      // Create new page
      const newPage = {
        ...editingPage,
        id: Math.max(...pages.map(p => p.id)) + 1,
        lastModified: new Date().toISOString()
      };
      setPages([...pages, newPage]);
      toast.success('Page created successfully');
    }

    setShowEditor(false);
    setEditingPage(null);
  };

  const handleDeletePage = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    
    if (page?.isSystem) {
      toast.error('Cannot delete system pages');
      return;
    }

    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== pageId));
      toast.success('Page deleted successfully');
    }
  };

  const handlePublishPage = (pageId) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, status: page.status === 'published' ? 'draft' : 'published', lastModified: new Date().toISOString() }
        : page
    ));
    toast.success('Page status updated');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <Badge variant="success">Published</Badge>;
      case 'draft': return <Badge variant="warning">Draft</Badge>;
      default: return <Badge variant="default">Unknown</Badge>;
    }
  };

  if (showEditor) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center space-x-4">
          <Button
            variant="outline"
            icon={<SafeIcon icon={FiX} />}
            onClick={() => setShowEditor(false)}
          >
            Cancel
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingPage?.id ? 'Edit Page' : 'Create Page'}
            </h1>
            <p className="text-gray-600">{editingPage?.title || 'New Page'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2">
            <Card>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingPage?.title || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      title: e.target.value,
                      slug: editingPage?.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter page title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingPage?.slug || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="page-url-slug"
                    disabled={editingPage?.isSystem}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /pages/{editingPage?.slug}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={editingPage?.content || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      content: e.target.value
                    })}
                    rows="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                    placeholder="Enter page content (Markdown supported)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Markdown formatting is supported. Use # for headers, ** for bold, etc.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingPage?.status || 'draft'}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      status: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {editingPage?.isSystem && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>System Page:</strong> This is a required system page. URL slug cannot be changed.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="primary"
                    icon={<SafeIcon icon={FiSave} />}
                    onClick={handleSavePage}
                    className="w-full"
                  >
                    Save Page
                  </Button>
                </div>
              </div>
            </Card>

            {/* Preview Card */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="prose prose-sm max-w-none">
                <div 
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: editingPage?.content?.substring(0, 200) + '...' || 'No content yet' 
                  }}
                />
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Page Management</h1>
          <p className="text-gray-600">
            Manage terms, privacy policy, help pages, and other site content
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={handleCreatePage}
          >
            Create Page
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                    {page.isSystem && (
                      <Badge variant="info" size="sm">System</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(page.status)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {page.content.replace(/[#*]/g, '').substring(0, 150)}...
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Last modified: {new Date(page.lastModified).toLocaleDateString()}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiEye} />}
                    onClick={() => window.open(`/pages/${page.slug}`, '_blank')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiEdit2} />}
                    onClick={() => handleEditPage(page)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublishPage(page.id)}
                    className={page.status === 'published' ? 'text-orange-600' : 'text-green-600'}
                  >
                    {page.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                  
                  {!page.isSystem && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<SafeIcon icon={FiTrash2} />}
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeletePage(page.id)}
                    />
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <Card className="text-center py-12">
          <SafeIcon icon={FiFile} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search query.' : 'Get started by creating your first page.'}
          </p>
          {!searchQuery && (
            <Button
              variant="primary"
              icon={<SafeIcon icon={FiPlus} />}
              onClick={handleCreatePage}
            >
              Create Your First Page
            </Button>
          )}
        </Card>
      )}
    </AdminLayout>
  );
};

export default AdminPages;