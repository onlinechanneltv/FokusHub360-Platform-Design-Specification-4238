import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiShield } = FiIcons;

const AdminSecurity = () => {
  return (
    <AdminPlaceholder 
      title="Security Reports" 
      icon={FiShield}
      description="Monitor platform security, view security reports, and manage security configurations."
    />
  );
};

export default AdminSecurity;