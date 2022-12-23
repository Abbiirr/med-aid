const Center = require("../../../models/DiagnosticCenter");

//
//let searchedCenter;


//--------- main med-aid get set delete update for disease------------------------
const getCenter = async (req, res) => {
  //searchedCenter = req.query.centerName;
  const centers = await Center.find();

  res.json(centers);
};


const getSpecificCenter = async (req, res) => {
  searchedCenter = req.query.centerName;
  const centers = await Center.find({
    name: { $in: searchedCenter },
  });

  res.json(centers);
};

const setCenter = async (req, res) => {
  try {
    const { name, location } = req.body;

    const check = await Center.findOne({ name: name }).exec();

    if (check)
      return res.status(208).json({
        status: false,
        message: "This Center already exists.",
      });

    const newCenter = await Center.create({
      name: name,
      location: location,
    });
    const createCenter = await newCenter.save();

    console.log(req.body);
    res.json(newCenter);
    if (createCenter)
      return res.status(201).json({
        status: true,
        message: "New Center have been added.",
      });
  } catch (error) {
    if (error) {
      console.log(error);
      //   return res.status(300).json({
      //     status: false,
      //     message: error,
      //   });
      //   next(error);
    }
  }
};

const putCenter = async (req, res) => {
  const center = await Center.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      tests: [
        {
          test_name: req.body.test_name,
          test_cost: req.body.test_cost,
        },
      ],
      location: req.body.location,
    },
    { new: true }
  );

  res.json(disease);
};

const deleteCenter = async (req, res) => {
  const center = await Center.findByIdAndDelete(req.params.id);
  center.delete();
  res.json(center);
};

//

module.exports = {
  getCenter,
  getSpecificCenter,
  setCenter,
  putCenter,
  deleteCenter,
};
