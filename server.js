const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/orders", (req, res, next) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(400).json("Invalid Request");
    } else {
      req.body.data = decoded._id;
      next();
    }
  });
});

app.use("/", userRoutes);
app.use("/orders", orderRoutes);

mongoose
  .connect(process.env.mongoURI)
  .then((res) => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`server Started http://localhost:${process.env.PORT}`)
    );
  })
  .catch((e) => console.log(e));
