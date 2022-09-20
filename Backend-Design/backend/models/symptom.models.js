const mongoose = require("mongoose")

const diseaseSchema = mongoose.Schema({
    name: {
        type: String
    },
    id: { 
        type: String 
    },
})

module.exports = mongoose.model('disease_schema', diseaseSchema)