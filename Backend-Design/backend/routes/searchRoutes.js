const express = require("express");
const router = express.Router();

const {
  getResults,
  reloadSearch
} = require("../controllers/searchController");

router.get("/", getResults);

router.get("/reload", reloadSearch);

module.exports = router;
