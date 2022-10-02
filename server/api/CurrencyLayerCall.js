const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();

const CURRENCY_LAYER_CALL = process.env.CURRENCY_LAYER_CALL;

async function CurrencyLayerFetch() {
  // URL below returns all the currencies
  // const url = "https://api.apilayer.com/currency_data/live?source=USD";
  // URL below returns GBP
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
    return response.quotes.USDGBP;
  } catch (err) {
    console.log(err);
  }
}

// async function printCurrencyLayerResponse() {
//   console.log(await CurrencyLayerFetch());
// }

// printCurrencyLayerResponse();

module.exports = CurrencyLayerFetch;
