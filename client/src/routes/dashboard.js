import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardFoodstuffToConfirm from "../components/dashboard/DashboardFoodstuffToConfirm";
import {PrivateRoute} from "../components/login/PrivateRoute";

export default [
    <PrivateRoute path="/dashboard" component={Dashboard} exact key="dashboard"/>,
    <PrivateRoute path="/dashboard/foodstuffs-to-confirm" component={DashboardFoodstuffToConfirm} exact key="dashboard-foodstuff-to-confirm"/>,
];
