const express = require("express");
const router = express.Router();

const {
  getResults
} = require("../controllers/searchController");

router.get("/", getResults);

module.exports = router;
