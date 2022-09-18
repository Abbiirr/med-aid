const mongoose = require("mongoose")

const diseaseSchema = mongoose.Schema({
    name: {
        type: String
    },
    variant: {
        type: String
    },
    diseaseType: {
        type: String
    },
    //symptom needs a different schema
    //symptoms: [String]
})

module.exports = mongoose.model('disease_schema', diseaseSchema)