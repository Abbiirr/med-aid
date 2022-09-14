const express = require('express');
const router = express.Router();
const {getDoctors, setDoctors} = require('../controllers/doctorController');


router.get('/', getDoctors);

router.post('/', setDoctors);

//router.put('/:id', putDoctors);

//router.delete('/:id', deleteDoctor);


module.exports = router;