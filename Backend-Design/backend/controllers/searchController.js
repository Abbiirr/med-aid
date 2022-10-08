const asyncHandler = require("express-async-Handler");
const disease_schema = require("../models/disease.models");
const doctor_schema = require("../models/doctor.models");

//--------- main med-aid search------------------------

let symArray = new Set();
let specialtyArray = new Set();

const getResults = asyncHandler(async (req, res) => {

    // getting the symptoms
    let symptoms = (req.query.symptoms);

    //getting the specialties
    //let specialties = (req.query.specialties);

    //getting the diseases
    //let diseases = (req.query.diseases);

    //getting the diseases based on symptoms
    const diseases = await disease_schema.find({ 
        symptoms: { $regex: symptoms, $options: "i" } 
        // set er moddhe rakhlo
    });

    //getting the diseases based on specialties


    // getting the diseases based on diseases


    // adding the symptoms to the set
    // adding the specialties to the set
    diseases.forEach(function (item) {
      //console.log(item.name);
      symArray.add(item.name);
      specialtyArray.add(item.specialty);

    });

    // finding the doctors based on the specoalities
    const doctors = await doctor_schema.find({
      specialty: { $in: Array.from(specialtyArray) }
    });

    console.log(symArray);
    console.log(specialtyArray);
    console.log(doctors);
    //console.log(diseases);

    res.json(doctors);

});


const reloadSearch = asyncHandler(async (req, res) => {

    symArray = new Set();
    specialtyArray = new Set();
    res.json("symArray and specialtyArray cleared");
});

//------------------------------------------------------------------------------

module.exports = {
  getResults,
  reloadSearch
};
