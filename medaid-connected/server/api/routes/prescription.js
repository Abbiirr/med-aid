const express = require('express')
const router = express.Router()

const {
    getPrescription,
    setPrescription,
    putPrescription,
    deletePrescription,
} = require("../controllers/Prescription/prescriptionController");

//

router.get("/", getPrescription);

router.post("/", setPrescription);

router.put("/:id", putPrescription);

router.delete("/:id", deletePrescription);

//


module.exports = router