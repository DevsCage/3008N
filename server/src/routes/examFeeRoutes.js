const express = require("express");
const { addExamFee } = require("../controller/examFeeController");
const router = express.Router();

router.post("/add-exam-fee", addExamFee);

module.exports = router;
