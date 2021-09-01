import logo from './logo.svg';
import Routes from "./Routes";
import './App.css';
import {AppContext} from "./libs/Context"
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Bluelib} from "@steffo/bluelib-react";

function App() {
  const [instanceIp, setInstanceIp] = useState("");
  const [connected, setConnected] = useState(false);
  let history = useHistory();

  useEffect(() => {
    onLoad();
  }, [history]);

  function onLoad(){
    if(localStorage.getItem("instanceIp" && history)){
        setInstanceIp(localStorage.getItem("instanceIp"))
        setConnected(true)
        history.push("/erre2/"+instanceIp)
    }
  }

  return (
      <Bluelib theme={"sophon"}>
        <div className="App">
          <AppContext.Provider value={{instanceIp, setInstanceIp, connected, setConnected}}>
              <Routes/>
          </AppContext.Provider>
        </div>
      </Bluelib>
  );
}

export default App;
