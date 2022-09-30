import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [mongoDbResponseData, setMongoDbResponseData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      console.log(response);
      setMongoDbResponseData(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>List of Data from MongoDb</h1>
      {mongoDbResponseData.map((val, key) => {
        return (
          <div>
            <ul>
              <li>£{val.value}</li>
              <li>{val.day}</li>
              <li>{val.month}</li>
              <li>{val.time}</li>
              <li>{val.year}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
