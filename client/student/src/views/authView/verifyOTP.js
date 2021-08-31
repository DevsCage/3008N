import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./login.css";
import "./login.scss";
import forgotImg from "./verifynow.png";
import logoImg from "./logo_ssiet.png";
import { getStudents } from "../../reduxStore/actions/studentActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
function VerifyOTP() {
  const [OTP, setOTP] = useState();
  const [VotpErMsg, setErMsg] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.studentData);

  console.log("student from redux store", student);
  var mob_no = student && student.student.stud_contact_no;
  var rep_mob_no =
    mob_no && mob_no.slice(0, 2) + mob_no.slice(2).replace(/.(?=...)/g, "*");
  const AUTH_KEY = "d8fd745c33714dad9ac046f970efcd22";

  console.log(mob_no, OTP, AUTH_KEY);
  if (student == null) {
    alert("UNAUTHORIZED ACCESS");
    history.push("/forgot-password");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://msgclub.softhubinc.com/rest/otpservice/verify-otp?AUTH_KEY=${AUTH_KEY}&mobileNumber=${mob_no}&otp=${OTP}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.responseCode == "2010") {
          setErMsg(res.data.response);
          console.log(res);
        }
        if (res.data.responseCode == "2004") {
          alert("OTP Verified successfully, you are being redirected");
          history.push({
            pathname: "/reset-password-fwd-otp",
            state: { student },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
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
                <p className="login-card-description">Verify OTP</p>
                <p
                  className="login-card-description"
                  style={{ fontSize: "1.2rem" }}
                >
                  An OTP has been sent to your register mobile number &nbsp;
                  {rep_mob_no}
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={OTP}
                      onChange={(e) => {
                        setOTP(e.target.value);
                      }}
                    />
                  </div>
                  <p
                    for="errorMessage"
                    style={{ color: "red", fontSize: "1rem" }}
                  >
                    {VotpErMsg && VotpErMsg}{" "}
                    {VotpErMsg ? (
                      <p>Please check OTP entered or request for new OTP</p>
                    ) : (
                      ""
                    )}
                  </p>

                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
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
    </main>
  );
}

export default VerifyOTP;
