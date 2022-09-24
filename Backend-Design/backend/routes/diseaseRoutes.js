const express = require("express");
const router = express.Router();

const {
    getDiseases,
    setDisease,
    putDisease,
    deleteDisease,
} = require("../controllers/diseaseController");

//

router.get("/", getDiseases);

router.post("/", setDisease);

router.put("/:id", putDisease);

router.delete("/:id", deleteDisease);

//


module.exports = router;
