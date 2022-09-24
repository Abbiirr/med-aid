const asyncHandler = require("express-async-Handler");
const disease_schema = require("../models/disease.models");

//--------- main med-aid search------------------------

const getResults = asyncHandler(async (req, res) => {
  let symptoms = req.query.symptoms || "";

  const diseases = await disease_schema.find({ symptoms: { $regex: symptoms, $options: "i" } });

  res.json(diseases);

});

//------------------------------------------------------------------------------

module.exports = {
  getResults
};
