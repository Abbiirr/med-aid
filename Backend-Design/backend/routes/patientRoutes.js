const express = require("express");
const router = express.Router();

const {
  getPatients,
  setPatient,
  putPatient,
  deletePatient,
} = require("../controllers/patientController");

router.get("/", getPatients);

router.post("/", setPatient);

router.put("/:id", putPatient);

router.delete("/:id", deletePatient);

module.exports = router;
