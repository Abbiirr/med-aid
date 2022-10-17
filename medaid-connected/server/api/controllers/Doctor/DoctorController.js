const Doctor = require('../../../models/Doctor');


let diseaseArray = new Set();
let specialtyArray = new Set();

const getDoctors =  async (req, res) => {
    const doctors = await Doctor.find()   
    
    res.json(doctors);
};


const getDoctorsResult = async (req, res) => {

    // getting the symptoms
    let symptoms = (req.query.symptoms);

    //getting the specialties
    let specialty = (req.query.specialty);

    //getting the diseases
    let disease_name = (req.query.name);

    //getting the diseases based on symptoms
    const diseases = await disease_schema.find({ 
        //symptoms: { $regex: symptoms, $options: "i" } 
        $or : [{ symptoms: { $regex: `${symptoms}`, $options: "i" }},
        { specialty: { $regex: `${specialty}`, $options: "i" }},
        { name: { $regex: `${disease_name}`, $options: "i" }}]
        
    });

    // adding the symptoms to the set
    // adding the specialties to the set
    diseases.forEach(function (item) {
      //console.log(item.name);
      diseaseArray.add(item.name);
      specialtyArray.add(item.specialty);

    });

    // finding the doctors based on the specialty
    const doctors = await doctor_schema.find({
      specialty: { $in: Array.from(specialtyArray) }
    });

    console.log(diseaseArray);
    console.log(specialtyArray);
    console.log(doctors);
    //console.log(diseases);

    res.json(doctors);

};


const reloadSearch = async (req, res) => {

    diseaseArray = new Set();
    specialtyArray = new Set();
    res.json("symArray and specialtyArray cleared");
};

module.exports = {
    getDoctors,
    getDoctorsResult,
    reloadSearch
}