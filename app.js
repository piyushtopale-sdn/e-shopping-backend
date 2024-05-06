import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Route Imports
import adminroute from "./routes/admin/adminRoute";


const app = express();

require("dotenv").config();
require("./config/index");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  try {
    let oldSend = res.send;
    res.send = function (status) {
      const obj = JSON.parse(status);
    //   logger.info(obj.message,{user_id: req._id});
      oldSend.apply(res, arguments);
    };
  } catch (e) {
    // logger.error(e.message, { user_id: `${req._id}` });
  }
  next()
});

app.use("/uploads", express.static("uploads"))
app.use("/api/v1/admin", adminroute);


app.get('/', (req, res) => {
  res.send('This is New Build!');
});

export default app;
