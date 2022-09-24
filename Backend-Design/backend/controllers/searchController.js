const asyncHandler = require("express-async-Handler");
const disease_schema = require("../models/disease.models");

//--------- main med-aid search------------------------

const getResults = asyncHandler(async (req, res) => {
    console.log(req.query);
    
    let symptoms = (req.query.symptoms);

    //const reqQuery = { ...req.query };
    console.log(symptoms);

    const diseases = await disease_schema.find({ 
        symptoms: { $regex: symptoms, $options: "i" } 
    });


    res.json(diseases);

});

//------------------------------------------------------------------------------

module.exports = {
  getResults
};
