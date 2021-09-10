import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {
    Anchor,
    Box,
    Button,
    Chapter,
    Field,
    Footer,
    Form,
    Heading,
    LayoutFill,
    Panel,
    Table
} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserEntry from "../Users/UserEntry";
import SummaryEntry from "./SummaryEntry";
import SummaryCreate from "./SummaryCreate";


export default function SummaryPanel(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [reload, setReload] = useState(false)
    const [summaries, setSummaries] = useState([])
    const [extend, setExtend] = useState(false)

    useEffect(e => (
        onLoad()
    ), [reload])

    async function onLoad(){
        const response = await fetch("http://" + instanceIp + "/summary/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            setSummaries(values.summaries)
        }
    }

    return (
        <div>
            <Heading level={2}>Gestione riassunti</Heading>
            <Box>
                <div className={extend ? (Style.ScrollableExtended) : (Style.Scrollable)}>
                    {summaries.map(summary => <SummaryEntry summary={summary} setReload={setReload} reload={reload}
                                                     setExtend={setExtend}/>)}
                </div>
            </Box>
            <SummaryCreate uid={props.uid} reload={reload} setReload={setReload}/>
        </div>
    );
}