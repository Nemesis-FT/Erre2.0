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
import {faEdit, faUpload} from "@fortawesome/free-solid-svg-icons";
import ProfilePanel from "../Users/ProfilePanel";


export default function SummaryEntry(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [mode, setMode] = useState("")

    async function editFun(){
        setMode("edit")
        props.setExtend(true)
    }
    async function updateFun(){
        setMode("update")
        props.setExtend(true)
    }
    async function close(){
        setMode("")
        props.setExtend(false)
    }

    return (
        <div>
            <Panel>

                <div>
                    {props.summary.name} ({props.summary.course.name}) <br/>{props.summary.author.name} {props.summary.author.surname}
                </div>
                <Chapter>
                    <div>
                    <Button onClick={e => editFun()}><FontAwesomeIcon icon={faEdit}/></Button></div>
                    <div>
                    <Button onClick={e => updateFun()}><FontAwesomeIcon icon={faUpload}/></Button></div>
                </Chapter>
                {mode == "edit" && (
                    <div>

                    </div>
                )}
                {mode == "update" &&(
                    <div>

                    </div>
                )}
                {mode != "" && (
                    <div>
                        <Button onClick={e => close()}>Chiudi</Button>
                    </div>
                )}
            </Panel>
        </div>
    );
}