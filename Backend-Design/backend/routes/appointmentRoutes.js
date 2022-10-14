const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  getAppointments,
  setAppointment,
  putAppointment,
  deleteAppointment,
  AppointmentRequests,
  SetAppointmentRequest,
  GetAppointmentRequests,
} = require("../controllers/appointmentController");
const Authenticate = require("../middleware/permission");

router.get("/", getAppointments);

router.post(
  "/",
  // body("email").isEmail().normalizeEmail(),
  // body("contact").isLength({ min: 11 }).isMobilePhone(),
  // body("birthDate").isDate({ format: "YYYY-MM-DD" }),
  // body("password").isLength({
  //   minLength: 5,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  // }),

  SetAppointmentRequest
);

router.put("/:id", putAppointment);

router.delete("/:id", deleteAppointment);

router.get(
  "/appointment/request/:id/index",
  Authenticate.isPatient,
  GetAppointmentRequests
);
router.post(
  "/appointment/request",
  Authenticate.isPatient,
  SetAppointmentRequest
);

module.exports = router;
