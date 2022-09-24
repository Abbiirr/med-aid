const asyncHandler = require("express-async-Handler");
const disease_schema = require("../models/disease.models");

//--------- main med-aid search------------------------

// @desc    Get search results
// @route   GET /api/search
// @access  Public

let symArray = new Set();

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
    });

    console.log(symArray);


    res.json(diseases);

});

// @desc    Reload search results
// @route   GET /api/search/reload
// @access  Public

const reloadSearch = asyncHandler(async (req, res) => {

    symArray = new Set();
    res.json(symArray);
});

//------------------------------------------------------------------------------

module.exports = {
  getResults,
  reloadSearch
};
