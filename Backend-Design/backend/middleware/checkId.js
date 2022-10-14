const mongoose = require("mongoose");

module.exports = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    console.log("Not a valid user id");
    let e = new Error();
    e.status = 400;
    throw e;
  }
};
