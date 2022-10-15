const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.post("/reset", AuthController.Reset);
router.get("/logout", AuthController.Logout);

module.exports = router;
