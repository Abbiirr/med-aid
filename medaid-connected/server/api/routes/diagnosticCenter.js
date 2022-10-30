const express = require("express");
const router = express.Router();

const {
    getCenter,
    setCenter,
    putCenter,
    deleteCenter,
} = require("../controllers/DiagnosticCenter/diagnosticCenterController");

//

router.get("/", getCenter);

router.post("/", setCenter);

router.put("/:id", putCenter);

router.delete("/:id", deleteCenter);

//


module.exports = router;