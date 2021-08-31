import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./scss/style.scss";
import Dashboard from "./views/dashboard/Dashboard";
// Private
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SignUp from "./component/signUp/signUp";

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./component/login/login"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            <TheLayout>
              <PrivateRoute path="/" component={Dashboard} />
            </TheLayout>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
