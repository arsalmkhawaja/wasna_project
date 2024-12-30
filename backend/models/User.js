const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 3,
  },
  fullName: {
    type: String,
    required: function () {
      return this.role === "user";
    },
  },
  dateOfBirth: {
    type: Date,
    required: function () {
      return this.role === "user";
    },
  },
  gender: {
    type: String,
    required: function () {
      return this.role === "user";
    },
  },
  phoneNumber: {
    type: String,
    required: function () {
      return this.role === "user";
    },
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
