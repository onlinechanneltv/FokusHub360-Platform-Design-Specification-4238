// Add the pages menu item to the navigation items array
const navigationItems = [
  // ... existing items ...
  {
    label: 'Pages',
    icon: FiFile,
    href: '/admin/pages',
    active: location.pathname === '/admin/pages'
  },
  // ... other items ...
];