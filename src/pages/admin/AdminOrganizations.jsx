import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiLayers } = FiIcons;

const AdminOrganizations = () => {
  return (
    <AdminPlaceholder 
      title="Organization Management" 
      icon={FiLayers}
      description="Manage client organizations, team structures, and organizational hierarchies."
    />
  );
};

export default AdminOrganizations;