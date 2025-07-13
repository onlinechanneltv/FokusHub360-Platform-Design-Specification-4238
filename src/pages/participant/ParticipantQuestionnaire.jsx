import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import toast from 'react-hot-toast';

const { FiPlay, FiCheck, FiArrowLeft, FiArrowRight } = FiIcons;

const ParticipantQuestionnaire = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'text',
      question: 'What was your first impression of the trailer?',
      required: true
    },
    {
      id: 2,
      type: 'rating',
      question: 'How would you rate the excitement level of this trailer?',
      options: [1, 2, 3, 4, 5],
      labels: ['Not exciting', 'Somewhat exciting', 'Moderately exciting', 'Very exciting', 'Extremely exciting'],
      required: true
    },
    {
      id: 3,
      type: 'multiple_choice',
      question: 'Would you watch this movie in theaters?',
      options: ['Definitely yes', 'Probably yes', 'Maybe', 'Probably no', 'Definitely no'],
      required: true
    },
    {
      id: 4,
      type: 'multiple_choice',
      question: 'What genre does this feel like to you?',
      options: ['Action', 'Thriller', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'],
      required: false
    },
    {
      id: 5,
      type: 'text',
      question: 'Any suggestions for improvement?',
      required: false
    }
  ];

  const handleResponseChange = (value) => {
    setResponses(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    const current = questions[currentQuestion];
    if (current.required && !responses[current.id]) {
      toast.error('Please answer this required question');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const current = questions[currentQuestion];
    if (current.required && !responses[current.id]) {
      toast.error('Please answer this required question');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you! Your responses have been submitted.');
      navigate('/participant/completion/' + groupId);
    }, 2000);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const value = responses[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <textarea
            value={value}
            onChange={(e) => handleResponseChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows="4"
            placeholder="Share your thoughts..."
          />
        );

      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {question.options.map((rating, index) => (
                <button
                  key={rating}
                  onClick={() => handleResponseChange(rating)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    value === rating
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{question.labels[0]}</span>
              <span>{question.labels[question.labels.length - 1]}</span>
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options.map(option => (
              <label key={option} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/participant')}
            icon={<SafeIcon icon={FiArrowLeft} />}
            className="mb-4"
          >
            Exit Questionnaire
          </Button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiPlay} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Focus Group Questionnaire</h1>
          <p className="text-gray-600">Movie Trailer Feedback - Action Thriller</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content Preview (only for first question) */}
        {currentQuestion === 0 && (
          <Card className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Watch the Content First</h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <SafeIcon icon={FiPlay} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Action Thriller Movie Trailer</p>
              <Button variant="primary" icon={<SafeIcon icon={FiPlay} />}>
                Play Video
              </Button>
            </div>
          </Card>
        )}

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {questions[currentQuestion].question}
                {questions[currentQuestion].required && <span className="text-red-500 ml-1">*</span>}
              </h2>
            </div>

            <div className="mb-8">
              {renderQuestion()}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                icon={<SafeIcon icon={FiArrowLeft} />}
              >
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  icon={<SafeIcon icon={FiCheck} />}
                  iconPosition="right"
                >
                  Submit Responses
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  icon={<SafeIcon icon={FiArrowRight} />}
                  iconPosition="right"
                >
                  Next
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ParticipantQuestionnaire;