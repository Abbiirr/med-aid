const { Schema , model} = require("mongoose");

const diagnosticCenterSchema = new Schema({
      name: {
        type: String,
      },
      tests: [
        {
            test_name: String,
            test_cost: Number
        }
      ],
      location:{
          type: String,
      },
})


const DiagnosticCenter = model('DiagnosticCenter' , diagnosticCenterSchema);
module.exports = DiagnosticCenter;