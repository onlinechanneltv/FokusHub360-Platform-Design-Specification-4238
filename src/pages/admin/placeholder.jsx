import React from 'react';
import AdminLayout from './AdminLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiTool, FiAlertTriangle } = FiIcons;

// This is a placeholder component used for admin pages that are still under development
const AdminPlaceholder = ({ title, icon = FiSettings, description }) => {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Card className="max-w-lg text-center p-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={icon} className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 mb-6">
            {description || "This section is currently under development. Check back soon for updates."}
          </p>
          <div className="flex justify-center">
            <Button variant="outline" icon={<SafeIcon icon={FiTool} />}>
              Request Priority Development
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPlaceholder;