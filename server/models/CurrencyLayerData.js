const mongoose = require("mongoose")

const CurrencyLayerDataSchemea = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    day:{
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    time:{
        type: String,
        required:true,
    }

});

const CurrencyData = mongoose.model("CurrencyData", CurrencyLayerDataSchemea)
module.exports = CurrencyData