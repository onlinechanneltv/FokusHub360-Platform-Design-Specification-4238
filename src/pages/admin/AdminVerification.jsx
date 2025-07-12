import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiUserCheck } = FiIcons;

const AdminVerification = () => {
  return (
    <AdminPlaceholder 
      title="User Verification" 
      icon={FiUserCheck}
      description="Review and approve user verification requests and manage identity verification processes."
    />
  );
};

export default AdminVerification;