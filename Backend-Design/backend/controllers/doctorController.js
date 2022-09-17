const asyncHandler = require('express-async-Handler')

const doctor_schema = require('../models/doctor.models')
const patient_schema = require("../models/patient.models");


//--------- main med-aid get set delete update for doctors------------------------
const getDoctors= asyncHandler (async (req, res) => {
    const doctors = await doctor_schema.find()   
    
    res.json(doctors);
});

const setDoctor = asyncHandler (async (req, res) => {
    const doctor = await doctor_schema.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
    })

    console.log(req.body);
    res.json(doctor);
});

const putDoctor = asyncHandler (async (req, res) => {
    const doctor = await doctor_schema.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
    }, {new: true})

    res.json(doctor);
});

const deleteDoctor = asyncHandler (async (req, res) => {
    const doctor = await doctor_schema.findByIdAndDelete(req.params.id)
    doctor.delete();
    res.json(doctor);
});

//------------------------------------------------------------------------------

module.exports = {
    getDoctors,
    setDoctor, 
    putDoctor,
    deleteDoctor
}