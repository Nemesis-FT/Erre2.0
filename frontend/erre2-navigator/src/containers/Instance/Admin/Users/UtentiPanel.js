import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {Anchor, Box, Button, Chapter, Field, Footer, Form, Heading, LayoutFill, Panel, Table
} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CorsoEntry from "../Courses/CorsoEntry";
import ProfilePanel from "./ProfilePanel";
import UserEntry from "./UserEntry";
import {faSave} from "@fortawesome/free-solid-svg-icons";


export default function UtentiPanel(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [refresh, setRefresh] = useState(false)
    const [userList, setUserList] = useState([])
    const [extend, setExtend] = useState(false)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    useEffect(e => (
        loadData()
    ), [refresh])

    async function loadData(){
        let response = await fetch("http://" + instanceIp + "/users/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            setUserList(values.users)
        }
    }

    async function saveElement(){
        let response = await fetch("http://" + instanceIp + "/users/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        });
        if (response.status === 200) {
            let values = await response.json()
            setRefresh(!refresh)
            setName("")
            setSurname("")
            setEmail("")
            setPassword("")
            setPassword2("")
        }
    }

    return (
        <div>
            <Heading level={2}>Gestione utenti</Heading>
            <Box>
                <div className={extend ? (Style.ScrollableExtended) : (Style.Scrollable)}>
                    {userList.map(user => <UserEntry user={user} setReload={setRefresh} reload={refresh}
                                                       setExtend={setExtend}/>)}
                </div>
            </Box>
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
                                    placeholder={"Password"} validity={password!=""} type={"password"}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setPassword2(e)} value={password2} required={true}
                                    placeholder={"Password"} validity={password2==password && password2!=""} type={"password"}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Button customColor={"green"} onClick={e => saveElement()} disabled=
                    {password2!=password || password=="" || email == "" || name == "" || surname == ""}>
                    <FontAwesomeIcon icon={faSave}/></Button>
            </Box>
        </div>
    );
}