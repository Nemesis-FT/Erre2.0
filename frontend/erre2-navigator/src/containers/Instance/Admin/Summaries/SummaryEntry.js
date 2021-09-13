import React, {useState} from "react";
import {Button, Chapter, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUpload} from "@fortawesome/free-solid-svg-icons";
import SummaryUpload from "./SummaryUpload";
import SummaryEdit from "./SummaryEdit";


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
                        <SummaryEdit summary={props.summary} user={props.user} isAdmin={props.isAdmin} reload={props.reload} setReload={props.setReload}/>
                    </div>
                )}
                {mode == "update" &&(
                    <div>
                        <SummaryUpload summary={props.summary} reload={props.reload} setReload={props.setReload} />
                    </div>
                )}
                {mode != "" && (
                    <div>
                        <br/>
                        <Button onClick={e => close()}>Chiudi</Button>
                    </div>
                )}
            </Panel>
        </div>
    );
}