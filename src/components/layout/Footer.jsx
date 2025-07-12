import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-display font-bold text-xl">FokusHub360</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The premier AI-powered virtual focus group platform for market research. 
              Get instant insights from targeted participants with automated matching and reporting.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiGithub} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">How it Works</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors duration-200">Case Studies</Link></li>
              <li><Link to="/api" className="text-gray-300 hover:text-white transition-colors duration-200">API</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/security" className="text-gray-300 hover:text-white transition-colors duration-200">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FokusHub360. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>support@fokushub360.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;