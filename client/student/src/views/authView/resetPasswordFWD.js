import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./login.css";
import "./login.scss";
import forgotImg from "./resetnow.png";
import logoImg from "./logo_ssiet.png";
import { getStudents } from "../../reduxStore/actions/studentActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function VerifyOTP() {
  const student = useSelector((state) => state.student.studentData);
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConPass] = useState();
  // const student_id = studenq.student.studentData.student.stud_id;
  console.log(Password, ConfirmPassword);
  const [PassMisMatchErr, setErMsg] = useState();
  const [PassSuccessMsg, setSucMsg] = useState();
  const [PassFailMsg, setFailMsg] = useState();
  const [studentName, setStudentName] = useState(
    student && student.student.stud_fullName
  );
  const history = useHistory();
  const dispatch = useDispatch();

  if (student == null) {
    alert("UNAUTHORIZED ACCESS");
    history.push("/forgot-password");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErMsg(null);

    const data = {
      password: Password,
      confirmPassword: ConfirmPassword,
      student_id: student.student._id,
    };
    if (Password === ConfirmPassword) {
      console.log("data", data);
      axios
        .post("http://localhost:5000/api/reset-password-fwd-otp", {
          ...data,
        })
        .then((res) => {
          alert("Password reset successful, click ok to login");
          setSucMsg(res.data.message);
          history.push({
            pathname: "/login",
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setFailMsg(err.response.data.message);
        });
    } else {
      setErMsg("Password Mismathced");
    }
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
                <p className="login-card-description">Reset Password</p>

                {studentName ? (
                  <p
                    className="login-card-description"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Hey <span style={{ fontWeight: "bold" }}> {} </span>
                    you are verified, <br /> Please reset your password.&nbsp;
                  </p>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="" className="sr-only"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      required="true"
                      value={Password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <input
                      type="text"
                      className="form-control"
                      required="true"
                      placeholder="Confirm Password"
                      value={ConfirmPassword}
                      onChange={(e) => {
                        setConPass(e.target.value);
                      }}
                    />
                  </div>
                  {PassSuccessMsg ? (
                    <p
                      className="login-card-description"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {PassSuccessMsg}
                    </p>
                  ) : null}

                  {PassMisMatchErr ? (
                    <p
                      className="login-card-description"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {PassMisMatchErr}
                    </p>
                  ) : null}
                  {PassFailMsg ? (
                    <p
                      className="login-card-description"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {PassFailMsg}
                    </p>
                  ) : null}

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
