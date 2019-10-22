import React from 'react';
// import Dashboard from '../views/dashboard';
const Dashboard = React.lazy(() => import('../Pages/dashboard'));

export default {
    authRoutes: [
        {name: "Dashboard", path:"/dashboard", component: Dashboard, exact: true },
    ],
    anonymousRoutes: [

    ],
    mutualRoutes: [

    ]
}