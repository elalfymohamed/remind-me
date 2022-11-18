const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

const { endpoints } = require("./src/index.router.js");

endpoints(app);

exports.connectDB = async () => {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

connectDB();

mongoose.connection.on("error", (err) => {
  connectDB();
  console.log(err);
});
