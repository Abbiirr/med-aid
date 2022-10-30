const medicine_schema = require('../../../models/Medicine');

//

//--------- main med-aid get set delete update for disease------------------------
const getMedicines = async (req, res) => {
    const medicines = await medicine_schema.find()   
    
    res.json(medicines);
};

const setMedicine = async (req, res) => {

    const medicine = await medicine_schema.create({
        //------------------------
    })

    console.log(req.body);
    res.json(medicine);
};

const putMedicine = async (req, res) => {
    const medicine = await medicine_schema.findByIdAndUpdate(
      req.params.id,
      {
       //----------------
      },
      { new: true }
    );

    res.json(medicine);
};

const deleteMedicine = async (req, res) => {
    const medicine = await medicine_schema.findByIdAndDelete(req.params.id)
    center.delete();
    res.json(medicine);
};

//


module.exports = {
    getMedicines,
    setMedicine,
    putMedicine,
    deleteMedicine,
};