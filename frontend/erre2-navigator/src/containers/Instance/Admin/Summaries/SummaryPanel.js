import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {Box, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import SummaryEntry from "./SummaryEntry";
import SummaryCreate from "./SummaryCreate";
import schema from "../../../config";


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

    async function onLoad() {
        const response = await fetch(schema + instanceIp + "/summary/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
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
            <Panel>
                <Box>
                    <div className={extend ? (Style.ScrollableExtendedShorter) : (Style.Scrollable)}>
                        {summaries.map(summary => <SummaryEntry summary={summary} setReload={setReload} reload={reload}
                                                                setExtend={setExtend} isAdmin={props.isAdmin}
                                                                user={props.user}/>)}
                    </div>
                </Box>
                <SummaryCreate user={props.user} reload={reload} setReload={setReload}/>
            </Panel>
        </div>
    );
}