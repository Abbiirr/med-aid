const time_schema = require("../../../models/RemainingTime");

//

//--------- main med-aid get set delete update for disease------------------------
const getTime = async (req, res) => {
  const time = await time_schema.find();
  res.json(time);
};


const setTime = async (req, res) => {
  //const errors = validationResult(req)

  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() })
  // }
  console.log(typeof req.body.symptoms);

  const time = await time_schema.create({
    time: req.body.time
  });

  console.log(req.body);
  res.json(time);
};

//

module.exports = {
  getTime,
  setTime
};
