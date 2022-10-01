const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const CurrencyLayerModel = require("./models/CurrencyLayerData");
const CurrencyLayerResponse = require("./api/CurrencyLayerCall");

app.use(express.json());
app.use(cors());

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
});

/// look at postToMonogo below for possible inspiration on how to assign the GBP value from CurrencyLayerResponse to a GBP value that can go into currency Data
async function getCurrencyLayerResponse() {
  console.log(await CurrencyLayerResponse());
}

getCurrencyLayerResponse();

async function postToMongo() {
  const currencyData = new CurrencyLayerModel({
    value: 2.0,
    day: 01,
    month: 10,
    year: 2022,
    time: "16:17",
  });

  try {
    await currencyData.save();
    console.log("Data Saved");
  } catch (err) {
    console.log(err);
  }
}

app.get("/", async (req, res) => {
  CurrencyLayerModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//database function connects to mongo db and was a method I learned in a video
// const database = (module.exports = () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   try {
//     mongoose.connect(
//       `${MONGO_URL}`,
//       connectionParams
//     );
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.log(error);
//     console.log("Database failed to connect");
//   }
// });

// database();

// comment postToMongo() out unless you want to constantly post to MongoDB everytime you refresh or make changes to index.js in the server folder
// postToMongo();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
