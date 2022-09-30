const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

const CurrencyLayerModel = require("./models/CurrencyLayerData");

app.use(express.json())
app.use(cors())

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(
  `${MONGO_URL}`, 
{
  useNewUrlParser: true
}
);

// Below function posts to the database I need to better utalise this to post when a function is called. 
// app.get('/', async (req, res) => {
//   const currencyData = new CurrencyLayerModel({"value": 0.973, "day": 30, "month": 09, "year": 2022, "time": "08:53"})

//   try{
//     await currencyData.save();
//   }catch(err){
//     console.log(err);
//   }
// });

// 16:41 in the video he mentions how to get specific data from MongoDB cluster, this will be useful when I want to get the value and compare that against the GBP value from the API
app.get('/', async(req,res) => {
  CurrencyLayerModel.find({},(err, result) => {
    if(err){
      res.send(err)
    }
    res.send(result)
  })
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
