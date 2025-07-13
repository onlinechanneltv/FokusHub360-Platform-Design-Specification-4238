import React, { useState } from 'react';
import Button from './Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { createDemoAccounts } from '../../utils/createDemoAccounts';
import toast from 'react-hot-toast';

const { FiUsers } = FiIcons;

const CreateDemoAccountsButton = () => {
  const [creating, setCreating] = useState(false);

  const handleCreateAccounts = async () => {
    setCreating(true);
    try {
      await createDemoAccounts();
      toast.success('Demo accounts created successfully! Check console for details.');
    } catch (error) {
      toast.error('Error creating demo accounts. Check console for details.');
      console.error('Error creating demo accounts:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Setup</h3>
      <p className="text-xs text-blue-700 mb-3">
        Click below to create demo accounts for testing all user roles.
      </p>
      <Button
        size="sm"
        variant="outline" 
        onClick={handleCreateAccounts}
        loading={creating}
        icon={<SafeIcon icon={FiUsers} />}
        className="text-blue-700 border-blue-300 hover:bg-blue-100"
      >
        Create Demo Accounts
      </Button>
    </div>
  );
};

export default CreateDemoAccountsButton;