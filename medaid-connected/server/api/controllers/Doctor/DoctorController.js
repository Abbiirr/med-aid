const Doctor = require("../../../models/Doctor");
const disease_schema = require("../../../models/Disease");
const Council = require("../../../models/Council");
const CheckId = require("../../middleware/CheckId");

let diseaseArray = new Set();
let specialtyArray = new Set();

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();

  res.json(doctors);
};

const Me = async (req, res, next) => {
  try {
    // Split token
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "SECRET");

    // Find account using account id and role
    let account = await Doctor.findOne(
      {
        $and: [{ _id: decode.id }, { role: decode.role }],
      },
      { access_token: 0, password: 0 }
    )
      .populate("councilHour")
      .exec();

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Invalid token",
      });
    }

    for (const property in account) {
      if (property === "image")
        account[property] =
          hostURL(req) + "uploads/doctor/profiles/" + account[property];
    }

    return res.status(200).json({
      status: true,
      doctor: account,
    });
  } catch (error) {
    if (error) next(error);
  }
};

const updateCouncils = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { day, startTime, endTime, slots } = req.body;

    await CheckId(id);

    // Find Profile
    const doctor = await Doctor.findById({ _id: id }).exec();
    if (!doctor) {
      return res.status(404).json({
        status: false,
        message: "Doctor not found",
      });
    }
    
    const newCouncil = new Council({
      doctor: doctor._id,
      schedule: { day: day, startTime: startTime, endTime: endTime, slots: slots },
    });

    let council = await newCouncil.save();

    // set council into doctor
    const updateDoctor = await doctor
      .updateOne(
        {
          $push: {
            councilHour: [council._id],
          },
        },
        { new: true }
      )
      .exec();

    // updateDoctor();
  } catch (error) {
    if (error) next(error);
  }
};

const getCouncils = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { day, startTime, endTime } = req.body;

    await CheckId(id);

    // Find Profile
    const doctor = await Doctor.findById({ _id: id }).exec();
    if (!doctor) {
      return res.status(404).json({
        status: false,
        message: "Doctor not found",
      });
    }

    res.json(doctor.councilHour);
  } catch (error) {
    if (error) next(error);
  }
};
const getDoctorsResult = async (req, res) => {
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
  // // finding the doctors based on the specialty
  // const doctors = await Doctor.find({
  //   specialist: { $in: Array.from(specialtyArray) }
  // });
  // // finding the doctors based on the specialty
  // // const doctors = await Doctor.find({
  // //   specialist: { $in: Array.from(specialtyArray) }
  // // });
  // //console.log(diseaseArray);
  // console.log(specialtyArray);
  // //console.log(doctors);
  // //console.log(diseases);
  // res.json(doctors);
};

const reloadSearch = async (req, res) => {
  // diseaseArray = new Set();
  // specialtyArray = new Set();
  // res.json("symArray and specialtyArray cleared");
};

module.exports = {
  getDoctors,
  getDoctorsResult,
  reloadSearch,
  updateCouncils,
  getCouncils,
};
