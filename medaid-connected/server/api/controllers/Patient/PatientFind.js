const Patient = require("../../../models/Patient");

const findPatient = async (req, res, next) => {
   //const id = req.params.id;
   const patient = await Patient.find();
   res.json(patient);
};

module.exports = { findPatient };
