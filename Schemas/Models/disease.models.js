const mongoose = require("mongoose")

const diseaseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    variant: {
        type: String
    },
    diseaseType: {
        type: String
    },
    symptoms: [{
        symptom:{
            type: String
        }
    }]
})

module.exports = mongoose.model("diseases_schema",diseaseSchema)