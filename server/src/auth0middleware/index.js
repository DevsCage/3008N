const express = require("express");
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "fjhbskjghbsghsbjkhsbfuyfusabguyasgfuyr",
  baseURL: "http://localhost:5000",
  clientID: "KKTdElpYNIadMeVQosV2Q3JlwOksBCG4",
  issuerBaseURL: "https://dev-3niataf3.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
const auth_0 = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  //   req.user =

  console.log(req);
};
