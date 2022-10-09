import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

import { endpoints } from "./src/index.router.js";

endpoints(app);

export const connectDB = async () => {
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
