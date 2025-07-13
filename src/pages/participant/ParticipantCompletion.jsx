import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const { FiCheck, FiDollarSign, FiStar, FiHome, FiShare, FiActivity } = FiIcons;

const ParticipantCompletion = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const completionData = {
    reward: '$50',
    processingTime: '3-5 business days',
    rating: 5,
    bonusEarned: true,
    nextRecommendations: [
      { title: 'Book Cover Design Feedback', reward: '$25', match: 92 },
      { title: 'Restaurant App UI Testing', reward: '$35', match: 88 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiCheck} className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Congratulations! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You've successfully completed the focus group questionnaire.
          </p>

          {/* Reward Card */}
          <Card className="mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You've Earned {completionData.reward}!
              </h2>
              <p className="text-gray-600 mb-4">
                Payment will be processed within {completionData.processingTime}
              </p>
              {completionData.bonusEarned && (
                <Badge variant="success" className="mb-4">
                  🌟 Quality Bonus Earned!
                </Badge>
              )}
              <div className="flex items-center justify-center space-x-1 mb-4">
                <span className="text-sm text-gray-600 mr-2">Your rating:</span>
                {[...Array(5)].map((_, i) => (
                  <SafeIcon 
                    key={i} 
                    icon={FiStar} 
                    className={`w-5 h-5 ${i < completionData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div className="text-left space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <span className="text-sm font-medium">1</span>
                </div>
                <p className="text-gray-700">
                  Your payment will be processed and sent to your registered payment method.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <span className="text-sm font-medium">2</span>
                </div>
                <p className="text-gray-700">
                  You'll receive an email confirmation once the payment is processed.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                  <span className="text-sm font-medium">3</span>
                </div>
                <p className="text-gray-700">
                  Check out more focus groups that match your profile and earn more rewards!
                </p>
              </div>
            </div>
          </Card>

          {/* Recommended Groups */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {completionData.nextRecommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiActivity} className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{rec.title}</div>
                      <div className="text-green-600 font-medium">{rec.reward}</div>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">{rec.match}% match</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              icon={<SafeIcon icon={FiHome} />}
              onClick={() => navigate('/participant')}
            >
              Return to Dashboard
            </Button>
            <Button 
              variant="outline" 
              icon={<SafeIcon icon={FiShare} />}
            >
              Share Experience
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParticipantCompletion;