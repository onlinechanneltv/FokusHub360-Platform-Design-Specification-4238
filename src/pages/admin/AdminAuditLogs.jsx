import React from 'react';
import AdminPlaceholder from './placeholder';
import * as FiIcons from 'react-icons/fi';

const { FiClock } = FiIcons;

const AdminAuditLogs = () => {
  return (
    <AdminPlaceholder 
      title="Audit Logs" 
      icon={FiClock}
      description="View comprehensive system audit logs, user activities, and security events."
    />
  );
};

export default AdminAuditLogs;