import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart2 } = FiIcons;

const AdminAnalytics = () => {
  return (
    <AdminPlaceholder 
      title="Analytics Dashboard" 
      icon={FiBarChart2}
      description="Access comprehensive platform analytics, usage statistics, and performance metrics."
    />
  );
};

export default AdminAnalytics;