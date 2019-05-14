import React from 'react';
import Dashboard from '../components/dashboard/Dashboard.jsx';
import DashboardFoodstuffToConfirm from "../components/dashboard/DashboardFoodstuffToConfirm.jsx";
import {PrivateRoute} from "../components/login/PrivateRoute.jsx";
import DashboardFoodstuffToManage from "../components/dashboard/DashboardManageFoodStuff.jsx";

export default [
    <PrivateRoute path="/tableau-de-bord" component={Dashboard} exact key="dashboard"/>,
    <PrivateRoute path="/tableau-de-bord/produits-a-confirmer" component={DashboardFoodstuffToConfirm} exact key="dashboard-foodstuff-to-confirm"/>,
    <PrivateRoute path="/tableau-de-bord/gerer-vos-produits" component={DashboardFoodstuffToManage} exact key="dashboard-foodstuff-to-manage"/>,
];
