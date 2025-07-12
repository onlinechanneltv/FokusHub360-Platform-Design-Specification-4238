import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const { 
  FiPlay, FiUsers, FiBarChart3, FiBrain, FiZap, FiShield, 
  FiCheck, FiStar, FiArrowRight, FiTarget, FiTrendingUp,
  FiClock, FiGlobe, FiAward, FiMessageSquare
} = FiIcons;

const Landing = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const features = [
    {
      icon: FiBrain,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match your content with the perfect participants based on 100+ profile data points.'
    },
    {
      icon: FiZap,
      title: 'Instant Automation',
      description: 'Fully automated workflow from participant invitation to report generation in 24-72 hours.'
    },
    {
      icon: FiBarChart3,
      title: 'Smart Analytics',
      description: 'AI-generated insights, sentiment analysis, heatmaps, and keyword clouds in beautiful reports.'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Bank-level security with watermarking, secure storage, and comprehensive privacy controls.'
    },
    {
      icon: FiUsers,
      title: 'Global Participant Pool',
      description: 'Access to verified participants worldwide with detailed demographic and psychographic profiles.'
    },
    {
      icon: FiClock,
      title: 'Real-time Monitoring',
      description: 'Live dashboards to track participation, engagement, and preliminary results as they come in.'
    }
  ];

  const useCases = [
    { icon: FiPlay, title: 'Movie Trailers', description: 'Test audience reactions to trailers, teasers, and promotional content' },
    { icon: FiTarget, title: 'App/Web Design', description: 'Validate UI/UX designs and user experience flows' },
    { icon: FiAward, title: 'Brand Assets', description: 'Test logos, posters, packaging, and marketing materials' },
    { icon: FiMessageSquare, title: 'Content Strategy', description: 'Optimize messaging, copy, and content positioning' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'Netflix',
      content: 'FokusHub360 revolutionized our trailer testing process. The AI matching is incredibly accurate, and we get actionable insights in hours, not weeks.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Manager',
      company: 'Spotify',
      content: 'The depth of participant profiling is amazing. We can test with exactly the demographic we need and the reports are production-ready.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Creative Director',
      company: 'Airbnb',
      content: 'Best investment we made this year. The platform pays for itself with just one campaign. The automation saves us countless hours.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 299,
      participants: '10-25',
      features: [
        'Basic AI matching',
        'Standard report',
        'Email support',
        '48-72h delivery',
        'Basic analytics'
      ]
    },
    {
      name: 'Premium',
      price: 599,
      participants: '25-100',
      features: [
        'Advanced AI matching',
        'Comprehensive reports',
        'Priority support',
        '24-48h delivery',
        'Advanced analytics',
        'Live monitoring',
        'Custom questions'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 1299,
      participants: '100-1000+',
      features: [
        'Premium AI matching',
        'White-label reports',
        'Dedicated manager',
        '12-24h delivery',
        'Full analytics suite',
        'Real-time insights',
        'API access',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6">
                AI-Powered Market Research Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6">
                Get Market Feedback
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                  In 24 Hours
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Upload your content, target your audience, and receive AI-powered insights from verified participants. 
                Perfect for movies, apps, designs, and marketing materials.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="xl" 
                variant="primary"
                icon={<SafeIcon icon={FiPlay} />}
                className="shadow-glow"
              >
                <Link to="/register">Create Focus Group</Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                icon={<SafeIcon icon={FiUsers} />}
              >
                <Link to="/register?type=participant">Join as Participant</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                <div className="text-gray-600">Verified Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">2.5K+</div>
                <div className="text-gray-600">Campaigns Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">24hrs</div>
                <div className="text-gray-600">Average Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with human insights to deliver 
              the most accurate and actionable market research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
                    <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Perfect for Any Content
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Hollywood studios to startup founders, get feedback on any digital content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={useCase.icon} className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {useCase.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              How FokusHub360 Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to get professional market research insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload Content', description: 'Upload your videos, images, designs, or links securely to our platform.' },
              { step: '02', title: 'Set Target Audience', description: 'Use our AI to match with perfect participants based on 100+ profile criteria.' },
              { step: '03', title: 'Automated Matching', description: 'Our AI instantly finds and invites the most relevant participants.' },
              { step: '04', title: 'Get Insights', description: 'Receive comprehensive reports with AI analysis in 24-72 hours.' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what top companies are saying about FokusHub360.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your research needs. No hidden fees, no long-term contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className={`h-full text-center ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                  {plan.popular && (
                    <Badge variant="primary" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      ${plan.price}
                    </div>
                    <div className="text-gray-600">{plan.participants} participants</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    size="lg" 
                    className="w-full"
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Transform Your Market Research?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of companies using FokusHub360 to make data-driven decisions faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-gray-50"
                icon={<SafeIcon icon={FiArrowRight} />}
                iconPosition="right"
              >
                <Link to="/register">Start Your First Campaign</Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;