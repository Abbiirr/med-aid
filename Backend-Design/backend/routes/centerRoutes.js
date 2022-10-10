const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  getCenters,
  setCenter,
  putCenter,
  deleteCenter,
} = require("../controllers/centerController");

router.get("/", getCenters);

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

  setCenter
);

router.put("/:id", putCenter);

router.delete("/:id", deleteCenter);

module.exports = router;
