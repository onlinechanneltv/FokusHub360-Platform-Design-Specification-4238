import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiLock } = FiIcons;

const AdminPermissions = () => {
  return (
    <AdminPlaceholder 
      title="Permission Management" 
      icon={FiLock}
      description="Configure role-based access control, custom permissions, and security policies."
    />
  );
};

export default AdminPermissions;