import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import useFocusGroupStore from '../../store/focusGroupStore';

const { FiCheck, FiPlus, FiX, FiDollarSign, FiUsers, FiCalendar, FiLink, FiList, FiTarget } = FiIcons;

const CreateFocusGroup = () => {
  const { user } = useAuthStore();
  const { createFocusGroup, loading } = useFocusGroupStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'video',
    contentUrl: '',
    targetParticipants: 25,
    startsAt: new Date().toISOString().split('T')[0],
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    rewardType: 'cash',
    rewardAmount: 50,
    rewardDetails: {},
    targetCriteria: {},
    questions: [
      { id: 1, text: 'What was your first impression?', type: 'text', required: true },
      { id: 2, text: 'How would you rate this content?', type: 'rating', required: true, options: [1, 2, 3, 4, 5] },
      { id: 3, text: 'What improvements would you suggest?', type: 'text', required: true }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleQuestionChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
  };

  const addQuestion = () => {
    const newId = formData.questions.length > 0 
      ? Math.max(...formData.questions.map(q => q.id)) + 1 
      : 1;
    
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: newId, text: '', type: 'text', required: true }
      ]
    }));
  };

  const removeQuestion = (id) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.title || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (step === 2) {
      if (!formData.contentUrl) {
        toast.error('Please provide content URL');
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.questions.some(q => !q.text)) {
      toast.error('Please fill in all question fields');
      return;
    }
    
    try {
      // Format questions for API
      const formattedQuestions = formData.questions.map(q => ({
        text: q.text,
        type: q.type,
        options: q.options,
        required: q.required
      }));
      
      const groupData = {
        ...formData,
        questions: formattedQuestions
      };
      
      const newGroup = await createFocusGroup(groupData);
      toast.success('Focus group created successfully!');
      navigate(`/focus-groups/${newGroup.id}`);
    } catch (error) {
      toast.error('Failed to create focus group');
      console.error('Error creating focus group:', error);
    }
  };

  const contentTypes = [
    { id: 'video', label: 'Video', description: 'Video content like trailers, ads, or presentations' },
    { id: 'image', label: 'Image', description: 'Images, designs, graphics, or photos' },
    { id: 'design', label: 'UI/UX Design', description: 'App interfaces, websites, or digital experiences' },
    { id: 'text', label: 'Text', description: 'Written content like copy, messaging, or scripts' },
    { id: 'prototype', label: 'Prototype', description: 'Interactive prototypes or mockups' }
  ];

  const questionTypes = [
    { id: 'text', label: 'Text Response' },
    { id: 'multiple_choice', label: 'Multiple Choice' },
    { id: 'rating', label: 'Rating Scale' },
    { id: 'scale', label: 'Numerical Scale' },
    { id: 'boolean', label: 'Yes/No' }
  ];

  const rewardTypes = [
    { id: 'cash', label: 'Cash Payment' },
    { id: 'gift_card', label: 'Gift Card' },
    { id: 'product', label: 'Product' },
    { id: 'points', label: 'Reward Points' }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Focus Group Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. Movie Trailer Feedback - Action Thriller"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe what you want feedback on and what you're looking to learn"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {contentTypes.map(type => (
                    <label
                      key={type.id}
                      className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        formData.contentType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="contentType"
                        value={type.id}
                        checked={formData.contentType === type.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                variant="primary"
                onClick={nextStep}
                icon={<SafeIcon icon={FiCheck} />}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Content & Targeting</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="contentUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Content URL <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <SafeIcon
                      icon={FiLink}
                      className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    />
                    <input
                      type="text"
                      id="contentUrl"
                      name="contentUrl"
                      value={formData.contentUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={`Enter URL for your ${formData.contentType}`}
                      required
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Provide a link to your content. For videos, use YouTube, Vimeo, or similar platforms.
                </p>
              </div>
              
              <div>
                <label htmlFor="targetParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Participants <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <SafeIcon
                      icon={FiUsers}
                      className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    />
                    <input
                      type="number"
                      id="targetParticipants"
                      name="targetParticipants"
                      value={formData.targetParticipants}
                      onChange={handleNumberChange}
                      min="10"
                      max="1000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startsAt" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <SafeIcon
                      icon={FiCalendar}
                      className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    />
                    <input
                      type="date"
                      id="startsAt"
                      name="startsAt"
                      value={formData.startsAt}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endsAt" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <SafeIcon
                      icon={FiCalendar}
                      className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    />
                    <input
                      type="date"
                      id="endsAt"
                      name="endsAt"
                      value={formData.endsAt}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Target Demographics (simplified) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Demographics (Optional)
                </label>
                <Card padding="sm" shadow="none" className="border border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Our AI will automatically match your focus group with the most suitable participants 
                    based on your content and questions. You can add specific demographic criteria later.
                  </p>
                </Card>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={nextStep}
                icon={<SafeIcon icon={FiCheck} />}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </Card>
        );
      
      case 3:
        return (
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Participant Rewards</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reward Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rewardTypes.map(type => (
                    <label
                      key={type.id}
                      className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        formData.rewardType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewardType"
                        value={type.id}
                        checked={formData.rewardType === type.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="font-medium text-gray-900">{type.label}</div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="rewardAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Reward Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <SafeIcon
                    icon={FiDollarSign}
                    className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                  />
                  <input
                    type="number"
                    id="rewardAmount"
                    name="rewardAmount"
                    value={formData.rewardAmount}
                    onChange={handleNumberChange}
                    min="5"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Recommended: $25-$50 for a 15-minute focus group. Higher rewards attract more participants.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={nextStep}
                icon={<SafeIcon icon={FiCheck} />}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </Card>
        );
      
      case 4:
        return (
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Questions</h3>
            
            <div className="space-y-6">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="primary">{`Question ${index + 1}`}</Badge>
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <SafeIcon icon={FiX} className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`question-${question.id}`}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Question Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`question-${question.id}`}
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your question"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        {questionTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${question.id}`}
                        checked={question.required}
                        onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`required-${question.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        Required question
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addQuestion}
                icon={<SafeIcon icon={FiPlus} />}
                className="w-full"
              >
                Add Question
              </Button>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={loading}
                icon={<SafeIcon icon={FiCheck} />}
                iconPosition="right"
              >
                Create Focus Group
              </Button>
            </div>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiTarget} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Focus Group</h1>
          <p className="text-gray-600">Get valuable feedback from targeted participants</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Basics' },
              { step: 2, label: 'Content' },
              { step: 3, label: 'Rewards' },
              { step: 4, label: 'Questions' }
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center"
                onClick={() => item.step < step && setStep(item.step)}
                style={{ cursor: item.step < step ? 'pointer' : 'default' }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step === item.step
                      ? 'bg-primary-600 text-white'
                      : step > item.step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > item.step ? <SafeIcon icon={FiCheck} /> : item.step}
                </div>
                <span
                  className={`text-sm ${
                    step === item.step ? 'text-primary-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <motion.div
              className="absolute top-0 left-0 h-1 bg-primary-600 rounded"
              initial={{ width: `${(step - 1) * 33.33}%` }}
              animate={{ width: `${(step - 1) * 33.33}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
};

export default CreateFocusGroup;