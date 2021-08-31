const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userStudentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,

      trim: true,
    },

    student_ref_id: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    email: {
      type: String,

      // unique: true,
      // trim: true,
    },
    hash_password: {
      type: String,
    },

    contactNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

userStudentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userStudentSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 15);
});

userStudentSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

const userModel = mongoose.model("users_students", userStudentSchema);

module.exports = userModel;
