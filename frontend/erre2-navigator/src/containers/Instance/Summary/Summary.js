import React, {useState} from "react";
import {Anchor, Box, Button, Chapter, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory} from "react-router-dom";
import Style from "./Summary.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAt, faCloudDownloadAlt, faHistory, faShare, faUser} from "@fortawesome/free-solid-svg-icons";
import Commit from "./Commit";
import schema from "../../config";


export default function Summary(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const [courseList, setCourseList] = useState([])
    const [showAuthor, setShowAuthor] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    let history = useHistory();

    async function download() {
        const response = await fetch(schema + instanceIp + "/summary/download/" + props.summary.sid, {
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
            let win = window.open(schema + instanceIp + "/files/" + values.filename)
            if(!win || win.closed || typeof win.closed=='undefined')
            {
                alert("Il tuo dispositivo sta bloccando i popup. Per usare al meglio Erre2, disattiva questa opzione.")
                window.location.href=schema + instanceIp + "/files/" + values.filename
            }
        }
    }

    async function share(){
        await navigator.share({title:"Erre2-Navigator", text:`${props.summary.name} di ${props.summary.author.name} ${props.summary.author.surname}\n su un'istanza privata di Erre2, la piattaforma distribuita per la condivisione di appunti.`, url:"https://navigator.erre2.fermitech.info/erre2/" + instanceIp + "/download/" + props.summary.sid})
    }


    return (
        <div>
            <Box style={{minWidth: "unset"}}>
                <Chapter>
                    <Panel style={{minWidth: "unset"}}>
                        {props.summary.name}
                    </Panel>
                    <Panel style={{minWidth: "unset"}}>
                        {props.summary.downloads} <FontAwesomeIcon icon={faCloudDownloadAlt}/>
                    </Panel>
                </Chapter>
                <Chapter>
                    <div><Button onClick={(e) => {
                        download()
                    }} customColor={"#E0C097"}><FontAwesomeIcon icon={faCloudDownloadAlt}
                                                                           label={"Download"}/></Button></div>
                    <div><Button onClick={(e) => {
                        share()
                    }} customColor={"#E0C097"}><FontAwesomeIcon icon={faShare}
                                                                           label={"Condividi"}/></Button></div>
                    <div>

                        <Button onClick={(e) => {
                            setShowAuthor(!showAuthor)
                        }} customColor={"#E0C097"}><FontAwesomeIcon icon={faUser} label={"Autore"}/></Button>
                    </div>
                    <div>
                        <Button onClick={(e) => {
                            setShowHistory(!showHistory)
                        }} customColor={"#E0C097"}><FontAwesomeIcon icon={faHistory}
                                                                               label={"Changelog"}/></Button>
                    </div>
                </Chapter>
                <div className={Style.Animated}>
                    {showAuthor ? (
                        <Panel style={{minWidth: "unset"}}>
                            <Heading level={4}>Informazioni sull'autore</Heading>
                            <p>
                                {props.summary.author.name} {props.summary.author.surname} <Anchor
                                href={"mailto:" + props.summary.author.email}><FontAwesomeIcon icon={faAt}
                                                                                               label={"Manda email"}/></Anchor>
                            </p>
                        </Panel>
                    ) : (
                        <div></div>
                    )}
                    {showHistory ? (
                        <Panel style={{minWidth: "unset"}}>
                            <Heading level={4}>Changelog</Heading>
                            <div className={Style.Scrollable}>
                                {props.summary.commits.map(commit => <Commit commit={commit}/>)}
                            </div>
                        </Panel>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Box>
        </div>
    );
}