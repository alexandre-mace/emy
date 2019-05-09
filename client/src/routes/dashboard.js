import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardFoodstuffToConfirm from "../components/dashboard/DashboardFoodstuffToConfirm";
import {PrivateRoute} from "../components/login/PrivateRoute";
import DashboardFoodstuffToManage from "../components/dashboard/DashboardManageFoodStuff";

export default [
    <PrivateRoute path="/dashboard" component={Dashboard} exact key="dashboard"/>,
    <PrivateRoute path="/dashboard/foodstuffs-to-confirm" component={DashboardFoodstuffToConfirm} exact key="dashboard-foodstuff-to-confirm"/>,
    <PrivateRoute path="/dashboard/foodstuffs-to-manage" component={DashboardFoodstuffToManage} exact key="dashboard-foodstuff-to-manage"/>,
];
