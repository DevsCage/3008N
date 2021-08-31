const express = require("express");
const router = express.Router();

const {
  isRequestValidated,
  validatorSignUp,
  validatorSignIn,
} = require("../validators/auth");
const {
  signup,
  signin,
  requireSigninAsAdmin,
  requireSigninAsStudent,
  AllLogout,
} = require("../controller/authController");
const { adminSignin } = require("../controller/authController");
const { adminSignUp } = require("../controller/authController");
const { isAuthenticatedAdmin, authorizeRoles } = require("../middleware/auth");
router.post("/signup", validatorSignUp, isRequestValidated, signup);
router.post("/signin", validatorSignIn, isRequestValidated, signin);
router.post("/logout", AllLogout);
router.post(
  "/admin/login",
  isAuthenticatedAdmin,
  authorizeRoles("admin"),
  adminSignin
);

router.post(
  "/admin/testRoute",
  // isAuthenticatedAdmin,
  // authorizeRoles("admin"),
  function (req, res) {
    res.cookie("etst", "ahbjhcbd");
    res.send("cocokie sent");
  }
);

router.post("/admin/signin", adminSignin);
router.post("/admin/signup", adminSignUp);
router.get("/admin/profile", requireSigninAsAdmin, (req, res) => {
  res.status(200).json({ message: "student" });
});

router.get("/student/profile", requireSigninAsStudent, (req, res) => {
  res.status(200).json({ message: "admin" });
});

module.exports = router;
