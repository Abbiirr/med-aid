const Medicine = require("../../../models/Medicine");

//

//--------- main med-aid get set delete update for disease------------------------
const getMedicines = async (req, res) => {
  const medicines = await Medicine.find();

  res.json(medicines);
};

const setMedicine = async (req, res) => {
  try {
    const { name, price } = req.body;

    const check = await Medicine.findOne({ name: name }).exec();

    if (check)
      return res.status(208).json({
        status: false,
        message: "This medicine already exists.",
      });

    const newMedicine = await Medicine.create({
      name: name,
      price: price,
    });
    const createMedicine = await newMedicine.save();

    console.log(req.body);
    res.json(newMedicine);
    if (createMedicine)
      return res.status(201).json({
        status: true,
        message: "New Medicine have been added.",
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

const putMedicine = async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    {
      //----------------
    },
    { new: true }
  );

  res.json(medicine);
};

const deleteMedicine = async (req, res) => {
  const medicine = await Medicine.findByIdAndDelete(req.params.id);
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
