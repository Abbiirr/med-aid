const disease_schema = require("../../../models/Disease");

//

//--------- main med-aid get set delete update for disease------------------------
const getDiseases = async (req, res) => {
  const diseases = await disease_schema.find();
  res.json(diseases);
};

const getSymptoms = async (req, res) => {
  const diseases = await disease_schema.find();
  // let symptomsArray = new Set();

  // diseases.forEach(function (item) {
  //   //item.symptoms.toString()
  //   //console.log(item.symptoms);
  //   item.symptoms.forEach(function (sym) {
  //       symptomsArray.add(sym);
  //   });
  // });

  //console.log(symptomsArray);
  res.json(diseases);
};

const setDisease = async (req, res) => {
  //const errors = validationResult(req)

  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() })
  // }
  console.log(typeof req.body.symptoms);

  const disease = await disease_schema.create({
    name: req.body.name,
    // variant: req.body.variant,
    // diseaseType: req.body.diseaseType,
    specialty: req.body.specialty,
    symptoms: req.body.symptoms,
  });

  console.log(req.body);
  res.json(disease);
};

const putDisease = async (req, res) => {
  const disease = await disease_schema.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      // variant: req.body.variant,
      // diseaseType: req.body.diseaseType,
      specialty: req.body.specialty,
      symptoms: req.body.symptoms,
    },
    { new: true }
  );

  res.json(disease);
};

const deleteDisease = async (req, res) => {
  const disease = await disease_schema.findByIdAndDelete(req.params.id);
  disease.delete();
  res.json(disease);
};

//

module.exports = {
  getDiseases,
  getSymptoms,
  setDisease,
  putDisease,
  deleteDisease,
};
