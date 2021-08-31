import React from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { Redirect } from "react-router-dom";
import cookies from "js-cookies";

const TheLayout = ({ children }) => {
  const checkAuth = cookies.getItem("auth");

  let isAuthenticated;
  if (checkAuth == "true") {
    isAuthenticated = true;
  } else if (checkAuth == "false") {
    isAuthenticated = false;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default TheLayout;
