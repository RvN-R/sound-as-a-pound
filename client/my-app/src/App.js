import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
//local host doesn't work because I need to not use GitPod
  useEffect(() => {
    Axios.get('https://3000-rvnr-soundasapound-txgnbz53dnq.ws-eu67.gitpod.io/').then((response) => {
      console.log(response)
    })
  },[])

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
    </div>
  );
}

export default App;
