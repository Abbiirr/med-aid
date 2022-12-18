const express = require("express");
const router = express.Router();

const {
    getCenter,
    setCenter,
    getSpecificCenter,
    putCenter,
    deleteCenter,
} = require("../controllers/DiagnosticCenter/diagnosticCenterController");

//

router.get("/", getCenter);

router.get("/findCenter", getSpecificCenter)

router.post("/", setCenter);

router.put("/:id", putCenter);

router.delete("/:id", deleteCenter);

//


module.exports = router;