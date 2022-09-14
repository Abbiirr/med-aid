const asyncHandler = require('express-async-Handler')
const Goal = require('../models/goalModel')

//const User = require('../models/userModel')


//---------example get set update delete------------------------
const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find()   
    
    res.json(goals);
});

const setGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.create({
        text: req.body.text,
    })

    console.log(req.body.text);
    res.json(goal);
});

const putGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400)
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.json(updateGoal);
});

const deleteGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400)
    }

    await goal.remove();

    res.json({message: `deleted ${req.params.id}`});
});

//----------------------------------------------------------------


module.exports = {
    getGoals,
    setGoals,
    putGoals,
    deleteGoals
}