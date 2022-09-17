const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {getDoctors, setDoctor, putDoctor, deleteDoctor} = require('../controllers/doctorController');

router.get(
  "/",
  getDoctors
);

router.post(
  "/",
  body("email").isEmail().normalizeEmail(),
  body("contact").isLength({ min: 11 }).isMobilePhone(),
  body("birthDate").isDate({ format: "YYYY-MM-DD" }),
  body("password").isLength({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),

  setDoctor
);

router.put('/:id', putDoctor);

router.delete('/:id', deleteDoctor);


module.exports = router;