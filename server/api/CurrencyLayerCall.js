const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();

const CURRENCY_LAYER_CALL = process.env.CURRENCY_LAYER_CALL;

const url = "https://api.apilayer.com/currency_data/live?source=USD";
const requestOptions = {
  method: "GET",
  headers: {
    apikey: `${CURRENCY_LAYER_CALL}`,
  },
  redirect: "follow",
};

const CurrencyLayerFetch = fetch(url, requestOptions)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    // This is pulling the GBP from Currency Layer API
    console.log(json.quotes.USDGBP);
  });
