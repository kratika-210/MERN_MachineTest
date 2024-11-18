const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  contact: String,
  gender: String,
  qualification: String,
  joinDate: Date,
});

module.exports = mongoose.model("Employee", employeeSchema);
