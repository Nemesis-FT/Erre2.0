import Routes from "./Routes";
import './App.css';
import {AppContext} from "./libs/Context"
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Bluelib, Footer} from "@steffo/bluelib-react";

function App() {
    const [instanceIp, setInstanceIp] = useState("");
    const [connected, setConnected] = useState(false);
    const [token, setToken] = useState("")
    let history = useHistory();

    useEffect(() => {
        onLoad();
    }, [history]);

    function onLoad() {
        if (localStorage.getItem("instanceIp" && history)) {
            setInstanceIp(localStorage.getItem("instanceIp"))
            setConnected(true)
            history.push("/erre2/" + instanceIp)
        }
    }

    return (
        <Bluelib theme={"amber"}>
            <div className="App">
                <AppContext.Provider value={{instanceIp, setInstanceIp, connected, setConnected, token, setToken}}>
                    <Routes/>


                </AppContext.Provider>
            </div>
            <div className="Fermitech-Footer">
                <Footer>Erre2, Erre2.0, Erre2-Navigator sono software di Fermitech Softworks.
                <p>Erre2-Navigator usa BlueLib di Stefano Pigozzi.</p>
                <p>Fermitech-Softworks non si assume alcuna responsabilità per i contenuti
                caricati su istanze private.</p></Footer>
            </div>
        </Bluelib>
    );
}
export default App;
