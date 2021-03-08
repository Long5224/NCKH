import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomePage from './layout/HomeLayout'
import LoginPage from './layout/LoginLayout'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <HomePage {...props} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Redirect from="/" to="/home/index" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
