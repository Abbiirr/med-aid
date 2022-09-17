const express = require('express');
const router = express.Router();
const {getDoctors, setDoctor, putDoctor, deleteDoctor} = require('../controllers/doctorController');


router.get('/', getDoctors);

router.post('/', setDoctor);

router.put('/:id', putDoctor);

router.delete('/:id', deleteDoctor);


module.exports = router;