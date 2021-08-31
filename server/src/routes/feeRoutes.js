const express = require("express");

const {
  addFee,
  feeUpdate,
  getFeeByStudID,
} = require("../controller/feeController");
const { authorizeRoles, isAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/add-fee", isAuthenticatedAdmin, authorizeRoles("admin"), addFee);
router.post("/update-fee", feeUpdate);
router.post("/fee-by-id", getFeeByStudID);

module.exports = router;
