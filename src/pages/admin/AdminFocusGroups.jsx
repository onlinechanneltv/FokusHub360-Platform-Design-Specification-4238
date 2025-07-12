import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiActivity } = FiIcons;

const AdminFocusGroups = () => {
  return (
    <AdminPlaceholder 
      title="Focus Groups Management" 
      icon={FiActivity}
      description="Oversee all focus groups, monitor campaign status, and manage participant interactions."
    />
  );
};

export default AdminFocusGroups;