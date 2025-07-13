import React, { useState } from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiGlobe, FiSave, FiRefreshCw, FiSettings, FiKey, FiDatabase, FiCloud, FiShield, FiMail, FiDollarSign, FiUsers, FiActivity } = FiIcons;

const AdminConfig = () => {
  const [activeSection, setActiveSection] = useState('platform');
  const [config, setConfig] = useState({
    platform: {
      platformName: 'FokusHub360',
      platformDescription: 'AI-Powered Virtual Focus Groups',
      defaultLanguage: 'en',
      timezone: 'UTC',
      maintenanceMode: false,
      debugMode: false,
      apiVersion: 'v1',
      maxFileSize: '50MB',
      allowedFileTypes: 'jpg,png,pdf,mp4,mov'
    },
    integrations: {
      googleAnalytics: '',
      facebookPixel: '',
      mixpanel: '',
      intercom: '',
      zendesk: '',
      slack: '',
      microsoftTeams: '',
      zapier: true
    },
    ai: {
      openaiApiKey: '',
      anthropicApiKey: '',
      gptModel: 'gpt-4',
      maxTokens: 4000,
      temperature: 0.7,
      enableAutoMatching: true,
      enableSentimentAnalysis: true,
      enableAutoReports: true
    },
    performance: {
      cacheEnabled: true,
      cacheDuration: '24h',
      cdnEnabled: true,
      compressionEnabled: true,
      rateLimitRequests: 1000,
      rateLimitWindow: '1h',
      backgroundJobsEnabled: true
    }
  });

  const sections = [
    { id: 'platform', label: 'Platform Settings', icon: FiGlobe },
    { id: 'integrations', label: 'Integrations', icon: FiSettings },
    { id: 'ai', label: 'AI Configuration', icon: FiActivity },
    { id: 'performance', label: 'Performance', icon: FiDatabase }
  ];

  const handleInputChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save configuration logic here
    toast.success('Configuration saved successfully');
    console.log('Saving configuration:', config);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      toast.success('Configuration reset to defaults');
    }
  };

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform Name
          </label>
          <input
            type="text"
            value={config.platform.platformName}
            onChange={(e) => handleInputChange('platform', 'platformName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Version
          </label>
          <select
            value={config.platform.apiVersion}
            onChange={(e) => handleInputChange('platform', 'apiVersion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="v1">v1 (Current)</option>
            <option value="v2">v2 (Beta)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Platform Description
        </label>
        <textarea
          value={config.platform.platformDescription}
          onChange={(e) => handleInputChange('platform', 'platformDescription', e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Language
          </label>
          <select
            value={config.platform.defaultLanguage}
            onChange={(e) => handleInputChange('platform', 'defaultLanguage', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={config.platform.timezone}
            onChange={(e) => handleInputChange('platform', 'timezone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">GMT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max File Size
          </label>
          <select
            value={config.platform.maxFileSize}
            onChange={(e) => handleInputChange('platform', 'maxFileSize', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="10MB">10MB</option>
            <option value="50MB">50MB</option>
            <option value="100MB">100MB</option>
            <option value="500MB">500MB</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allowed File Types
        </label>
        <input
          type="text"
          value={config.platform.allowedFileTypes}
          onChange={(e) => handleInputChange('platform', 'allowedFileTypes', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="jpg,png,pdf,mp4,mov"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
            <p className="text-sm text-gray-500">Put the platform in maintenance mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.platform.maintenanceMode}
              onChange={(e) => handleInputChange('platform', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Debug Mode</h3>
            <p className="text-sm text-gray-500">Enable detailed logging and error reporting</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.platform.debugMode}
              onChange={(e) => handleInputChange('platform', 'debugMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Analytics ID
          </label>
          <input
            type="text"
            value={config.integrations.googleAnalytics}
            onChange={(e) => handleInputChange('integrations', 'googleAnalytics', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="GA-XXXXXXXXX-X"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facebook Pixel ID
          </label>
          <input
            type="text"
            value={config.integrations.facebookPixel}
            onChange={(e) => handleInputChange('integrations', 'facebookPixel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="123456789012345"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mixpanel Project Token
          </label>
          <input
            type="text"
            value={config.integrations.mixpanel}
            onChange={(e) => handleInputChange('integrations', 'mixpanel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="your_mixpanel_token"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intercom App ID
          </label>
          <input
            type="text"
            value={config.integrations.intercom}
            onChange={(e) => handleInputChange('integrations', 'intercom', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="your_app_id"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slack Webhook URL
          </label>
          <input
            type="text"
            value={config.integrations.slack}
            onChange={(e) => handleInputChange('integrations', 'slack', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://hooks.slack.com/services/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Microsoft Teams Webhook
          </label>
          <input
            type="text"
            value={config.integrations.microsoftTeams}
            onChange={(e) => handleInputChange('integrations', 'microsoftTeams', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://outlook.office.com/webhook/..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Zapier Integration</h3>
          <p className="text-sm text-gray-500">Enable Zapier webhook support</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.integrations.zapier}
            onChange={(e) => handleInputChange('integrations', 'zapier', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={config.ai.openaiApiKey}
            onChange={(e) => handleInputChange('ai', 'openaiApiKey', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="sk-..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anthropic API Key
          </label>
          <input
            type="password"
            value={config.ai.anthropicApiKey}
            onChange={(e) => handleInputChange('ai', 'anthropicApiKey', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="sk-ant-..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPT Model
          </label>
          <select
            value={config.ai.gptModel}
            onChange={(e) => handleInputChange('ai', 'gptModel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tokens
          </label>
          <input
            type="number"
            value={config.ai.maxTokens}
            onChange={(e) => handleInputChange('ai', 'maxTokens', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1000"
            max="8000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature
          </label>
          <input
            type="number"
            value={config.ai.temperature}
            onChange={(e) => handleInputChange('ai', 'temperature', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Auto Participant Matching</h3>
            <p className="text-sm text-gray-500">Use AI to automatically match participants to focus groups</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.ai.enableAutoMatching}
              onChange={(e) => handleInputChange('ai', 'enableAutoMatching', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Sentiment Analysis</h3>
            <p className="text-sm text-gray-500">Analyze participant responses for sentiment and emotion</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.ai.enableSentimentAnalysis}
              onChange={(e) => handleInputChange('ai', 'enableSentimentAnalysis', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Auto Report Generation</h3>
            <p className="text-sm text-gray-500">Generate comprehensive reports automatically using AI</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.ai.enableAutoReports}
              onChange={(e) => handleInputChange('ai', 'enableAutoReports', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cache Duration
          </label>
          <select
            value={config.performance.cacheDuration}
            onChange={(e) => handleInputChange('performance', 'cacheDuration', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="1h">1 Hour</option>
            <option value="12h">12 Hours</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate Limit (requests)
          </label>
          <input
            type="number"
            value={config.performance.rateLimitRequests}
            onChange={(e) => handleInputChange('performance', 'rateLimitRequests', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate Limit Window
          </label>
          <select
            value={config.performance.rateLimitWindow}
            onChange={(e) => handleInputChange('performance', 'rateLimitWindow', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="1m">1 Minute</option>
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Enable Caching</h3>
            <p className="text-sm text-gray-500">Cache frequently accessed data for better performance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.performance.cacheEnabled}
              onChange={(e) => handleInputChange('performance', 'cacheEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">CDN Enabled</h3>
            <p className="text-sm text-gray-500">Use Content Delivery Network for static assets</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.performance.cdnEnabled}
              onChange={(e) => handleInputChange('performance', 'cdnEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Compression Enabled</h3>
            <p className="text-sm text-gray-500">Compress responses to reduce bandwidth usage</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.performance.compressionEnabled}
              onChange={(e) => handleInputChange('performance', 'compressionEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Background Jobs</h3>
            <p className="text-sm text-gray-500">Enable background job processing for heavy tasks</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.performance.backgroundJobsEnabled}
              onChange={(e) => handleInputChange('performance', 'backgroundJobsEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'platform':
        return renderPlatformSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'ai':
        return renderAISettings();
      case 'performance':
        return renderPerformanceSettings();
      default:
        return renderPlatformSettings();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Global Configuration</h1>
        <p className="text-gray-600">
          Manage global platform configuration, integrations, and environment settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Configuration Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={section.icon} className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Configuration Content */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {sections.find(s => s.id === activeSection)?.label} Configuration
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  icon={<SafeIcon icon={FiRefreshCw} />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  icon={<SafeIcon icon={FiSave} />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
            {renderActiveSection()}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminConfig;