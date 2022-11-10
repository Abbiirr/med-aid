const express = require("express");
const router = express.Router();
const AuthController = require("../middleware/Permission");
const ProfileController = require("../controllers/Doctor/ProfileController");
const AppointmentController = require("../controllers/Doctor/AppointmentController");
const DoctorController = require("../controllers/Doctor/DoctorController");
const CouncilHourController = require("../controllers/Doctor/councilHourController");

router.get("/:id", CouncilHourController.getCouncilHour);

module.exports = router;
