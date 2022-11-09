const express = require("express");
const router = express.Router();
const AuthController = require("../middleware/Permission");
const ProfileController = require("../controllers/Doctor/ProfileController");
const AppointmentController = require("../controllers/Doctor/AppointmentController");
const DoctorController = require("../controllers/Doctor/DoctorController");
const CouncilHourController = require("../controllers/Doctor/councilHourController");

router.get("/me", ProfileController.Me);
router.post(
  "/profile/:id/update",
  AuthController.isDoctor,
  ProfileController.updateProfile
);

router.post(
  "/profile/:id/councils/update",
  AuthController.isDoctor,
  DoctorController.updateCouncils
);

router.get("/getDoctors", DoctorController.getDoctors);
router.get("/getDoctorsResult", DoctorController.getDoctorsResult);
router.get("/reload", DoctorController.reloadSearch);

router.get(
  "/appointment/:id/requests",
  AuthController.isDoctor,
  AppointmentController.AppointmentRequests
);
router.get(
  "/appointment/:id/approved",
  AuthController.isDoctor,
  AppointmentController.ApprovedAppointments
);
router.put(
  "/appointment/approve",
  AuthController.isDoctor,
  AppointmentController.ApproveAppointment
);
router.get("/councils/:id", CouncilHourController.getCouncilHour);
router.get("/:id/councils", DoctorController.getCouncils);

module.exports = router;
