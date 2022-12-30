const mongoose = require("mongoose");

const queueSchema = mongoose.Schema({
  listOfPatients : [
    {
        type: String
    }
]
});

const Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;