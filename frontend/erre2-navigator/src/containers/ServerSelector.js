import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Dialog, Form} from "@steffo/bluelib-react";
import {useAppContext} from "../libs/Context";
import {useHistory} from "react-router-dom";
import Style from "./ServerSelector.module.css"
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ServerFav from "./ServerFav";

export default function ServerSelector() {
    const [address, setAddress] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [server, setServer] = useState(null);
    const {instanceIp, setInstanceIp} = useAppContext();
    const {connected, setConnected} = useAppContext();
    const [favList, setFavList] = useState([])
    const [hidden, setHidden] = useState(true)
    let history = useHistory();


    useEffect(() => {
        conn_check()
    }, [address])

    useEffect(() => {
        if (localStorage.getItem("favs")) {
            let favs = JSON.parse(localStorage.getItem("favs"))
            setFavList(favs)
        }

    }, [connected])


    async function conn_check() {
        setIsChecking(true);
        try {
            const response = await fetch("http://" + address + "/server/planetarium", {
                method: "GET",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                let values = await response.json()
                console.debug(values.server)
                setServer({
                    name: values.server.name,
                    university: values.server.university,
                    type: values.type,
                    version: values.version,
                })
                console.debug(server)
                setIsChecking(false)
                setIsValid(true)

            } else {
                setIsChecking(false);
            }
        } catch (e) {
            setIsChecking(false);
        }

    }

    async function connect() {
        if (!isValid) {
            return
        }
        setInstanceIp(address)
        localStorage.setItem("instanceIp", address)
        setConnected(true)
        console.debug("Collegamento a " + address)
        history.push("/erre2/" + address)
    }

    return (
        <div>
            <Box>

                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setAddress(e)} value={address} required={true}
                                    placeholder={"erre2.site.org"} label={"Indirizzo istanza"} validity={isValid}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                {isChecking ? (
                    <div>Verifica in corso...</div>
                ) : (
                    <div></div>
                )}
                {isValid ? (
                    <div>
                        <Dialog customColor={"#6fd052"}>
                            {server.name} ({server.university})
                            <p> {server.type} v. {server.version} </p>
                        </Dialog>
                    </div>
                ) : (
                    <div>

                    </div>
                )}

            </Box>
            <Button children={"Connettiti"} disabled={!isValid} onClick={e => connect()}>

            </Button>
            <Box>
                <Anchor onClick={(e) => {
                    setHidden(!hidden)
                }}><FontAwesomeIcon icon={faQuestionCircle}/></Anchor>
                {hidden ? (<div></div>) : (
                    <p> Il navigatore ti consente di esplorare la costellazione di istanze di Erre2, appartenenti a
                        diversi
                        gruppi di studenti. Per consultare i riassunti di un certo gruppo, devi inserire l'indirizzo
                        dell'istanza
                        corrispondente. E' possibile far registrare la propria istanza all'interno della costellazione
                        ufficiale di
                        Erre2, e questa sarà raggiungibile dal servizio "Planetario".</p>)}

            </Box>
            <Box className={Style.Scrollable}>
                {favList ? (
                    <div>{favList.map(fav => <ServerFav fav={fav}/>)}</div>
                ) : (
                    <p>Nessun server tra i preferiti. Per aggiungerne, clicca sulla stella di fianco al nome di un
                        server.</p>
                )}
            </Box>
        </div>
    );
}