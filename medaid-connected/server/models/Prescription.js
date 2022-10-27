const { Schema , model} = require("mongoose");

const prescriptionSchema = new Schema({
    
})


const Prescription = model('Prescription' , prescriptionSchema);
module.exports = Prescription;