import React, {useState} from "react";
import {Box, Button, Form} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import schema from "../../../config";


export default function ProfilePanel(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [name, setName] = useState(props.user.name)
    const [surname, setSurname] = useState(props.user.surname)
    const [email, setEmail] = useState(props.user.email)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    async function saveElement() {
        const response = await fetch(schema + instanceIp + "/users/" + props.user.uid, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        });
        if (response.status === 200) {
            props.setReload(!props.reload)
        }
    }

    async function removeElement() {
        const response = await fetch(schema + instanceIp + "/users/" + props.user.uid, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            }
        });
        props.setReload(!props.reload)
    }

    return (
        <div>

            <Box>

                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                    placeholder={"Nome"} validity={name != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setSurname(e)} value={surname} required={true}
                                    placeholder={"Cognome"} validity={surname != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setEmail(e)} value={email} required={true}
                                    placeholder={"Email"} validity={email != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setPassword(e)} value={password} required={true}
                                    placeholder={"Password"} validity={password != ""} type={"password"}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setPassword2(e)} value={password2} required={true}
                                    placeholder={"Password"} validity={password2 == password && password2 != ""}
                                    type={"password"}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                {props.user.uid != props.uid && (
                    <div><Button bluelibClassNames={"color-red"} onClick={e => removeElement()}><FontAwesomeIcon icon={faTrash}/></Button>
                    <br/></div>
                )}
                <Button bluelibClassNames={"color-green"} onClick={e => saveElement()} disabled=
                    {password2 != password || password == "" || email == "" || name == "" || surname == ""}>
                    <FontAwesomeIcon icon={faSave}/></Button>
            </Box>
        </div>
    );
}