import React from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../components/login';

export default [
    <Route path="/login" component={LoginPage} exact key="login"/>
];
