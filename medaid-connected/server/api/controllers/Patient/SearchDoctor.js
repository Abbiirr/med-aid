const Doctor = require("../../../models/Doctor");
const Disease = require("../../../models/Disease");

let diseaseArray = new Set();
let specialtyArray = new Set();
let symptomsArray = [];


const findNearestDoctors = async (req, res, next) => {
  // getting the symptoms
  let symptoms = req.query.symptoms;
  var symptomsArray = symptoms.split(",");
  console.log(symptomsArray);

  //---trying a thing
  diseaseArray = new Set();
  specialtyArray = new Set();
  //---

  //getting the diseases based on symptoms
  const diseases = await Disease.find({
    symptoms: { $in: symptomsArray },
  });

  console.log(diseases);

  // adding the symptoms to the set
  // adding the specialties to the set
  diseases.forEach(function (item) {
    //console.log(item.name);
    diseaseArray.add(item.name);
    specialtyArray.add(item.specialty);
    //specialtyArray.add(item.specialist);
  });

  // finding the doctors based on the specialty
  const doctors = await Doctor.find({
    specialist: { $in: Array.from(specialtyArray) },
  });

  res.json(doctors);
};

const reloadSearch = async (req, res) => {
  diseaseArray = new Set();
  specialtyArray = new Set();
  res.json("symArray and specialtyArray cleared");
};

module.exports = {
  findNearestDoctors,
  reloadSearch,
};
