import React from 'react';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));
const Users = React.lazy(() => import('./containers/Users'));

//const User = React.lazy(() => import('./views/Users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard' },
  { path: '/users', name: 'Users' },
  { path: '/time_entries', name: 'Time Entries' },
  { path: '/settings', exact: true, name: 'Settings' },
];
//   { path: '/users/:id', exact: true, name: 'User Details', component: User },

export default routes;
