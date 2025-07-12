import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe } = FiIcons;

const AdminConfig = () => {
  return (
    <AdminPlaceholder 
      title="Global Configuration" 
      icon={FiGlobe}
      description="Manage global platform configuration, integrations, and environment settings."
    />
  );
};

export default AdminConfig;