import React, {useEffect, useState} from "react";
import Style from "../Homepage.module.css";
import {
    Anchor,
    Heading, Image, Button
} from "@steffo/bluelib-react";
import {useParams} from "react-router-dom";
import schema from "../../config";


export default function Download(props) {
    const {url} = useParams();
    const {sid} = useParams();
    const [filename, setFilename] = useState(null)

    useEffect(e => (
        download()
    ), [sid])

    async function download() {
        const response = await fetch(schema + url + "/summary/download/" + sid, {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            console.debug(values)
            setFilename(values.filename)
            let win = window.open(schema + url + "/files/" + values.filename)
            if(!win || win.closed || typeof win.closed=='undefined')
            {
                alert("Il tuo dispositivo sta bloccando i popup. Per usare al meglio Erre2, disattiva questa opzione.")
                window.location.href=schema + url + "/files/" + values.filename
            }
        }
    }

    return (
        <div className={Style.Home}>
            <div className={Style.lander}>
                <Heading level={1}>Ciao!</Heading>
                <p className="text-muted">Il download del riassunto dovrebbe partire a breve...</p>
                <p><Anchor href={"/erre2/" + url}>Visita questa istanza di Erre2.</Anchor></p>
                <p><Anchor href={"/"}>Torna alla home.</Anchor></p>
            </div>
        </div>
    );
}