const asyncHandler = require("express-async-Handler");
const { body, validationResult } = require("express-validator");

const appointment_schema = require("../models/appointment.models");
const doctor_schema = require("../models/doctor.models");
const patient_schema = require("../models/patient.models");
const CheckId = require("../middleware/checkId");

//--------- main med-aid get set delete update for appointments------------------------
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointment_schema.find();

  res.json(appointments);
});
const GetAppointmentRequests = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(422).json({
        status: false,
        message: "Patient ID not found",
      });

    await checkId(id);
    const results = await Appointment.find(
      { patientId: id },
      { schedule: 1, status: 1 }
    )
      .populate("doctor", "name")
      .exec();

    // IF results not found
    if (!results.length) {
      return res.status(404).json({
        status: false,
        message: "Appointments not found",
      });
    }

    res.status(200).json({
      status: true,
      appointments: results,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Set Appointment Request
const SetAppointmentRequest = async (req, res, next) => {
  try {
    const {
      doctorId,
      patientId,
      name,
      phone,
      age,
      height,
      weight,
      bloodPressure,
      problemShortInfo,
    } = req.body;
    //const appointment = await appointment_schema.create
    const newAppointment = await appointment_schema.create({
      // doctor: doctorId,
      // patientId,
      // patient: {
      //   name,
      //   phone,
      //   age,
      //   height,
      //   weight,
      //   bloodPressure,
      //   problemShortInfo,
      patientID: req.body.patientID,
      doctor: req.body.doctor,
      center: req.body.center,
      date: req.body.date,
      time: req.body.time,
    });

    // Create appoinment
    const createAppointment = await newAppointment.save();
    // Update doctor
    const updateDoctor = await doctor_schema
      .findOneAndUpdate(
        { _id: doctorId },
        { $push: { appointments: [createAppointment._id] } },
        { new: true }
      )
      .exec();

    // Update Patient
    const updatePatient = await patient_schema
      .findOneAndUpdate(
        { _id: patientId },
        { $push: { appointmentRequests: [createAppointment._id] } },
        { new: true }
      )
      .exec();

    if (createAppointment && updateDoctor && updatePatient)
      return res.status(201).json({
        status: true,
        message: "Your appointment request has been sent.",
      });
  } catch (error) {
    if (error) {
      next(error);
    }
  }
};
const AppointmentRequests = async (req, res, next) => {
  try {
    const { id } = req.params;
    await CheckId(id);

    const results = await Appointment.find(
      { doctor: id, status: "pending" },
      { doctor: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patientId", "_id")
      .exec();
    if (!results.length)
      return res.status(404).json({
        status: false,
        message: "Request not found",
      });

    res.status(200).json({
      status: true,
      requests: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

const setAppointment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const appointment = await appointment_schema.create({
    patientID: req.body.patientID,
    doctor: req.body.doctor,
    center: req.body.center,
    date: req.body.date,
    time: req.body.time,
  });

  console.log(req.body);
  res.json(appointment);
});

const putAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointment_schema.findByIdAndUpdate(
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

  res.json(appointment);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointment_schema.findByIdAndDelete(req.params.id);
  appointment.delete();
  res.json(appointment);
});

//------------------------------------------------------------------------------

module.exports = {
  getAppointments,
  setAppointment,
  putAppointment,
  deleteAppointment,
  AppointmentRequests,
  SetAppointmentRequest,
  GetAppointmentRequests,
};
