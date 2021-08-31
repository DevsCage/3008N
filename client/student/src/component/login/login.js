import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import { login } from "../../reduxStore/actions/auth.actions";

import "./login.css";
import "./login.scss";
import logoImg from "./assets/logo_ssiey.jpg";
import loginImg from "./assets/login.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password,
    };
    console.log(user);

    dispatch(login(user));
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => state.auth.message);
  let token = localStorage.getItem("token");
  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={loginImg} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={logoImg} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">
                  Log in into your account
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Login ID"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only"></label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <p style={{ color: "red" }}>{message}</p>

                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value={loading ? "Logging In" : "Log In"}
                  />
                </form>
                <a href="/forgot-password" style={{ fontSize: "1.1rem" }}>
                  {" "}
                  Forgot password?
                </a>
                <p style={{ fontSize: "1.2rem" }}>
                  Don't have an account?
                  <NavLink to="/signup">Sign Up</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
