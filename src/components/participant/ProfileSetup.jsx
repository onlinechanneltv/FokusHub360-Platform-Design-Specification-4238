import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { participantQuestions } from '../../data/participantQuestions';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import useProfileStore from '../../store/profileStore';

const { FiChevronLeft, FiChevronRight, FiCheck, FiUser } = FiIcons;

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { user } = useAuthStore();
  const { 
    saveProfileDetailsBatch, 
    profileDetails,
    loadProfileDetails,
    completedCategories,
    loading 
  } = useProfileStore();
  const navigate = useNavigate();

  const categories = Object.keys(participantQuestions);
  const currentCategory = categories[currentStep];
  const currentQuestions = participantQuestions[currentCategory];

  useEffect(() => {
    if (user?.id) {
      loadProfileDetails(user.id);
    }
  }, [user, loadProfileDetails]);

  useEffect(() => {
    // Pre-fill answers from loaded profile details
    if (profileDetails && Object.keys(profileDetails).length > 0) {
      const newAnswers = { ...answers };
      
      // Merge all category answers
      Object.entries(profileDetails).forEach(([category, categoryAnswers]) => {
        Object.entries(categoryAnswers).forEach(([questionId, answer]) => {
          newAnswers[questionId] = answer;
        });
      });
      
      setAnswers(newAnswers);
    }
  }, [profileDetails]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = async () => {
    // Save answers for current category before moving to next
    const categoryQuestions = currentQuestions.questions;
    const categoryAnswers = {};
    
    // Collect answers for current category questions
    categoryQuestions.forEach(question => {
      if (answers[question.id] !== undefined) {
        categoryAnswers[question.id] = answers[question.id];
      }
    });
    
    // Check if required questions are answered
    const missingRequired = categoryQuestions
      .filter(q => q.required && answers[q.id] === undefined);
    
    if (missingRequired.length > 0) {
      toast.error(`Please answer all required questions before proceeding.`);
      return;
    }
    
    // Save category answers to database
    if (Object.keys(categoryAnswers).length > 0) {
      try {
        await saveProfileDetailsBatch(user.id, currentCategory, categoryAnswers);
        toast.success(`${currentCategory} information saved successfully!`);
      } catch (error) {
        toast.error('Failed to save your answers. Please try again.');
        console.error('Error saving profile details:', error);
        return;
      }
    }
    
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Final category save
    const categoryQuestions = currentQuestions.questions;
    const categoryAnswers = {};
    
    categoryQuestions.forEach(question => {
      if (answers[question.id] !== undefined) {
        categoryAnswers[question.id] = answers[question.id];
      }
    });
    
    if (Object.keys(categoryAnswers).length > 0) {
      try {
        await saveProfileDetailsBatch(user.id, currentCategory, categoryAnswers);
      } catch (error) {
        toast.error('Failed to save your profile. Please try again.');
        console.error('Error saving profile details:', error);
        return;
      }
    }
    
    toast.success('Profile completed! You can now join focus groups.');
    navigate('/participant');
  };

  const renderQuestion = (question) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder={`Enter ${question.label.toLowerCase()}`}
            required={question.required}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder={`Enter ${question.label.toLowerCase()}`}
            required={question.required}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required={question.required}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows="4"
            placeholder={`Enter ${question.label.toLowerCase()}`}
            required={question.required}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required={question.required}
          >
            <option value="">Select {question.label.toLowerCase()}</option>
            {question.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      handleAnswerChange(question.id, [...currentValues, option]);
                    } else {
                      handleAnswerChange(question.id, currentValues.filter(v => v !== option));
                    }
                  }}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'scale':
        return (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.scale[0]}</span>
              <span>{question.scale[1]}</span>
            </div>
            <input
              type="range"
              min={question.scale[0]}
              max={question.scale[1]}
              value={value || question.scale[0]}
              onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-lg font-semibold text-primary-600">
              {value || question.scale[0]}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / categories.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUser} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us match you with the perfect focus groups</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {categories.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Current Category */}
        <motion.div
          key={currentCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentQuestions.title}
              </h2>
              <p className="text-gray-600">{currentQuestions.description}</p>
            </div>
            <div className="space-y-6">
              {currentQuestions.questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.label}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon={<SafeIcon icon={FiChevronLeft} />}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            loading={loading}
            icon={currentStep === categories.length - 1 ? <SafeIcon icon={FiCheck} /> : <SafeIcon icon={FiChevronRight} />}
            iconPosition="right"
          >
            {currentStep === categories.length - 1 ? 'Complete Profile' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;