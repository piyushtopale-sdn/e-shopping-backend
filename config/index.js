const mongoose = require("mongoose");
require("dotenv").config();

const ENVR = parseInt(process.env.ENVR);

console.log("**************************** Connecting to Database **************************");
if ( ENVR === 0) {
  mongoose
    .connect(process.env.DB_LOCAL)
    .then((success) => {
      console.log("**************************** Connection Success **************************");
    })
    .catch((error) => {
      console.log("**************************** Connection Failed **************************",error);
    });
}
if (ENVR === 1) {
  mongoose
    .connect(process.env.DB_STAGING)
    .then((success) => {
      console.log("**************************** Connection Success **************************");
    })
    .catch((error) => {
      console.log("**************************** Connection Failed **************************",error);
    });
}


module.exports = mongoose;
