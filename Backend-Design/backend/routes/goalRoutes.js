const express = require('express');
const router = express.Router();
const {getGoals, setGoals, putGoals, deleteGoals} = require('../controllers/goalController');


router.get('/', getGoals);
//router.get('/', getDoctors);

router.post('/', setGoals);
//router.post('/', setDoctors);

router.put('/:id', putGoals);

router.delete('/:id', deleteGoals);


module.exports = router;