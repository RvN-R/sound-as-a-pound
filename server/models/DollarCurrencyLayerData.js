const mongoose = require("mongoose");

const CurrencyLayerDollarDataSchemea = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const DollarCurrencyData = mongoose.model(
  "DollarCurrencyData",
  CurrencyLayerDollarDataSchemea
);
module.exports = DollarCurrencyData;
