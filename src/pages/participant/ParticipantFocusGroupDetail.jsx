import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const {
  FiPlay,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiCheck,
  FiArrowLeft,
  FiStar,
  FiAlertTriangle,
  FiX,
  FiLoader,
  FiCalendar
} = FiIcons;

const ParticipantFocusGroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [responseStatus, setResponseStatus] = useState('pending'); // pending, accepted, rejected, expired
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });
  const [loading, setLoading] = useState(false);

  // Mock focus group data
  const focusGroup = {
    id: groupId,
    title: 'Movie Trailer Feedback - Action Thriller',
    client: 'Universal Studios',
    description:
      "We're testing audience reactions to our latest action thriller trailer. Your feedback will help us understand how to market this film to different demographics.",
    contentType: 'video',
    contentUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '15-20 minutes',
    reward: '$50',
    deadline: '2 days',
    participants: 45,
    targetParticipants: 50,
    matchScore: 95,
    responseDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    requirements: [
      'Age 18-35',
      'Enjoys action movies',
      'Watches movies in theaters',
      'Active on social media'
    ],
    questions: [
      'What was your first impression of the trailer?',
      'How would you rate the excitement level?',
      'Would you watch this movie in theaters?',
      'What genre does this feel like to you?',
      'Any suggestions for improvement?'
    ]
  };

  // Set up timer
  useEffect(() => {
    const deadline = new Date(focusGroup.responseDeadline);
    const now = new Date();
    let diff = deadline - now;

    if (diff <= 0) {
      setResponseStatus('expired');
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        clearInterval(timer);
        setResponseStatus('expired');
        toast.error("Time's up! You can no longer join this focus group.");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    setTimer(interval);

    return () => clearInterval(interval);
  }, [focusGroup.responseDeadline]);

  const handleAccept = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponseStatus('accepted');
      setLoading(false);
      toast.success('Successfully joined the focus group!');
      // Navigate to questionnaire or completion flow
      setTimeout(() => {
        navigate('/participant/questionnaire/' + groupId);
      }, 2000);
    }, 1500);
  };

  const handleReject = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponseStatus('rejected');
      setLoading(false);
      toast.success('You have declined this focus group.');
      // Navigate back to dashboard after a delay
      setTimeout(() => {
        navigate('/participant');
      }, 2000);
    }, 1500);
  };

  // Format time remaining in a readable format
  const formatTimeRemaining = () => {
    const { hours, minutes, seconds } = timeRemaining;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/participant')}
          icon={<SafeIcon icon={FiArrowLeft} />}
          className="mb-6"
        >
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiPlay} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="success" size="sm" className="mb-1">
                      {focusGroup.matchScore}% match
                    </Badge>
                    <h1 className="text-2xl font-bold text-gray-900">{focusGroup.title}</h1>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">by {focusGroup.client}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{focusGroup.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Content Preview</h2>
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <SafeIcon icon={FiPlay} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {responseStatus === 'accepted'
                        ? 'Video content is now available'
                        : 'Video content will be available after accepting'}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">What We'll Ask</h2>
                  <div className="space-y-2">
                    {focusGroup.questions.map((question, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{focusGroup.reward}</div>
                <p className="text-gray-600">Reward for completion</p>
              </div>

              {/* Response Timer */}
              {responseStatus === 'pending' && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-orange-700">
                      <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 mr-2" />
                      <span className="font-medium">Response Required</span>
                    </div>
                    <Badge variant="warning" size="sm">
                      {formatTimeRemaining()}
                    </Badge>
                  </div>
                  <p className="text-sm text-orange-600">
                    You must accept or decline this invitation within the time limit or you may receive a
                    warning.
                  </p>
                </div>
              )}

              {/* Status Message */}
              {responseStatus === 'accepted' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center text-green-700 mb-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 mr-2" />
                    <span className="font-medium">Accepted</span>
                  </div>
                  <p className="text-sm text-green-600">
                    You've joined this focus group! Redirecting to questionnaire...
                  </p>
                </motion.div>
              )}

              {responseStatus === 'rejected' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center text-gray-700 mb-2">
                    <SafeIcon icon={FiX} className="w-5 h-5 mr-2" />
                    <span className="font-medium">Declined</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You've declined this focus group. Returning to dashboard...
                  </p>
                </motion.div>
              )}

              {responseStatus === 'expired' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center text-red-700 mb-2">
                    <SafeIcon icon={FiClock} className="w-5 h-5 mr-2" />
                    <span className="font-medium">Expired</span>
                  </div>
                  <p className="text-sm text-red-600">
                    The response window for this focus group has expired. This may affect your participation
                    score.
                  </p>
                </motion.div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{focusGroup.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium text-orange-600">{focusGroup.deadline} left</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Participants:</span>
                  <span className="font-medium">
                    {focusGroup.participants}/{focusGroup.targetParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Match Score:</span>
                  <Badge variant="success" size="sm">
                    {focusGroup.matchScore}%
                  </Badge>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                <div className="space-y-2">
                  {focusGroup.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {responseStatus === 'pending' && (
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleAccept}
                    disabled={loading}
                    icon={loading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiCheck} />}
                  >
                    Accept Invitation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleReject}
                    disabled={loading}
                    icon={loading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiX} />}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </Card>

            <Card className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">About the Client</h3>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div>
                  <div className="font-medium text-gray-900">{focusGroup.client}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon key={i} icon={FiStar} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">4.9 rating</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Major entertainment studio known for high-quality productions and fair compensation for
                participants.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantFocusGroupDetail;