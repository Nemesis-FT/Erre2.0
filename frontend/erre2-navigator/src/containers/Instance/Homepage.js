import React, {useEffect, useState} from "react";
import Style from "./Homepage.module.css";
import {Box, Button, Chapter, Heading, LayoutFill, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {useParams} from "react-router-dom"


export default function Home() {
    const {url} = useParams();
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {server, setServer} = useState(null)
    let history = useHistory();

    useEffect(() => {
        if (instanceIp !== url) {
            setInstanceIp(url)
            setConnected(true)
            localStorage.setItem("instanceIp", url);
        }
    })

    async function gather_data(){
        const response = await fetch("http://"+instanceIp + "/server/planetarium", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            console.debug(values.server)
            setServer({
                name: values.server.name,
                university: values.server.university,
                type: values.type,
                version: values.version,
            })
            console.debug(server)
        }
    }

    async function disconnect() {
        setInstanceIp(null);
        setConnected(null);
        localStorage.removeItem("instanceIp");
        history.push("/")
    }

    return (
        <div className={Style.Home}>
            <div className={Style.lander}>
                <Heading level={1}>{instanceIp}</Heading>
                <p className="text-muted">La webapp veloce e reattiva per consultare i repository online di riassunti
                    gratuiti.</p>
            </div>
            <Button children={"Disconnettiti"} onClick={e => disconnect()}>

            </Button>
        </div>
    );
}