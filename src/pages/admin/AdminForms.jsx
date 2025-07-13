import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiDatabase, FiPlus, FiSearch, FiEdit2, FiTrash2, FiCopy, FiEye, FiX, FiSave, FiType, FiCheckSquare, FiCircle, FiSliders, FiList, FiToggleLeft, FiArrowLeft } = FiIcons;

const AdminForms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuestionBuilder, setShowQuestionBuilder] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editingForm, setEditingForm] = useState(null);
  const [newForm, setNewForm] = useState({
    name: '',
    description: '',
    category: 'demographics',
    status: 'draft'
  });

  const [forms, setForms] = useState([
    {
      id: 1,
      name: 'Basic Demographics',
      description: 'Standard demographic questions for participant profiling',
      category: 'demographics',
      questions: [
        { id: 1, type: 'number', label: 'What is your age?', required: true, options: [] },
        { id: 2, type: 'select', label: 'What is your gender?', required: true, options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
        { id: 3, type: 'text', label: 'What country do you live in?', required: true, options: [] },
        { id: 4, type: 'select', label: 'What is your marital status?', required: false, options: ['Single', 'Married', 'Divorced', 'Widowed'] }
      ],
      responses: 2847,
      status: 'active',
      createdAt: '2024-01-15',
      lastModified: '2024-06-20'
    },
    {
      id: 2,
      name: 'Technology Usage Survey',
      description: 'Comprehensive technology and digital habits assessment',
      category: 'technology',
      questions: [
        { id: 1, type: 'select', label: 'What is your primary device?', required: true, options: ['Smartphone', 'Laptop', 'Desktop', 'Tablet'] },
        { id: 2, type: 'multiselect', label: 'Which social media platforms do you use?', required: false, options: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok'] },
        { id: 3, type: 'scale', label: 'How tech-savvy would you rate yourself?', required: true, scale: [1, 10] }
      ],
      responses: 1923,
      status: 'active',
      createdAt: '2024-02-10',
      lastModified: '2024-07-15'
    },
    {
      id: 3,
      name: 'Brand Preference Study',
      description: 'Consumer brand perception and preference analysis',
      category: 'marketing',
      questions: [
        { id: 1, type: 'text', label: 'What brands come to mind when you think of quality?', required: true, options: [] },
        { id: 2, type: 'scale', label: 'How important is brand reputation to you?', required: true, scale: [1, 10] },
        { id: 3, type: 'select', label: 'What influences your brand choices most?', required: true, options: ['Price', 'Quality', 'Reviews', 'Recommendations', 'Advertising'] }
      ],
      responses: 756,
      status: 'active',
      createdAt: '2024-03-05',
      lastModified: '2024-07-22'
    },
    {
      id: 4,
      name: 'Media Consumption Habits',
      description: 'Entertainment and media consumption patterns',
      category: 'media',
      questions: [
        { id: 1, type: 'multiselect', label: 'What streaming platforms do you use?', required: true, options: ['Netflix', 'Amazon Prime', 'Disney+', 'Hulu', 'HBO Max'] },
        { id: 2, type: 'number', label: 'How many hours do you watch TV/streaming per day?', required: true, options: [] },
        { id: 3, type: 'select', label: 'What time do you usually watch content?', required: false, options: ['Morning', 'Afternoon', 'Evening', 'Late Night'] }
      ],
      responses: 1456,
      status: 'draft',
      createdAt: '2024-07-18',
      lastModified: '2024-07-20'
    }
  ]);

  const [editingQuestions, setEditingQuestions] = useState([]);

  const questionTypes = [
    { id: 'text', label: 'Text Input', icon: FiType },
    { id: 'textarea', label: 'Long Text', icon: FiType },
    { id: 'number', label: 'Number Input', icon: FiType },
    { id: 'select', label: 'Dropdown', icon: FiList },
    { id: 'multiselect', label: 'Multiple Select', icon: FiCheckSquare },
    { id: 'radio', label: 'Multiple Choice', icon: FiCircle },
    { id: 'checkbox', label: 'Checkboxes', icon: FiCheckSquare },
    { id: 'scale', label: 'Rating Scale', icon: FiSliders },
    { id: 'boolean', label: 'Yes/No', icon: FiToggleLeft }
  ];

  const categories = [
    'demographics',
    'technology',
    'lifestyle',
    'media',
    'marketing',
    'product',
    'custom'
  ];

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateForm = () => {
    if (!newForm.name || !newForm.description) {
      toast.error('Name and description are required');
      return;
    }

    const form = {
      id: Math.max(...forms.map(f => f.id)) + 1,
      ...newForm,
      questions: [],
      responses: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, form]);
    setNewForm({ name: '', description: '', category: 'demographics', status: 'draft' });
    setShowCreateModal(false);
    toast.success('Form created successfully');
  };

  const handleEditForm = (form) => {
    setEditingForm({ ...form });
    setShowEditModal(true);
  };

  const handleUpdateForm = () => {
    if (!editingForm.name || !editingForm.description) {
      toast.error('Name and description are required');
      return;
    }

    setForms(forms.map(form =>
      form.id === editingForm.id ? { ...editingForm, lastModified: new Date().toISOString().split('T')[0] } : form
    ));
    setShowEditModal(false);
    setEditingForm(null);
    toast.success('Form updated successfully');
  };

  const handleDeleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(form => form.id !== formId));
      toast.success('Form deleted successfully');
    }
  };

  const handleDuplicateForm = (form) => {
    const duplicatedForm = {
      ...form,
      id: Math.max(...forms.map(f => f.id)) + 1,
      name: `${form.name} (Copy)`,
      responses: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, duplicatedForm]);
    toast.success('Form duplicated successfully');
  };

  const handleViewQuestions = (form) => {
    setSelectedForm(form);
    setEditingQuestions([...form.questions]);
    setShowQuestionBuilder(true);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Math.max(...editingQuestions.map(q => q.id), 0) + 1,
      type: 'text',
      label: '',
      required: true,
      options: []
    };
    setEditingQuestions([...editingQuestions, newQuestion]);
  };

  const handleUpdateQuestion = (questionId, field, value) => {
    setEditingQuestions(editingQuestions.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setEditingQuestions(editingQuestions.filter(q => q.id !== questionId));
    }
  };

  const handleSaveQuestions = () => {
    setForms(forms.map(form =>
      form.id === selectedForm.id 
        ? { ...form, questions: editingQuestions, lastModified: new Date().toISOString().split('T')[0] }
        : form
    ));
    setShowQuestionBuilder(false);
    setSelectedForm(null);
    setEditingQuestions([]);
    toast.success('Questions saved successfully');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'default';
      default: return 'default';
    }
  };

  const getCategoryBadgeVariant = (category) => {
    switch (category) {
      case 'demographics': return 'primary';
      case 'technology': return 'info';
      case 'lifestyle': return 'secondary';
      case 'media': return 'success';
      case 'marketing': return 'warning';
      default: return 'default';
    }
  };

  if (showQuestionBuilder) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center space-x-4">
          <Button
            variant="outline"
            icon={<SafeIcon icon={FiArrowLeft} />}
            onClick={() => setShowQuestionBuilder(false)}
          >
            Back to Forms
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Questions: {selectedForm?.name}</h1>
            <p className="text-gray-600">{selectedForm?.description}</p>
          </div>
        </div>

        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Questions ({editingQuestions.length})</h2>
              <p className="text-sm text-gray-600">Manage the questions for this form</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                icon={<SafeIcon icon={FiPlus} />}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
              <Button
                variant="primary"
                icon={<SafeIcon icon={FiSave} />}
                onClick={handleSaveQuestions}
              >
                Save Questions
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {editingQuestions.map((question, index) => (
            <Card key={question.id}>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="primary">Question {index + 1}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<SafeIcon icon={FiTrash2} />}
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteQuestion(question.id)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                  <input
                    type="text"
                    value={question.label}
                    onChange={(e) => handleUpdateQuestion(question.id, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your question"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                  <select
                    value={question.type}
                    onChange={(e) => handleUpdateQuestion(question.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {questionTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {(question.type === 'select' || question.type === 'multiselect' || question.type === 'radio' || question.type === 'checkbox') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options (one per line)</label>
                  <textarea
                    value={question.options?.join('\n') || ''}
                    onChange={(e) => handleUpdateQuestion(question.id, 'options', e.target.value.split('\n').filter(opt => opt.trim()))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="4"
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                  />
                </div>
              )}

              {question.type === 'scale' && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scale Min</label>
                    <input
                      type="number"
                      value={question.scale?.[0] || 1}
                      onChange={(e) => handleUpdateQuestion(question.id, 'scale', [parseInt(e.target.value), question.scale?.[1] || 10])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scale Max</label>
                    <input
                      type="number"
                      value={question.scale?.[1] || 10}
                      onChange={(e) => handleUpdateQuestion(question.id, 'scale', [question.scale?.[0] || 1, parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => handleUpdateQuestion(question.id, 'required', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">Required question</label>
              </div>
            </Card>
          ))}

          {editingQuestions.length === 0 && (
            <Card className="text-center py-12">
              <SafeIcon icon={FiType} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
              <p className="text-gray-600 mb-4">Add your first question to get started.</p>
              <Button
                variant="primary"
                icon={<SafeIcon icon={FiPlus} />}
                onClick={handleAddQuestion}
              >
                Add First Question
              </Button>
            </Card>
          )}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Form Builder</h1>
          <p className="text-gray-600">
            Create and manage custom forms for focus groups, surveys, and participant profiles
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={() => setShowCreateModal(true)}
          >
            Create New Form
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiDatabase} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{forms.length}</div>
          <div className="text-gray-600 text-sm">Total Forms</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheckSquare} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {forms.filter(f => f.status === 'active').length}
          </div>
          <div className="text-gray-600 text-sm">Active Forms</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiType} className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {forms.reduce((sum, form) => sum + form.questions.length, 0)}
          </div>
          <div className="text-gray-600 text-sm">Total Questions</div>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCircle} className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {forms.reduce((sum, form) => sum + form.responses, 0).toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm">Total Responses</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredForms.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{form.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{form.description}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant={getCategoryBadgeVariant(form.category)} size="sm">
                      {form.category}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(form.status)} size="sm">
                      {form.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{form.questions.length}</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{form.responses.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Responses</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <div>Created: {new Date(form.createdAt).toLocaleDateString()}</div>
                <div>Modified: {new Date(form.lastModified).toLocaleDateString()}</div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiEye} />}
                    onClick={() => handleViewQuestions(form)}
                    title="View/Edit Questions"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiEdit2} />}
                    onClick={() => handleEditForm(form)}
                    title="Edit Form"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<SafeIcon icon={FiCopy} />}
                    onClick={() => handleDuplicateForm(form)}
                    title="Duplicate Form"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<SafeIcon icon={FiTrash2} />}
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteForm(form.id)}
                  title="Delete Form"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <Card className="text-center py-12">
          <SafeIcon icon={FiDatabase} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first form.</p>
          <Button
            variant="primary"
            icon={<SafeIcon icon={FiPlus} />}
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Form
          </Button>
        </Card>
      )}

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Form</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
                  <input
                    type="text"
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter form name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newForm.description}
                    onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                    placeholder="Describe the purpose of this form"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newForm.status}
                    onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateForm}
                  icon={<SafeIcon icon={FiSave} />}
                >
                  Create Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditModal && editingForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Form</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
                  <input
                    type="text"
                    value={editingForm.name}
                    onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingForm.description}
                    onChange={(e) => setEditingForm({ ...editingForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingForm.category}
                    onChange={(e) => setEditingForm({ ...editingForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingForm.status}
                    onChange={(e) => setEditingForm({ ...editingForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdateForm}
                  icon={<SafeIcon icon={FiSave} />}
                >
                  Update Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminForms;