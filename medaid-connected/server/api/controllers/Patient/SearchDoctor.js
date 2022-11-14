const Doctor = require('../../../models/Doctor');
const Disease = require('../../../models/Disease');

let diseaseArray = new Set();
let specialtyArray = new Set();
let symptomsArray = [];

// ['fever','cough','sneezing']

const findNearestDoctors = async (req, res, next) => {
    // getting the symptoms
    let symptoms = (req.query.symptoms);
    console.log(symptoms);
    var symptomsArray = symptoms.split(",");
    console.log(symptomsArray);

    //getting the specialties
    //let specialty = (req.query.specialty);
    //let specialist = (req.query.specialist);

    //getting the diseases
    //let disease_name = (req.query.name);

    //getting the diseases based on symptoms
    const diseases = await Disease.find({
      symptoms: { $regex : symptoms, $options: "i" },
      //symptoms: { $regex: symptoms, $options: "i" }
      //symptoms: { $in: symptomsArray }
      // $or : [{ symptoms: { $regex: `${symptoms}`, $options: "i" }},
      // { specialty: { $regex: `${specialty}`, $options: "i" }},
      // { name: { $regex: `${disease_name}`, $options: "i" }},
      // { specialist: {$regex: `${specialist}`, $options: "i" }}]
    });


    console.log(diseases)

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
      specialist: { $in: Array.from(specialtyArray) }
    });

    // finding the doctors based on the specialty
    // const doctors = await Doctor.find({
    //   specialist: { $in: Array.from(specialtyArray) }
    // });


    //console.log(diseaseArray);
    //console.log(specialtyArray);
    //console.log(doctors);
    //console.log(diseases);

    res.json(doctors);
}

const reloadSearch = async (req, res) => {

    diseaseArray = new Set();
    specialtyArray = new Set();
    res.json("symArray and specialtyArray cleared");
};



module.exports = {
    findNearestDoctors,
    reloadSearch
}