const mongoose = require("mongoose");

const remainingTimeSchema = mongoose.Schema({
  time : [
    {
        type: String
    }
  ]
});

const RemainingTime = mongoose.model("RemainingTime", remainingTimeSchema);

module.exports = RemainingTime;