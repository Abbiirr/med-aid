const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  patientID: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  center: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("appointment_schema", appointmentSchema);
