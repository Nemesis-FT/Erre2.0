import React, {useState} from "react";
import {Button, Field, Form} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import schema from "../../../config";


export default function SummaryUpload(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)

    async function saveElement() {
        const formData = new FormData()
        formData.append("update", JSON.stringify({
                summary: props.summary,
                description: desc
            }
        ))
        formData.append("file", file)
        let response = await fetch(schema + instanceIp + "/summary/" + props.summary.sid, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
            body: formData
        });
        if (response.status === 200) {
            let values = await response.json()
            props.setReload(!props.reload)
        }
    }


    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Field onSimpleChange={e => setDesc(e)} value={desc} required={true}
                                placeholder={"Risolto..."} validity={desc != ""}>
                    </Form.Field>
                </Form.Row>
                <Form.Row>
                    <Field type={"file"} onChange={e => setFile(e.target.files[0])} placeholder={"File..."}/>
                </Form.Row>
            </Form>
            <Button bluelibClassNames={"color-lime"} onClick={e => saveElement()} disabled=
                {desc == "" || file == null}>
                <FontAwesomeIcon icon={faSave}/></Button>
        </div>
    );
}