import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/foodstuff/';

export default [
  <Route path="/produits/nouveau" component={Create} exact key="create" />,
  <Route path="/produits/modifier/:id" component={Update} exact key="update" />,
  <Route path="/produits/:id" component={Show} exact key="show" />,
  <Route path="/" component={List} exact strict key="list" />,
  <Route path="/produits/:page" component={List} exact strict key="page" />
];
