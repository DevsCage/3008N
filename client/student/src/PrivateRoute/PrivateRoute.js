import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  const log = true;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (log) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
    // <Route
    //   {...rest}
    //   component={(props) => {
    //     if (log) {
    //       return <Component {...props} />;
    //     } else {
    //       return <Redirect to="/login" />;
    //     }
    //   }}
    // />
  );
};

export default PrivateRoute;
