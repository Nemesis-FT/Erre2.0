import Routes from "./Routes";
import './App.css';
import {AppContext} from "./libs/Context"
import React, {useState} from "react";
import {Footer, LayoutThreeCol, useBluelibInBody} from "@steffo/bluelib-react";


function App() {
    const [instanceIp, setInstanceIp] = useState("");
    const [connected, setConnected] = useState(false);
    const [token, setToken] = useState("")
    
    useBluelibInBody("amber");

    return <>
        <LayoutThreeCol>
            <LayoutThreeCol.Center>
        <div className="App">
            <AppContext.Provider value={{instanceIp, setInstanceIp, connected, setConnected, token, setToken}}>
                <Routes/>


            </AppContext.Provider>

        </div>
            </LayoutThreeCol.Center>
        </LayoutThreeCol>
        <div className="Fermitech-Footer">
            <Footer>Erre2, Erre2.0, Erre2-Navigator sono software di Fermitech Softworks.
            <p>Erre2-Navigator usa <a href={"https://github.com/Steffo99/bluelib-react"}>bluelib-react</a> di Steffo.</p>
            <p>Fermitech-Softworks non si assume alcuna responsabilità per i contenuti
            caricati su istanze private.</p></Footer>
        </div>
    </>
}
export default App;
