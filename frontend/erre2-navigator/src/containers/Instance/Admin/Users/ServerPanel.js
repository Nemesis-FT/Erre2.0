import React, {useEffect, useState} from "react";
import {Box, Button, Chapter, Form, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


export default function ServerPanel(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [reload, setReload] = useState(false)
    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [monetization, setMonetization] = useState("")
    const [motd, setMotd] = useState("")
    const [adminId, setAdminId] = useState("")

    let history = useHistory();

    useEffect(() => {
        if (!instanceIp || !token || !props.isOwner) {
            setConnected(false)
            history.push("/")
        }
        onLoad()
    }, [token])

    useEffect(() => {
        onLoad()
    }, [reload])

    async function loadData() {
        const response = await fetch("http://" + instanceIp + "/server/", {
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
            setName(values.name)
            setUniversity(values.university)
            setMonetization(values.monetization_link)
            setMotd(values.motd)
            setAdminId(values.owner_id)
        }
    }

    async function onLoad() {
        await loadData()
    }

    async function saveElement(){
        const response = await fetch("http://" + instanceIp + "/server/", {
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
                university: university,
                monetization_link: monetization,
                motd: motd,
                owner_id: adminId
            })
        });
        if (response.status === 200) {
            setReload(!reload)
        }
    }


    return (
        <div>
            <Heading level={2}>Gestione server</Heading>
            <Box>
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                    placeholder={"Nome server"} validity={name != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setUniversity(e)} value={university} required={true}
                                    placeholder={"Università"} validity={university != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setMonetization(e)} value={monetization} required={true}
                                    placeholder={"Link monetizzazione"} validity={monetization != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setMotd(e)} value={motd} required={true}
                                    placeholder={"Messaggio del giorno"} validity={motd !== ""}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Panel customColor={"red"}>Attenzione: modificare l'id admin trasferisce il controllo della piattaforma ad un altro utente.</Panel>
                <Form>

                    <Form.Row>
                        <Form.Field onSimpleChange={e => setAdminId(e)} value={adminId} required={true}
                                    placeholder={"Semestre"} validity={adminId !== "" && isNaN(adminId) !== true}>
                        </Form.Field>
                    </Form.Row>

                </Form>
                <Chapter>
                    <Button bluelibClassNames={"color-green"} onClick={e => saveElement()}><FontAwesomeIcon icon={faSave}/></Button>
                </Chapter>
            </Box>


        </div>
    );
}