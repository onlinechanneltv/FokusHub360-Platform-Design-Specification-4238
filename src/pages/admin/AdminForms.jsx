import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiDatabase } = FiIcons;

const AdminForms = () => {
  return (
    <AdminPlaceholder 
      title="Form Builder" 
      icon={FiDatabase}
      description="Create and manage custom forms for focus groups, surveys, and participant profiles."
    />
  );
};

export default AdminForms;