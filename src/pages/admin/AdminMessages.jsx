import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare } = FiIcons;

const AdminMessages = () => {
  return (
    <AdminPlaceholder 
      title="Message Center" 
      icon={FiMessageSquare}
      description="Manage platform communications, notifications, and user messaging systems."
    />
  );
};

export default AdminMessages;