import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import "./scss/style.scss";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Forgot = React.lazy(() => import("./views/authView/forgotPassword"));
const Verify = React.lazy(() => import("./views/authView/verifyOTP"));
const ResetPasswordFWD = React.lazy(() =>
  import("./views/authView/resetPasswordFWD")
);
// Private

// import SignUp from "./component/signUp/signUp";

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
            {/* <Route path="/signup" component={SignUp} /> */}
            {/* <PrivateRoute path="/" exact component={Dashboard} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/forgot-password" exact component={Forgot} />
            <Route path="/verify-otp" exact component={Verify} />
            <Route
              path="/reset-password-fwd-otp"
              exact
              component={ResetPasswordFWD}
            />
            <TheLayout>
              <Route path="/" component={Dashboard} />
            </TheLayout>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
