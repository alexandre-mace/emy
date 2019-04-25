import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardFoodstuffAwaiting from "../components/dashboard/DashboardFoodstuffAwaiting";
import DashboardFoodstuffGiven from "../components/dashboard/DashboardFoodstuffGiven";
import DashboardFoodstuffReceived from "../components/dashboard/DashboardFoodstuffReceived";
import {PrivateRoute} from "../components/login/PrivateRoute";

export default [
    <PrivateRoute path="/dashboard" component={Dashboard} exact key="dashboard"/>,
    <PrivateRoute path="/dashboard/foodstuffs-awaiting" component={DashboardFoodstuffAwaiting} exact key="dashboard-foodstuff-awaiting"/>,
    <PrivateRoute path="/dashboard/foodstuffs-given" component={DashboardFoodstuffGiven} exact key="dashboardfoodstuff-given"/>,
    <PrivateRoute path="/dashboard/foodstuffs-received" component={DashboardFoodstuffReceived} exact key="dashboard-foodstuff-received"/>
];
