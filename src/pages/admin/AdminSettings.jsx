import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiSettings } = FiIcons;

const AdminSettings = () => {
  return (
    <AdminPlaceholder 
      title="System Settings" 
      icon={FiSettings}
      description="Configure global system settings, application behavior, and platform defaults."
    />
  );
};

export default AdminSettings;