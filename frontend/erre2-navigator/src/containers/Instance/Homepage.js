import React, {useEffect, useState} from "react";
import Style from "./Homepage.module.css";
import {Anchor, Box, Button, Chapter, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import SummaryPanel from "./SummaryPanel";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default function Home() {
    const {url} = useParams();
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const [server, setServer] = useState(null)
    const [showInfo, setShowInfo] = useState(false)
    const [isFav, setIsFav] = useState(false)
    let history = useHistory();

    useEffect(() => {
        if (instanceIp !== url) {
            setInstanceIp(url)
            setConnected(true)
            localStorage.setItem("instanceIp", url);
        }
    })

    useEffect(() => {
        if (server) {
            let el = {name: server.server.name, address: instanceIp, university: server.server.university}
            if (localStorage.getItem("favs")) {
                let favs = JSON.parse(localStorage.getItem("favs"))
                let addresses = favs.map(f => {
                    return f.address
                })
                if (addresses.includes(instanceIp)) {
                    console.debug("subs")
                    setIsFav(true)
                }
            }
        }
    }, [server])

    useEffect(() => {
        gather_data()
    }, [connected])

    async function gather_data() {
        const response = await fetch("http://" + url + "/server/planetarium", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            console.debug(values)
            setServer(values)
            console.debug(server)
        }
    }

    async function disconnect() {
        setInstanceIp(null);
        setConnected(false);
        localStorage.removeItem("instanceIp");
        history.push("/")
    }

    async function addFav() {
        let el = {name: server.server.name, address: instanceIp, university: server.server.university}
        if (localStorage.getItem("favs")) {
            console.debug("Favs are present!")
            let favs = JSON.parse(localStorage.getItem("favs"))
            let addresses = favs.map(f => {
                return f.address
            })
            if (addresses.includes(instanceIp)) {
                return;
            }
            favs.push(el)
            localStorage.setItem("favs", JSON.stringify(favs))
            console.debug(localStorage.getItem("favs"))
        } else {
            localStorage.setItem("favs", JSON.stringify([el,]))
        }
        setIsFav(true)
    }

    return (
        <div>
            {server ? (
                <div className={Style.Home}>
                    <div className={Style.lander}>
                        <Heading level={1}>{server.server.name}
                            {!isFav ? (<FontAwesomeIcon
                                icon={faStar} onClick={e => addFav()}/>) : (<div/>)}
                        </Heading>
                        <p className="text-muted">{server.server.university}</p>
                        <Panel>
                            <Button onClick={(e) => {
                                setShowInfo(!showInfo)
                            }}>Informazioni sul server</Button>
                            {showInfo ? (
                                <Panel>
                                    <p>
                                        "{server.server.motd}"
                                    </p>
                                    I riassunti su questa istanza sono pubblicati
                                    da {server.server.owner.name} {server.server.owner.surname} sotto licenza CC
                                    BY-SA
                                    4.0.
                                </Panel>
                            ) : (
                                <div></div>
                            )}
                            <Box>Vuoi supportare le persone che contribuiscono a questa istanza? <p><Anchor
                                href={server.server.monetization_link}>Perchè
                                non gli offri un caffè?</Anchor></p></Box>
                        </Panel>
                    </div>
                    <Panel>
                        <Chapter>
                            <div>
                                <Button children={"Accedi"} onClick={e => history.push("/login")}></Button>
                            </div>
                            <div>
                                <Button children={"Disconnettiti"} onClick={e => disconnect()}></Button>
                            </div>
                        </Chapter>
                    </Panel>
                    <Panel>
                        <SummaryPanel/>
                    </Panel>
                </div>

            ) : (
                <Box>Collegamento in corso...</Box>
            )}
        </div>
    );
}