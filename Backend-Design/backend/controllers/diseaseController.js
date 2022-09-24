const asyncHandler = require("express-async-Handler");

const disease_schema = require("../models/disease.models");

//

//--------- main med-aid get set delete update for doctors------------------------
const getDiseases= asyncHandler (async (req, res) => {
    const diseases = await disease_schema.find()   
    
    res.json(diseases);
});

const setDisease = asyncHandler (async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const disease = await disease_schema.create({
        name: req.body.name,
        // variant: req.body.variant,
        // diseaseType: req.body.diseaseType,
        specialty: req.body.specialty,
        symptoms: req.body.symptoms,
    })

    console.log(req.body);
    res.json(disease);
});

const putDisease = asyncHandler (async (req, res) => {
    const disease = await disease_schema.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        // variant: req.body.variant,
        // diseaseType: req.body.diseaseType,
        specialty: req.body.specialty,
        symptoms: req.body.symptoms
      },
      { new: true }
    );

    res.json(disease);
});

const deleteDisease = asyncHandler (async (req, res) => {
    const disease = await disease_schema.findByIdAndDelete(req.params.id)
    disease.delete();
    res.json(disease);
});

//


module.exports = {
    getDiseases,
    setDisease,
    putDisease,
    deleteDisease,
};