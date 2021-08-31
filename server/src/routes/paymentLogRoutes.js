const express = require("express");
const {
  addPaymentLog,
  getUVPaymentLog,
  getVPaymentLog,
  acceptPaymentLog,
} = require("../controller/paymentLogController");

const router = express.Router();

router.post("/add-payment-log", addPaymentLog);
router.get("/get-uv-payment-log", getUVPaymentLog);
router.get("/get-v-payment-log", getVPaymentLog);
router.post("/accept-payment-log", acceptPaymentLog);

module.exports = router;
