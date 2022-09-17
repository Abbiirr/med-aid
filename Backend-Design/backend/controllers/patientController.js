const asyncHandler = require("express-async-Handler");
const { body, validationResult } = require("express-validator");

const patient_schema = require("../models/patient.models");

//--------- main med-aid get set delete update for patients------------------------
const getPatients = asyncHandler(async (req, res) => {
  const patients = await patient_schema.find();

  res.json(patients);
});

const setPatient = asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const patient = await patient_schema.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    password: req.body.password
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
