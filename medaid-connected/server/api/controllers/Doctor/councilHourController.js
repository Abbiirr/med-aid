const Council = require("../../../models/Council");
const CheckId = require("../../middleware/CheckId");

// Appointment Requests
const getCouncilHour = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    // await CheckId(id);
    // var o_id = new ObjectId(id);
    const results = await Council.find({ _id: id });
    if (!results.length)
      return res.status(404).json({
        status: false,
        message: "Request not found",
      });

    res.status(200).json({
      status: true,
      requests: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  getCouncilHour,
};
