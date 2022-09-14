const asyncHandler = require('express-async-Handler')

const disease_schema = require('../models/disease.models')
const doctor_schema = require('../models/doctor.models')


//--------- main med-aid get set delete update------------------------
const getDoctors= asyncHandler (async (req, res) => {
    const doctors = await doctor_schema.find()   
    
    res.json(doctors);
});

const setDoctors = asyncHandler (async (req, res) => {
    const doctors = await doctor_schema.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
    })

    console.log(req.body);
    res.json(doctors);
});

//------------------------------------------------------------------------------


module.exports = {
    getDoctors,
    setDoctors
}