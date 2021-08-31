const jwt = require("jsonwebtoken");

const sendTokenAdmin = (user, statusCode, res) => {
  const token = user.getJwtTokenAdmin();

  //options for cookie
  const isAuthenticated = true;

  const options = {
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
  };
  res.cookie("token", token, options);
  res.cookie("auth", isAuthenticated);
  res.status(201).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendTokenAdmin;
