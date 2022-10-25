const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
  },
  // variant: {
  //   type: String,
  // },
  // medicineType: {
  //   type: String,
  // },
  price: {
    type: Number,
  },
  //multiple symptoms needed
  alternative: [
    {
      type: String,
    },
  ],
  //symptom needs a different schema
  //symptoms: [String]
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
