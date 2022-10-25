const Medicine = require("../../../models/medicineSchema");
const disease_schema = require("../../../models/Disease");

const getMedicines = async (req, res) => {
  const medicines = await Medicine.find();

  res.json(medicines);
};

const getMedicinesResult = async (req, res) => {
  // // getting the symptoms
  // let symptoms = (req.query.symptoms);
  // console.log(symptoms);
  // //getting the specialties
  // let specialty = (req.query.specialty);
  // let specialist = (req.query.specialist);
  // //getting the diseases
  // let disease_name = (req.query.name);
  // //getting the diseases based on symptoms
  // const diseases = await disease_schema.find({
  //     //symptoms: { $regex: symptoms, $options: "i" }
  //     $or : [{ symptoms: { $regex: `${symptoms}`, $options: "i" }},
  //     { specialty: { $regex: `${specialty}`, $options: "i" }},
  //     { name: { $regex: `${disease_name}`, $options: "i" }},
  //     { specialist: {$regex: `${specialist}`, $options: "i" }}]
  // });
  // //console.log(diseases)
  // console.log(diseases)
  // // adding the symptoms to the set
  // // adding the specialties to the set
  // diseases.forEach(function (item) {
  //   //console.log(item.name);
  //   diseaseArray.add(item.name);
  //   specialtyArray.add(item.specialty);
  //   //specialtyArray.add(item.specialist);
  // });
  // // finding the medicines based on the specialty
  // const medicines = await Medicine.find({
  //   specialist: { $in: Array.from(specialtyArray) }
  // });
  // // finding the medicines based on the specialty
  // // const medicines = await Medicine.find({
  // //   specialist: { $in: Array.from(specialtyArray) }
  // // });
  // //console.log(diseaseArray);
  // console.log(specialtyArray);
  // //console.log(medicines);
  // //console.log(diseases);
  // res.json(medicines);
};

const reloadSearch = async (req, res) => {
  // diseaseArray = new Set();
  // specialtyArray = new Set();
  // res.json("symArray and specialtyArray cleared");
};

module.exports = {
  getMedicines,
  getMedicinesResult,
  reloadSearch,
};
