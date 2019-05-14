import React from 'react';
import { Route } from 'react-router-dom';
import Donors from "../components/donors/Donors.jsx";

export default [
    <Route path="/les-contributeurs" component={Donors} exact key="donors"/>
];
