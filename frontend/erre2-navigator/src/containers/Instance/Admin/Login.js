import React, {useEffect, useState} from "react";
import Style from "./Login.module.css";
import {Box, Button, Chapter, Form, Heading} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory} from "react-router-dom";


export default function Login() {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory();

    useEffect(() => {
        if (!instanceIp) {
            setConnected(false)
            history.push("/")
        }
    })

    async function login() {
        var details = {
            "grant_type": "password",
            "username": email,
            "password": password
        }
        var formB = []
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formB.push(encodedKey + "=" + encodedValue);
        }
        formB = formB.join("&");

        const response = await fetch("http://" + instanceIp + "/token", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
            body: formB
        });
        if (response.status === 200) {
            let values = await response.json()
            setToken(values.access_token)
            history.push("/admin")
        }
        else{
            alert("Credenziali non corrette.")
        }
    }


    return (
        <div>
            <div className={Style.Home}>
                <div className={Style.lander}>
                    <Heading level={1}>Login</Heading>
                    <p>Per accedere al pannello amministrativo dell'istanza, inserisci le credenziali.</p>
                </div>
                <Box>
                    <Form>
                        <Form.Row>
                            <Form.Field onSimpleChange={e => setEmail(e)} value={email} required={true}
                                        placeholder={"Email"}>
                            </Form.Field>
                        </Form.Row>
                        <Form.Row>
                            <Form.Field type="password" onSimpleChange={e => setPassword(e)} value={password}
                                        required={true}
                                        placeholder={"Password"}>
                            </Form.Field>
                        </Form.Row>

                    </Form>
                    <Chapter>
                        <div>
                            <Button children={"Accedi"} onClick={e => login()}></Button>
                        </div>
                        <div>
                            <Button children={"Torna indietro"} onClick={e => history.push("/erre2/"+instanceIp)}></Button>
                        </div>
                    </Chapter>
                </Box>
            </div>

        </div>
    );
}