const express = require("express");
const mongoose = require("mongoose");
const app = express();

const CurrencyLayerModel = require("./models/CurrencyLayerData");

app.use(express.json())

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(
  `${MONGO_URL}`, 
{
  useNewUrlParser: true
}
);

app.get('/', async (req, res) => {
  const currencyData = new CurrencyLayerModel({"value": 0.973, "day": 30, "month": 09, "year": 2022, "time": "08:53"})

  try{
    await currencyData.save();
  }catch(err){
    console.log(err);
  }
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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
