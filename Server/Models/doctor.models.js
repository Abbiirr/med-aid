const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
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
    specialities:[{
        speciality:{
            type: String
        }
    }],
    chamberAddress: {
        type: String
    },
    qualification: [{
        degree: {
            type: String
        },
        year: {
            type: Date
        }
    }],
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("doctor_schema",doctorSchema)