const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();

const CURRENCY_LAYER_CALL = process.env.CURRENCY_LAYER_CALL;

// const url = "https://api.apilayer.com/currency_data/live?source=USD";
// const requestOptions = {
//   method: "GET",
//   headers: {
//     apikey: `${CURRENCY_LAYER_CALL}`,
//   },
//   redirect: "follow",
// };

// const CurrencyLayerFetch = fetch(url, requestOptions)
//   .then((res) => {
//     return res.json();
//   })
//   .then((json) => {
//     const FetchedCurrency = json.quotes;
//     console.log(FetchedCurrency);
//   });

// module.exports = CurrencyLayerFetch;

async function CurrencyLayerFetch() {
  const url = "https://api.apilayer.com/currency_data/live?source=USD";
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

module.exports = CurrencyLayerFetch;
