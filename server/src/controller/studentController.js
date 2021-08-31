const Student = require("../models/StudentModel");
const userModel = require("../models/authStudentModel");
const bcrypt = require("bcrypt");
const path = require("path");

exports.createStudent = (req, res) => {
  console.log("data: ", req.body);

  const {
    stud_fname,
    stud_lname,
    stud_reg_num,
    stud_email,
    stud_contact_no,
    stud_branch,
    stud_qouta,
    stud_cat,
    stud_ac_year,
    stud_branch_year,
    stud_religion,
    stud_caste,
    stud_subcaste,
    stud_class_div,
    stud_sem,
    stud_dob,
    stud_address,
    stud_city,
    stud_zip,
    stud_state,
    stud_gender,
    stud_adharno,
    stud_sys_init_password,
    stud_sys_username,
  } = req.body;
  const file = req.file;
  let photo;
  if (file) {
    photo = file.filename;
  }
  const newStudent = new Student({
    stud_fname,
    stud_lname,
    stud_reg_num,
    stud_email,
    stud_contact_no,
    stud_branch,
    stud_qouta,
    stud_cat,
    stud_ac_year,
    stud_branch_year,
    stud_religion,
    stud_caste,
    stud_subcaste,
    stud_class_div,
    stud_sem,
    stud_dob,
    stud_address,
    stud_city,
    stud_zip,
    stud_state,
    stud_gender,
    stud_adharno,
    stud_sys_init_password,
    stud_sys_username,
  });

  newStudent.save((error, student) => {
    if (error) {
      res.status(400).json({ message: error, msg: "Coudn't Create a Student" });
    }
    if (student) {
      // res.status(200).json({ data: student });
      const user = new userModel({
        firstName: stud_fname,
        lastName: stud_lname,
        student_ref_id: student._id,
        userName: stud_reg_num,
        email: stud_email,
        password: stud_adharno,
      });
      user.save((error, sys_user) => {
        if (error) {
          res
            .status(400)
            .json({ message: error, msg: "errrror creating student cred" });
        }
        if (sys_user) {
          res.status(200).json({ data: sys_user });
        }
      });
    }
  });

  // .catch((err) => {
  //   res
  //     .status(200)
  //     .json({ message: `Coudn't Create a Student ${err.message}` });
  // });
};

exports.getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(400).json({
      message: "Fetching from Database failed!",
    });
  }
};

exports.findStudentDelete = async (req, res) => {
  const id = req.params.id;
  try {
    Student.findByIdAndDelete(id).exec();
    res.status(200).json({
      message: "Successfully Deleted!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot Deleted the Reqested Item!",
    });
  }
};

exports.getStudentByUSN = (req, res) => {
  const USN = req.body.USN;
  console.log(req.body);
  Student.findOne({ stud_reg_num: USN })
    .select("stud_reg_num stud_fname stud_lname stud_contact_no stud_fullName")
    .exec((err, student) => {
      if (student) res.status(200).json({ student });
      else res.status(400).json({ message: "Student not Found!" });
    });
};

exports.getStudentByID = (req, res) => {
  const ID = req.body.student_ref_id;
  console.log(ID);
  Student.findOne({ _id: ID })
    // .select("stud_reg_num stud_fname stud_lname")
    .exec((err, student) => {
      if (student) res.status(200).json({ student });
      else res.status(400).json({ message: "Student not Found!" });
    });
};

// get students - filtered

exports.getStudents = async (req, res) => {
  const stud_ac_year = req.body.stud_ac_year;
  const stud_branch = req.body.stud_branch;
  const stud_sem = req.body.stud_sem;

  console.log(stud_ac_year, stud_branch, stud_sem);
  await Student.find({
    stud_ac_year: stud_ac_year,
    stud_branch: stud_branch,
    stud_sem: stud_sem,
  }).exec((error, students) => {
    if (students) {
      res.status(201).json({
        students,
      });
    }
    if (error) {
      res.status(404).json(error);
    }
  });
};

// update students - for admin

exports.updateStudents = async (req, res) => {
  const stud_reg_num = req.body.stud_reg_num;
  const stud_fname = req.body.stud_fname;
  await Student.findOneAndUpdate(
    { stud_reg_num: stud_reg_num },
    {
      $set: {
        stud_fname: stud_fname,
      },
    }
  ).exec((error, student) => {
    if (error) {
      res.status(400).json({
        message:
          "Error in fetching student, please check registration number" + error,
      });
    }
    if (student) {
      res
        .status(201)
        .json({ message: "Student Updated Successfully", student });
    }
  });
};

//reset passoword fwd otp

exports.ResetPasswordOTP = async (req, res) => {
  const { student_id, confirmPassword, password } = req.body;
  console.log(req.body);
  if (password === confirmPassword) {
    userModel.findOne({ student_ref_id: student_id }).exec((err, student) => {
      if (err) {
        res.status(201).json({ message: err.message });
      } else if (student) {
        userModel
          .findOneAndUpdate(
            {
              student_ref_id: student_id,
            },

            {
              $set: {
                hash_password: bcrypt.hashSync(password, 15),
              },
            }
          )
          .exec((err, resetSuccess) => {
            if (err) {
              res
                .status(201)
                .json({
                  err,
                  message: "Password reset failed, please try again",
                });
            }
            if (resetSuccess) {
              res.status(201).json({ message: "Password reset successfully" });
            }
          });
      }
    });
  } else {
    res.status(400).json({ message: "Password mismatched" });
  }
};
