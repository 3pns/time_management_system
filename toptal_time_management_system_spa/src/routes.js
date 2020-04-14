import React from 'react';

const Users = React.lazy(() => import('./containers/Users'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard' },
  { path: '/users', name: 'Users' },
  { path: '/time_entries', name: 'Time Entries' },
  { path: '/invitations', name: 'Invitations' },
  { path: '/settings', exact: true, name: 'Settings' },
];

export default routes;
