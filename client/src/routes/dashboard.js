import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';

export default [
    <Route path="/dashboard" component={Dashboard} exact key="dashboard"/>
];
