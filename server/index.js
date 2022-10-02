const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const CurrencyLayerModel = require("./models/CurrencyLayerData");
const { response } = require("express");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use(express.json());
app.use(cors());

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const CURRENCY_LAYER_CALL = process.env.CURRENCY_LAYER_CALL;

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
});

let todaysDate = "";

async function getCurrencyLayerResponse() {
  const url =
    "https://api.apilayer.com/currency_data/live?source=USD&currencies=GBP";
  const requestOptions = {
    method: "GET",
    headers: {
      apikey: `${CURRENCY_LAYER_CALL}`,
    },
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((res) => res.json())
    .catch((err) => console.error("error" + err));

  try {
    let response = await fetch(url, requestOptions);
    response = await response.json();
    let GBP = response.quotes.USDGBP;
    return GBP;
  } catch (err) {
    console.log(err);
  }
}

async function getTodaysDate() {
  const date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getUTCDate();
  time = date.toLocaleTimeString();
  todaysDate = `${year}-${month}-${day}-${time}`;
  return todaysDate;
}

async function postToMongo() {
  const value = await getCurrencyLayerResponse();
  const date = await getTodaysDate();

  const currencyData = new CurrencyLayerModel({
    value: value,
    date: date,
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

// comment postToMongo() out unless you want to constantly post to MongoDB everytime you refresh or make changes to index.js in the server folder
// postToMongo();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
