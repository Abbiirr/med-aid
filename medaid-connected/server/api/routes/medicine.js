const express = require("express");
const router = express.Router();

const {
  getMedicines,
  getSpecificMedicine,
  setMedicine,
  putMedicine,
  deleteMedicine,
} = require("../controllers/Medicine/medicineController");

//
router.get("/", getMedicines)

router.get("/findMedicine", getSpecificMedicine);   

router.post("/", setMedicine);

router.put("/:id", putMedicine);

router.delete("/:id", deleteMedicine);

//

module.exports = router;
