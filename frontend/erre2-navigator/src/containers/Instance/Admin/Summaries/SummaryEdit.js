import React, {useState} from "react";
import {Button, Chapter, Form} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import schema from "../../../config";


export default function SummaryEdit(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [name, setName] = useState(props.summary.name)

    async function saveElement() {
        const response = await fetch(schema + instanceIp + "/summary/"+props.summary.sid, {
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
        const response = await fetch(schema + instanceIp + "/summary/"+props.summary.sid, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
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
                <Button bluelibClassNames={"color-lime"} onClick={e => saveElement()} disabled=
                    {name == ""}>
                    <FontAwesomeIcon icon={faSave}/></Button>
                <Button bluelibClassNames={"color-red"} onClick={e => deleteElement()}
                        disabled={!props.isAdmin && props.user.uid != props.summary.owner_id}>
                    <FontAwesomeIcon icon={faTrash}/></Button>
            </Chapter>
        </div>
    );
}