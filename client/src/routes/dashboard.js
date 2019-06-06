import React from 'react';
import ToConfirmDashboard from "../components/dashboard/toconfirm/ToConfirmDashboard.jsx";
import {PrivateRoute} from "../components/login/PrivateRoute.jsx";
import ToManageDashboard from "../components/dashboard/tomanage/ToManageDashboard.jsx";
import InProgressDashboard from "../components/dashboard/inprogress/InProgressDashboard.jsx";
import AwaitingDashboard from "../components/dashboard/awaiting/AwaitingDashboard.jsx";
import GivenAndReceivedDashboard from "../components/dashboard/givenandreceived/GivenAndReceivedDashboard";

export default [
    <PrivateRoute path="/tableau-de-bord/produits-donnes-et-recus" component={GivenAndReceivedDashboard} exact key="dashboard-given-and-received"/>,
    <PrivateRoute path="/tableau-de-bord/produits-en-cours" component={InProgressDashboard} exact key="dashboard-foodstuff-in-progress"/>,
    <PrivateRoute path="/tableau-de-bord/produits-en-attente" component={AwaitingDashboard} exact key="dashboard-foodstuff-awaiting"/>,
    <PrivateRoute path="/tableau-de-bord/produits-a-confirmer" component={ToConfirmDashboard} exact key="dashboard-foodstuff-to-confirm"/>,
    <PrivateRoute path="/tableau-de-bord/gerer-vos-produits" component={ToManageDashboard} exact key="dashboard-foodstuff-to-manage"/>,
];
