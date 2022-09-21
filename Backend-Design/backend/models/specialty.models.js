const mongoose = require("mongoose");

const specialtySchema = mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
});

module.exports = mongoose.model("specialty_schema", specialtySchema);
