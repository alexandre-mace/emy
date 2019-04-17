import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome';

export default [
    <Route path="/welcome" component={Welcome} exact key="welcome"/>
];
