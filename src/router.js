import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import HomePage from './pages/homepage/HomePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/index" component={HomePage} />
        <Redirect exact from="/" to="/index" />
        </Switch>
    </Router>
  );
}

export default RouterConfig;
