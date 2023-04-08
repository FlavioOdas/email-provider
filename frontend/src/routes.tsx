import { BrowserRouter, Redirect, Route } from "react-router-dom";

import PageWrapper from "./components/PageWrapper";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/inbox" />
      </Route>
      <Route path="/inbox" exact component={() => <PageWrapper />} />
    </BrowserRouter>
  );
};

export default Routes;
