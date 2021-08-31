import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'

import { signup } from '../../reduxStore/actions/auth.actions'

import "../login/login.css";
import "../login/login.scss";
import logoImg from "../login/assets/logo.svg";
import loginImg from "../login/assets/login.jpg";

const SignUp = () => {
  const [ firstName, setFirstName ]     = useState("")
  const [ lastName, setLastName ]       = useState("")
  const [ password, setPassword ]       = useState("")
  const [ contactNo, setContactNo ]     = useState("")
  const [ email, setEmail ]             = useState("")

  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNo
    }
    console.log(user)

    dispatch(signup(user))
  };

  const isSignedUp = useSelector(state => state.auth.isSignedUp)
  const loading = useSelector(state => state.auth.loading)

  if(isSignedUp) {
    return <Redirect to="/login" />
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
                  Create an account
                </p>

                {/* --------------------FORM-------------------- */}
                
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="form-control"
                      placeholder="FirstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>  

                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      name="lasttName"
                      id="lastName"
                      className="form-control"
                      placeholder="LastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>  
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="phone"
                      name="contactNo"
                      id="contactNo"
                      className="form-control"
                      placeholder="Contact No"
                      value={contactNo}
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      }}
                    />
                  </div>

                  <input
                    name="signin"
                    id="lsigninogin"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value={loading ? "Signing you up" :"Sign Up"}
                  />
                </form>
                <p>Have an account? 
                <NavLink to="/login">Log In</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
