const Doctor = require('../../../models/Doctor');


const getDoctors =  async (req, res) => {
    const doctors = await Doctor.find()   
    
    res.json(doctors);
};

module.exports = {
    getDoctors
}