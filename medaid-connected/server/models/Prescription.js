const { Schema , model} = require("mongoose");

const prescriptionSchema = new Schema({
      patient_id: {
        type: String,
      },
      doctor_id: {
        type: String,
      },
      medicines: [
        {
            type: String,
        }
      ],
      instructions: 
      {
        type: String,
      }
      
})


const Prescription = model('Prescription' , prescriptionSchema);
module.exports = Prescription;