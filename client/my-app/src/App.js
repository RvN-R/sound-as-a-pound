import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { GbpData } from "./Data";
import LineChart from "./components/LineChart";

function App() {
  const [mongoDbResponseData, setMongoDbResponseData] = useState([]);
  const [GbpTemplate, setGbpTemplate] = useState(GbpData);
  const [graphData, setGraphData] = useState(Chart);

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
              label: "Value of GBP against USD",
              data: value,
              backgroundColor: "red",
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
          label: "Value of GBP against Euro",
          data: GbpData.map((data) => data.value),
          backgroundColor: "red",
        },
      ],
    };
    return theChart;
  }

  useEffect(() => {
    Chart();
  }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/").then((response) => {
  //     setMongoDbResponseData(response.data);
  //   });
  // }, []);

  return (
    <div className="App">
      <h1>List of Data from MongoDb</h1>

      {/* {mongoDbResponseData.map((val, key) => {
        return (
          <div>
            <ul>
              <li>£{val.value}</li>
              <li>{val.date}</li>
            </ul>
          </div>
        );
      })} */}
      <div>
        <LineChart chartData={graphData} />
      </div>
    </div>
  );
}

export default App;
