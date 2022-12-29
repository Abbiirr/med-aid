const prescription_schema = require('../../../models/Prescription');

//

//--------- main med-aid get set delete update for disease------------------------
const getPrescription= async (req, res) => {
    const prescriptions = await prescription_schema.find()   
    
    res.json(prescriptions);
};

const setPrescription = async (req, res) => {

    const prescription = await prescription_schema.create({
      patient_id: req.body.selectedPatient,
      doctor_id: req.body.doctorName,
      medicines: req.body.arrOfoptions,
      instructions: req.body.instructions,
    });

    console.log(req.body);
    res.json(prescription);
};

const putPrescription = async (req, res) => {
    const prescription = await prescription_schema.findByIdAndUpdate(
      req.params.id,
      {
        patient_id: req.body.patient_id,
        doctor_id: req.body.doctor_id,
        medicines: [req.body.medicines],
        instructions: [req.body.instructions]
      },
      { new: true }
    );

    res.json(prescription);
};

const deletePrescription = async (req, res) => {
    const prescription = await prescription_schema.findByIdAndDelete(req.params.id)
    prescription.delete();
    res.json(prescription);
};

//


module.exports = {
    getPrescription,
    setPrescription,
    putPrescription,
    deletePrescription,
};