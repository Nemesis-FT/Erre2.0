import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Chapter, Heading, ListUnordered, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import Style from "./Summary.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudDownloadAlt, faUser, faHistory, faAt} from "@fortawesome/free-solid-svg-icons";
import Commit from "./Commit";


export default function Summary(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const [courseList, setCourseList] = useState([])
    const [showAuthor, setShowAuthor] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    let history = useHistory();

    async function download() {
        const response = await fetch("http://" + instanceIp + "/summary/download/" + props.summary.sid, {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            console.debug(values)
            window.open("http://" + instanceIp + "/files/" + values.filename)
        }
    }


    return (
        <div>
            <Box>
                <Chapter>
                    <Panel>
                        {props.summary.name}
                    </Panel>
                    <Panel>
                        {props.summary.downloads} Download
                    </Panel>
                </Chapter>
                <Chapter>
                    <div><Anchor onClick={(e) => {
                        download()
                    }}><FontAwesomeIcon icon={faCloudDownloadAlt} label={"Download"}/></Anchor></div>
                    <div>
                        <Anchor onClick={(e) => {
                            setShowAuthor(!showAuthor)
                        }}><FontAwesomeIcon icon={faUser} label={"Autore"}/></Anchor>
                    </div>
                    <div>
                        <Anchor onClick={(e) => {
                            setShowHistory(!showHistory)
                        }}><FontAwesomeIcon icon={faHistory} label={"Changelog"}/></Anchor>
                    </div>
                </Chapter>
                <div className={Style.Animated}>
                    {showAuthor ? (
                        <Panel>
                            <Heading level={4}>Informazioni sull'autore</Heading>
                            <p>
                                {props.summary.author.name} {props.summary.author.surname} <Anchor
                                href={"mailto:" + props.summary.author.email}><FontAwesomeIcon icon={faAt} label={"Manda email"}/></Anchor>
                            </p>
                        </Panel>
                    ) : (
                        <div></div>
                    )}
                    {showHistory ? (
                        <Panel>
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