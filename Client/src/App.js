import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/index";
import HomePage from "./layout/HomeLayout";
import LoginPage from "./layout/LoginLayout";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => <LoginPage {...props} />} />
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
