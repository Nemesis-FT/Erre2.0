import React, {useState} from "react";
import {Button, Chapter, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import ProfilePanel from "./ProfilePanel";


export default function UserEntry(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [edit, setEdit] = useState(false)

    async function editFun(){
        setEdit(!edit)
        props.setExtend(!edit)
    }

    return (
        <div>
            <Panel>

                <div>
                    {props.user.name} {props.user.surname} (UID: {props.user.uid})
                </div>
                <Chapter>
                    <div><Button onClick={e => editFun()}><FontAwesomeIcon icon={faEdit}/></Button></div>
                </Chapter>
                {edit ? (
                    <ProfilePanel user={props.user} setReload={props.setReload} reload={props.reload} uid={props.uid}/>
                    ):(
                    <div></div>
                    )
                }
            </Panel>
        </div>
    );
}