const asyncHandler = require("express-async-Handler");
const disease_schema = require("../models/disease.models");
const doctor_schema = require("../models/doctor.models");

//--------- main med-aid search------------------------

// @desc    Get search results
// @route   GET /api/search
// @access  Public

let symArray = new Set();
let specialtyArray = new Set();

const getResults = asyncHandler(async (req, res) => {

    //const symArray = new Set();
    
    let symptoms = (req.query.symptoms);

    const diseases = await disease_schema.find({ 
        symptoms: { $regex: symptoms, $options: "i" } 
        // set er moddhe rakhlo
    });

    diseases.forEach(function (item) {
      //console.log(item.name);
      symArray.add(item.name);
      specialtyArray.add(item.specialty);

    });

    const doctors = await doctor_schema.find({
      specialty: { $in: Array.from(specialtyArray) }
    });

    console.log(symArray);
    console.log(specialtyArray);
    console.log(doctors);
    //console.log(diseases);

    res.json(doctors);

});

// @desc    Reload search results
// @route   GET /api/search/reload
// @access  Public

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
