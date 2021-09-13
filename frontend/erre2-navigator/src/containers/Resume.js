import React, {useEffect} from "react";
import {useAppContext} from "../libs/Context";
import {useHistory} from "react-router-dom";


export default function Resume(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const history = useHistory()

    useEffect(e=>(
        onLoad()
    ))

    async function onLoad(){
        let address = localStorage.getItem("instanceIp")
        if(address){
            setInstanceIp(address)
            setConnected(true)
            history.push("/erre2/"+address)
        }
        else{
            history.push("/")
        }
    }

    return (
        <div>
        </div>
    );
}