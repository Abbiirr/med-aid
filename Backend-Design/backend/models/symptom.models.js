const mongoose = require("mongoose")

const symptomSchema = mongoose.Schema({
    name: {
        type: String
    },
    id: { 
        type: String 
    },
})

module.exports = mongoose.model('symptom_schema', symptomSchema)

/**
  
{
    "name": "Fever",
    id: "corona", "malaria"
}

{
    "name": "Cough",
    id: "corona", "malaria", "flu"
}

**/
