const mongoose = require("mongoose");

const dbConnection = function (url) {
  try {
    mongoose.connect(url).then(() => {
      console.log("db is connected");
    });
  } catch (error) {
    console.log("db is not connected");
  }
};

module.exports = dbConnection;
