const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  program: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Student = mongoose.model('student', StudentSchema);
