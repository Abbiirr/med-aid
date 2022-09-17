const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
  getPatients,
  setPatient,
  putPatient,
  deletePatient,
} = require("../controllers/patientController");

router.get("/", getPatients);

router.post(
  "/",
  body("birthDate").isDate({format: 'YYYY-MM-DD'}),
  body("password").isLength({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  setPatient
);

router.put("/:id", putPatient);

router.delete("/:id", deletePatient);

module.exports = router;
