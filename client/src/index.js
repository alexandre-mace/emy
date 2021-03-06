import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';

// Import your reducers and routes here
// import reducers
import image from './reducers/image/';
import foodstuff from './reducers/foodstuff/';

//import routes
import foodstuffRoutes from './routes/foodstuff';
import imageRoutes from './routes/image';
import dashboardRoutes from './routes/dashboard';
import partnerRoutes from './routes/partners';
import helpEmyRoutes from './routes/helpEmy';
import whoIsEmyRoutes from './routes/who-is-emy';
import signinRoutes from './routes/signin';
import welcomeRoutes from './routes/welcome';
import donorRoutes from './routes/donors';

import List from './components/foodstuff/List.jsx';
import Layout from "./components/block/Layout";

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    foodstuff,
    image
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route path="/" component={List} strict={true} exact={true}/>
                    { foodstuffRoutes }
                    { imageRoutes }
                    { dashboardRoutes }
                    { partnerRoutes }
                    { helpEmyRoutes }
                    { whoIsEmyRoutes }
                    { signinRoutes }
                    { donorRoutes }
                    { welcomeRoutes }
                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
