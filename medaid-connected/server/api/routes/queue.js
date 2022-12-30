const express = require("express");
const router = express.Router();

const {
    getQueue
} = require("../controllers/Queue/QueueController");

//

router.get("/", getQueue);

//


module.exports = router;