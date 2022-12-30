const queue_schema = require("../../../models/Queue");

//

//--------------------------------
const getQueue = async (req, res) => {
  const queue = await queue_schema.find();
  res.json(queue);
};

//

module.exports = {
  getQueue,
  
};
