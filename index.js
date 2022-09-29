const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      `${MONGO_URL}`,
      connectionParams
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("Database failed to connect");
  }
});

database();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
