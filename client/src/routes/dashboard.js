import React from 'react';
import DashboardFoodstuffToConfirm from "../components/dashboard/DashboardFoodstuffToConfirm.jsx";
import {PrivateRoute} from "../components/login/PrivateRoute.jsx";
import DashboardFoodstuffToManage from "../components/dashboard/DashboardManageFoodStuff.jsx";
import DashboardFoodstuffInProgress from "../components/dashboard/DashboardFoodstuffInProgress.jsx";
import DashboardFoodstuffAwaiting from "../components/dashboard/DashboardFoodstuffAwaiting.jsx";
import DashboardGivenAndReceived from "../components/dashboard/DashboardGivenAndReceived";

export default [
    <PrivateRoute path="/tableau-de-bord/produits-donnes-et-recus" component={DashboardGivenAndReceived} exact key="dashboard"/>,
    <PrivateRoute path="/tableau-de-bord/produits-en-cours" component={DashboardFoodstuffInProgress} exact key="dashboard-foodstuff-in-progress"/>,
    <PrivateRoute path="/tableau-de-bord/produits-en-attente" component={DashboardFoodstuffAwaiting} exact key="dashboard-foodstuff-awaiting"/>,
    <PrivateRoute path="/tableau-de-bord/produits-a-confirmer" component={DashboardFoodstuffToConfirm} exact key="dashboard-foodstuff-to-confirm"/>,
    <PrivateRoute path="/tableau-de-bord/gerer-vos-produits" component={DashboardFoodstuffToManage} exact key="dashboard-foodstuff-to-manage"/>,
];
