import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./login.css";
import "./login.scss";

import { getStudents } from "../../reduxStore/actions/studentActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import forgotImg from "./forgot.png";
import logoImg from "./logo_ssiet.png";

import Spinner from "../../component/ui/spinner";
function ForgotPassword() {
  const [USN, setUSN] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getStudents(USN));
  };

  const student = useSelector((state) => state.student.studentData);
  const forgotPasswordLoading = useSelector(
    (state) => state.student.forgotPasswordLoading
  );

  console.log(forgotPasswordLoading);

  const AUTH_KEY = "d8fd745c33714dad9ac046f970efcd22";

  useEffect(() => {
    if (student) {
      console.log(student, "STUDENT");
      axios
        .get(
          `http://msgclub.softhubinc.com/rest/otpservice/generate-otp?AUTH_KEY=${AUTH_KEY}&mobileNumber=${student.student.stud_contact_no}`
        )
        .then((res) => {
          console.log(res.data, "RES DATA");

          if (res.data.responseCode === "3001") {
            history.push({ pathname: "/verify-otp", state: { student } });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [student]);

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      {forgotPasswordLoading ? (
        <div
          className="d-flex align-items-center min-vh-100 py-3 py-md-0"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(0%, -50%)",
            zIndex: 1000,
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : null}
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={forgotImg} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={logoImg} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Reset Password</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Student USN"
                      value={USN}
                      onChange={(e) => {
                        setUSN(e.target.value);
                      }}
                    />
                  </div>

                  {/* <p style={{ color: "red" }}>{message}</p> */}

                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    // value={loading ? "Logging In" : "Log In"}
                  />
                </form>
                <NavLink to=" /login" className="forgot-password-link">
                  Back to login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </main>
  );
}

export default ForgotPassword;
