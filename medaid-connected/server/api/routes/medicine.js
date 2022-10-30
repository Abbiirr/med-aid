const express = require("express");
const router = express.Router();

const {
    getMedicines,
    setMedicine,
    putMedicine,
    deleteMedicine,
} = require("../controllers/Medicine/medicineController");

//

router.get("/", getMedicines);

router.post("/", setMedicine);

router.put("/:id", putMedicine);

router.delete("/:id", deleteMedicine);

//


module.exports = router;
