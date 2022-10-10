const asyncHandler = require("express-async-Handler");
const { body, validationResult } = require("express-validator");

const center_schema = require("../models/center.models");

//--------- main med-aid get set delete update for centers------------------------
const getCenters = asyncHandler(async (req, res) => {
  const centers = await center_schema.find();

  res.json(centers);
});

const setCenter = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const center = await center_schema.create({
    name: req.body.name,
    location: req.body.location,
  });

  console.log(req.body);
  res.json(center);
});

const putCenter = asyncHandler(async (req, res) => {
  const center = await center_schema.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      //lastName: req.body.lastName,
      //email: req.body.email,
      //contact: req.body.contact,
      specialty: req.body.specialty,
    },
    { new: true }
  );

  res.json(center);
});

const deleteCenter = asyncHandler(async (req, res) => {
  const center = await center_schema.findByIdAndDelete(req.params.id);
  center.delete();
  res.json(center);
});

//------------------------------------------------------------------------------

module.exports = {
  getCenters,
  setCenter,
  putCenter,
  deleteCenter,
};
