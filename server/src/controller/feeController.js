const Fee = require("../models/feeModel");
const PaymentLog = require("../models/paymentLogsModel.js");
const Student = require("../models/StudentModel");
exports.addFee = async (req, res) => {
  const {
    stud_reg_num,
    stud_id,
    stud_fname,
    stud_lname,
    stud_academic_year,
    stud_branch_year,
    stud_tution_fee,
    stud_addmission_fee,
    stud_lab_fee,
    stud_sports_fee,
    stud_transportation_fee,
    stud_other_fee,
    stud_hostel_fee,
    stud_total_fee,
    stud_paid_fee,
    stud_pending_fee,
    stud_other_fee_description,
    // stud_payment_list,
  } = req.body;
  console.log(req.body, "body");
  Fee.findOne({ stud_reg_num: stud_reg_num }).exec(function (err, data) {
    if (err) res.status(400).json({ message: "Student not found", err });
    if (data) {
      const findAcademicYear = data.stud_academic_year.find((el) => {
        return el.academic_year === stud_academic_year;
      });
      console.log("DAAT", findAcademicYear, "DATA");

      if (findAcademicYear) {
        res.status(400).json({
          message:
            "Fee for this Academic Year already exists, please try UPDATE",
        });
      }
      if (findAcademicYear == undefined) {
        Fee.findOneAndUpdate(
          {
            stud_reg_num: stud_reg_num,
          },
          {
            $push: {
              stud_academic_year: {
                academic_year: stud_academic_year,
                stud_branch_year: stud_branch_year,
                stud_tution_fee: stud_tution_fee,
                stud_addmission_fee: stud_addmission_fee,
                stud_sports_fee: stud_sports_fee,
                stud_lab_fee: stud_lab_fee,
                stud_transportation_fee: stud_transportation_fee,
                stud_other_fee: stud_other_fee,
                stud_paid_fee: stud_paid_fee,
                stud_pending_fee: stud_pending_fee,
                stud_hostel_fee: stud_hostel_fee,
                stud_total_fee: stud_total_fee,
                stud_other_fee_description: stud_other_fee_description,
              },
            },
          },
          {
            new: !0,
            upsert: !0,
          }
        ).exec((err, data) => {
          if (err) res.status(400).json({ message: "Update Error" });
          if (data) res.status(201).json({ data });
        });
      }
    } else {
      console.log("no data");
      const feeAdd = new Fee({
        stud_reg_num: stud_reg_num,
        stud_fname: stud_fname,
        stud_lname: stud_lname,
        stud_academic_year: {
          academic_year: stud_academic_year,
          stud_branch_year: stud_branch_year,
          stud_tution_fee: stud_tution_fee,
          stud_addmission_fee: stud_addmission_fee,
          stud_sports_fee: stud_sports_fee,
          stud_lab_fee: stud_lab_fee,
          stud_transportation_fee: stud_transportation_fee,
          stud_other_fee: stud_other_fee,
          stud_paid_fee: stud_paid_fee,
          stud_pending_fee: stud_pending_fee,
          stud_hostel_fee: stud_hostel_fee,
          stud_total_fee: stud_total_fee,
          stud_other_fee_description: stud_other_fee_description,
        },
        stud_id: stud_id,
        // stud_payment_list: stud_payment_list,
      });

      feeAdd.save((error, studentfee) => {
        if (error) {
          res.status(400).json({
            message: "Data addition failed",
            error,
          });
        }
        if (studentfee) {
          res.status(201).json({
            message: "Data added",
            studentfee,
          });
          // const payment = PaymentLog({
          //   stud_reg_num: studentfee.stud_reg_num,
          //   stud_id: studentfee.stud_id,
          //   stud_fname: studentfee.stud_fname,
          //   stud_lname: studentfee.stud_lname,
          //   stud_payment_list: studentfee.stud_payment_list,
          // });
          // payment.save((err, data) => {
          //   if (err) {
          //     res.status(400).json({
          //       message: "Data addition to payment log failed",
          //       error,
          //     });
          //   }
          //   if (data) {
          //     res.status(201).json({
          //       message: "Data added",
          //       data,
          //     });
          //   }
          // });
        }
      });
    }
  });
};

//Updating

exports.feeUpdate = async (req, res) => {
  const reqs = req.body;
  console.log(req.body);
  Fee.findOne({ stud_id: reqs.stud_id }).exec((err, data) => {
    if (err) res.status(400).json({ message: "Student Not Found" });
    if (data) {
      const find_acadamic_year = data.stud_academic_year.find((el) => {
        return el.academic_year === reqs.academic_year;
      });
      // const find_branch_year = data.stud_academic_year.find((el) => {
      //   return el.branch_year === reqs.branch_year;
      // });
      // console.log(find_branch_year);

      if (find_acadamic_year !== undefined) {
        Fee.findOneAndUpdate(
          {
            stud_id: reqs.stud_id,
            "stud_academic_year.academic_year":
              find_acadamic_year.academic_year,
          },
          {
            $set: {
              "stud_academic_year.$": {
                academic_year: reqs.academic_year,
                stud_branch_year: reqs.stud_branch_year,
                stud_tution_fee: reqs.stud_tution_fee,
                stud_addmission_fee: reqs.stud_addmission_fee,
                stud_sports_fee: reqs.stud_sports_fee,
                stud_lab_fee: reqs.stud_lab_fee,
                stud_transportation_fee: reqs.stud_transportation_fee,
                stud_other_fee: reqs.stud_other_fee,
                stud_paid_fee: reqs.stud_paid_fee,
                stud_pending_fee: reqs.stud_pending_fee,
                stud_hostel_fee: reqs.stud_hostel_fee,
                stud_total_fee: reqs.stud_total_fee,
                stud_other_fee_description: reqs.stud_other_fee_description,
              },
            },
          },
          {
            new: !0,
          }
        ).exec((err, data) => {
          if (err) res.status(400).json({ message: "Update Error" });
          // if (data) res.status(201).json({ data, message: "Updated" });
          if (data) {
            PaymentLog.findOne({ stud_id: reqs.stud_id }).exec(
              (error, paymentstud) => {
                if (error) {
                  res.status(400).json({
                    message: "Error in matching student id",
                    error,
                  });
                }

                if (paymentstud) {
                  console.log("STUDENT ID MATCHED ");

                  PaymentLog.findOneAndUpdate(
                    { _id: paymentstud._id },

                    {
                      $push: {
                        stud_payment_list: reqs.stud_payment_list,
                      },
                    }
                  ).exec((error, studfinduppo) => {
                    if (error) {
                      res.status(400).json({
                        message: "Error- in matching ID, Inner error",
                        error,
                      });
                    }
                    if (studfinduppo) {
                      res.status(200).json({ message: "Updated bro" });
                    }
                  });
                } else {
                  console.log("ELSE");
                  const newPaymentLog = new PaymentLog({
                    stud_reg_num: reqs.stud_reg_num,
                    stud_id: reqs.stud_id,
                    stud_payment_list: reqs.stud_payment_list,
                  });
                  newPaymentLog.save((err, data) => {
                    if (err)
                      res.status(400).json({
                        err,
                        message: "Something wrong Try again",
                      });
                    if (data) res.status(201).json({ data });
                  });
                }
              }
            );
          }
        });
      }
    }
  });

  //   Fee.findOneAndUpdate(
  //   {
  //     stud_reg_num: reqs.stud_reg_num,
  //   },
  //   {
  //     $set: {
  //       stud_tution_fee: reqs.stud_tution_fee,
  //       stud_addmission_fee: reqs.stud_addmission_fee,
  //       stud_sports_fee: reqs.stud_sports_fee,
  //       stud_lab_fee: reqs.stud_lab_fee,
  //       stud_hostel_fee: reqs.stud_hostel_fee,
  //       stud_transportation_fee: reqs.stud_transportation_fee,
  //       stud_other_fee: reqs.stud_other_fee,
  //       stud_other_fee_description: reqs.stud_other_fee_description,
  //       stud_total_fee: reqs.stud_total_fee,
  //       stud_paid_fee: reqs.stud_paid_fee,
  //       stud_pending_fee: reqs.stud_pending_fee,
  //     },
  //     $push: {
  //       stud_payment_list: reqs.stud_payment_list,
  //     },
  //   }
  // ).exec((error, updatedfee) => {
  //   if (updatedfee) {
  //     // res.status(201).json({ message: "Updated Successfully", updatedfee });
  //     PaymentLog.findOneAndUpdate(
  //       { stud_id: updatedfee.stud_id },
  //       {
  //         $push: {
  //           stud_payment_list: reqs.stud_payment_list,
  //         },
  //       }
  //     ).exec((err, payment) => {
  //       if (payment)
  //         res.status(201).json({ message: "Updated Successfully", updatedfee });
  //       if (err) res.status(400).json({ message: "Couldn't Update", err });
  //     });
  //   } else if (error) res.status(400).json({ message: "FAILED" });
  // });
};

// Get fee by student ID

exports.getFeeByStudID = async (req, res) => {
  const stud_reg_num = req.body.USN;
  const stud_academic_year = req.body.stud_academic_year;
  const stud_branch_year = req.body.stud_branch_year;

  console.log(req.body);

  Fee.findOne({ stud_reg_num: stud_reg_num }).exec((err, data) => {
    if (data) {
      const filterData = data.stud_academic_year.find((el) => {
        return el.academic_year === stud_academic_year;
      });
      const student = {
        stud_reg_num: data.stud_reg_num,
        stud_fname: data.stud_fname,
        stud_lname: data.stud_lname,
        stud_id: data.stud_id,
      };

      if (filterData !== undefined) {
        res.status(201).json({
          filterData,
          student,
        });
      }
    } else {
      res.status(400).json({ message: "Student not Found" });
    }
  });
};
