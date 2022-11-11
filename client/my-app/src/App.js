import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { GbpData } from "./Data";
import LineChart from "./components/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [mongoDbResponseData, setMongoDbResponseData] = useState([]);
  console.log(mongoDbResponseData.date);
  const [graphData, setGraphData] = useState(Chart);
  const [dollarMode, setDollarMode] = useState(false);

  function Chart() {
    let date = [];
    let value = [];

    Axios.get("http://localhost:3001/")
      .then((res) => {
        for (const dataObj of res.data) {
          date.push(dataObj.date);
          value.push(dataObj.value);
        }
        setGraphData({
          labels: date,
          datasets: [
            {
              label: "Value Of GBP Against USD",
              data: value,
              backgroundColor: "rgba(33,208,178,0.5)",
              borderColor: "rgba(29,205,254,1)",
              borderJoinStyle: "bevel",
              pointBackgroundColor: "rgba(29,205,254,1)",
              fill: true,
              pointHoverBackgroundColor: "rgba(47,69,92,1)",
              pointHoverBorderColor: "rgba(29,205,254,1)",
              pointHoverBorderWidth: "15",
              pointStyle: "circle",
              hitRadius: "5",
              titleColor: "white",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const theChart = {
      labels: GbpData.map((data) => data.date),
      datasets: [
        {
          label: "Value Of GBP Against USD",
          data: GbpData.map((data) => data.value),
          backgroundColor: "rgba(33,208,178,0.5)",
          borderColor: "rgba(29,205,254,1)",
          borderJoinStyle: "bevel",
          pointBackgroundColor: "rgba(29,205,254,1)",
          fill: true,
          pointHoverBackgroundColor: "rgba(47,69,92,1)",
          pointHoverBorderColor: "rgba(29,205,254,1)",
          pointHoverBorderWidth: "15",
          pointStyle: "circle",
          hitRadius: "5",
          titleColor: "white",
        },
      ],
    };
    return theChart;
  }

  function dollarModeFunc() {
    setDollarMode((prevMode) => !prevMode);
  }

  useEffect(() => {
    Chart();
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setMongoDbResponseData(response.data[0]);
      console.log(response.data[0]);
    });
  }, []);

  return (
    <div className="App">
      <div className={dollarMode ? "dollar-container" : "container"}>
        <div className="header">
          <h2 className={dollarMode ? "ggbridge" : "caribbean_green"}>
            Started posting GBP value on <u>{mongoDbResponseData.date}</u>
          </h2>
          <h3 className={dollarMode ? "ochre" : "sea_green_crayola"}>
            Follow us on Twitter{" "}
            <a
              href="https://twitter.com/sound_as_apound"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} /> @sound_as_apound
            </a>
          </h3>
          <div className={dollarMode ? "dollar-h1-container" : "h1-container"}>
            <h1 className={dollarMode ? "flame" : "vivid_sky_blue"}>
              @SOUNDASAPOUND
            </h1>
          </div>
          <div className={dollarMode ? "dollar-toggler" : "toggler"}>
            <p className="toggler--light">£</p>
            <div
              className={
                dollarMode ? "dollar-toggler--slider" : "toggler--slider"
              }
              onClick={dollarModeFunc}
            >
              <div className="toggler--slider--circle"></div>
            </div>
            <p className="toggler--dark">$</p>
          </div>
          <h4 className={dollarMode ? "ggbridge" : "caribbean_green"}>
            Started posting GBP value on <u>{mongoDbResponseData.date}</u>
          </h4>
        </div>

        <div className="chart-container">
          <LineChart chartData={graphData} />
        </div>
      </div>
    </div>
  );
}

export default App;
