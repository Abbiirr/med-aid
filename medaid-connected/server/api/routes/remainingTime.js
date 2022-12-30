const express = require("express");
const router = express.Router();

const {
    getTime,
    setTime
} = require("../controllers/RemainingTime/RemainingTimeController");

//

router.get("/", getTime);
router.post("/", setTime);

//


module.exports = router;