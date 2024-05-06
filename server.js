"use strict";
require("dotenv").config();
require("@babel/polyfill");
require("@babel/register");
const app = require("./app").default;
const http = require("http");
const server = http.createServer(app);
const port = process.env.APP_PORT
server.listen(port);
server.on("listening", () => {
  console.log(`backend running on port - ${port}`);
});
