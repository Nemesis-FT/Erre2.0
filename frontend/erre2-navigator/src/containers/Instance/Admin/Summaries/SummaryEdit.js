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
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";


export default function SummaryEdit(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [name, setName] = useState(props.summary.name)

    async function saveElement() {
        const response = await fetch("http://" + instanceIp + "/summary/"+props.summary.sid, {
            method: "PUT",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,


            },
            body: JSON.stringify({
                name: name,
            })
        });
        if (response.status === 200) {
            props.setReload(!props.reload)
        }
    }

    async function deleteElement() {
        const response = await fetch("http://" + instanceIp + "/summary/"+props.summary.sid, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        });
        props.setReload(!props.reload)
    }

    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                placeholder={"Riassunto di ..."} validity={name != ""}>
                    </Form.Field>
                </Form.Row>
            </Form>
            <Chapter>
                <Button bluelibClassNames={"color-green"} onClick={e => saveElement()} disabled=
                    {name == ""}>
                    <FontAwesomeIcon icon={faSave}/></Button>
                <Button bluelibClassNames={"color-red"} onClick={e => deleteElement()}
                        disabled={!props.isAdmin && props.user.uid != props.summary.owner_id}>
                    <FontAwesomeIcon icon={faTrash}/></Button>
            </Chapter>
        </div>
    );
}