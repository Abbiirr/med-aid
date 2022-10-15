const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // contact: {
  //     type: String
  // },
  // gender: {
  //     type: String
  // },
  birthDate: {
    type: Date,
  },
  // weight: {
  //     type: Number
  // },
  // bloodGroup: {
  //     type: String
  // },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("patient_schema", patientSchema);
