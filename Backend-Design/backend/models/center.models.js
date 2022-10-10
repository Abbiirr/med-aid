const mongoose = require("mongoose");

const centerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("center_schema", centerSchema);
