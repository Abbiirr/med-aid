const center_schema = require('../../../models/DiagnosticCenter');

//

//--------- main med-aid get set delete update for disease------------------------
const getCenter= async (req, res) => {
    const centers = await center_schema.find()   
    
    res.json(centers);
};

const setCenter = async (req, res) => {

    const center = await center_schema.create({
        name: req.body.name,
        // tests: [{
        //     test_name: req.body.test_name, 
        //     test_cost: req.body.test_cost
        // }],
        location: req.body.location,
    })

    console.log(req.body);
    res.json(center);
};

const putCenter = async (req, res) => {
    const center = await center_schema.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        tests: [{
            test_name: req.body.test_name, 
            test_cost: req.body.test_cost
        }],
        location: req.body.location,
      },
      { new: true }
    );

    res.json(disease);
};

const deleteCenter = async (req, res) => {
    const center = await center_schema.findByIdAndDelete(req.params.id)
    center.delete();
    res.json(center);
};

//


module.exports = {
    getCenter,
    setCenter,
    putCenter,
    deleteCenter,
};