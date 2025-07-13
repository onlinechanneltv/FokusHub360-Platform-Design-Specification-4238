import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import RichTextEditor from '../../components/editor/RichTextEditor';
import toast from 'react-hot-toast';

const { FiFile, FiPlus, FiSave, FiX, FiTrash2, FiEye, FiGlobe, FiSearch } = FiIcons;

const AdminPages = () => {
  const [pages, setPages] = useState([
    {
      id: 'terms',
      title: 'Terms of Service',
      slug: 'terms',
      status: 'published',
      lastModified: '2024-01-15',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      slug: 'privacy',
      status: 'published',
      lastModified: '2024-01-15',
    },
    {
      id: 'about',
      title: 'About Us',
      slug: 'about',
      status: 'draft',
      lastModified: '2024-01-16',
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleCreatePage = () => {
    setEditingPage({
      title: '',
      slug: '',
      content: '',
      status: 'draft'
    });
    setShowEditor(true);
  };

  const handleEditPage = (page) => {
    setEditingPage({ ...page });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!editingPage.title) {
      toast.error('Page title is required');
      return;
    }
    if (!editingPage.slug) {
      toast.error('Page URL slug is required');
      return;
    }

    setSaving(true);
    try {
      if (editingPage.id) {
        // Update existing page
        setPages(pages.map(p => 
          p.id === editingPage.id 
            ? { ...editingPage, lastModified: new Date().toISOString().split('T')[0] }
            : p
        ));
      } else {
        // Create new page
        const newPage = {
          ...editingPage,
          id: Date.now().toString(),
          lastModified: new Date().toISOString().split('T')[0]
        };
        setPages([...pages, newPage]);
      }
      toast.success('Page saved successfully');
      setShowEditor(false);
      setEditingPage(null);
    } catch (error) {
      toast.error('Failed to save page');
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(p => p.id !== pageId));
      toast.success('Page deleted successfully');
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Page Builder</h1>
          <p className="text-gray-600">
            Create and manage static pages for your platform
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
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search pages..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Pages List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiFile} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={page.status === 'published' ? 'success' : 'warning'}
                    >
                      {page.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<SafeIcon icon={FiEye} />}
                        onClick={() => window.open(`/${page.slug}`, '_blank')}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<SafeIcon icon={FiFile} />}
                        onClick={() => handleEditPage(page)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<SafeIcon icon={FiTrash2} />}
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeletePage(page.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Page Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingPage.id ? 'Edit Page' : 'Create New Page'}
                </h3>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter page title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">/</span>
                    <input
                      type="text"
                      value={editingPage.slug}
                      onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="page-url-slug"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingPage.status}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    content={editingPage.content}
                    onChange={(newContent) => setEditingPage({
                      ...editingPage,
                      content: newContent
                    })}
                    placeholder="Start writing your page content..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditor(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={<SafeIcon icon={FiSave} />}
                  onClick={handleSave}
                  loading={saving}
                >
                  Save Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPages;