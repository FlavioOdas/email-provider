import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import MainEmailPage from './components/MainPage';
import { Constants } from './constants';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/inbox" />
      </Route>
      <Route
        path="/inbox"
        exact
        component={() => <MainEmailPage mailboxRoute={Constants.INBOX_ROUTE} />}
      />
      <Route
        path="/sent"
        exact
        component={() => <MainEmailPage mailboxRoute={Constants.SENT_ROUTE} />}
      />
    </BrowserRouter>
  );
};

export default Routes;
