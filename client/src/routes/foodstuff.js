import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/foodstuff/';

export default [
  <Route path="/food_stuffs/create" component={Create} exact key="create" />,
  <Route path="/food_stuffs/edit/:id" component={Update} exact key="update" />,
  <Route path="/food_stuffs/show/:id" component={Show} exact key="show" />,
  <Route path="/food_stuffs/" component={List} exact strict key="list" />,
  <Route path="/food_stuffs/:page" component={List} exact strict key="page" />
];
