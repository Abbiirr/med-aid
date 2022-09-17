const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    weight: {
        type: Number
    },
    bloodGroup: {
        type: String
    }
})

module.exports = mongoose.model("patient_schema",patientSchema)