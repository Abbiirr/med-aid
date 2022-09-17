const asyncHandler = require("express-async-Handler");

const patient_schema = require("../models/patient.models");

//--------- main med-aid get set delete update for patients------------------------
const getPatients = asyncHandler(async (req, res) => {
  const patients = await patient_schema.find();

  res.json(patients);
});

const setPatient = asyncHandler(async (req, res) => {
  const patient = await patient_schema.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  console.log(req.body);
  res.json(patient);
});

const putPatient = asyncHandler(async (req, res) => {
  const patient = await patient_schema.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    { new: true }
  );

  res.json(patient);
});

const deletePatient = asyncHandler(async (req, res) => {
  const patient = await patient_schema.findByIdAndDelete(req.params.id);
  patient.delete();
  res.json(patient);
});

//------------------------------------------------------------------------------

module.exports = {
  getPatients,
  setPatient,
  putPatient,
  deletePatient,
};
