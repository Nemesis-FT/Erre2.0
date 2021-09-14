import React, {useEffect, useState} from "react";
import Style from "./AdminHome.module.css";
import {Box, Button, Chapter, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory} from "react-router-dom";
import CorsiPanel from "./Courses/CorsiPanel";
import ServerPanel from "./Users/ServerPanel";
import ProfilePanel from "./Users/ProfilePanel";
import UtentiPanel from "./Users/UtentiPanel";
import SummaryPanel from "./Summaries/SummaryPanel";
import schema from "../../config";


export default function Login() {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()
    const [courses, setCourses] = useState([])
    const [summaries, setSummaries] = useState([])
    const [user, setUser] = useState(null)
    const [userList, setUserList] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [reload, setReload] = useState(false)
    const [mode, setMode] = useState("")
    let history = useHistory();

    useEffect(() => {
        if (!instanceIp || !token) {
            setConnected(false)
            history.push("/erre2/" + instanceIp)
        }
        onLoad()
    }, [token])

    useEffect(() => {
        onLoad()
    }, [reload])

    async function loadCourse() {
        const response = await fetch(schema + instanceIp + "/course/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            setCourses(values.courses)
        }
    }

    async function loadSummaries() {

    }

    async function loadUserData() {
        let uid = null
        let response = await fetch(schema + instanceIp + "/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            setUser(values)
            uid = values.uid
        }
        response = await fetch(schema + instanceIp + "/server/planetarium", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            if (values.server.owner.uid === uid) {
                setIsOwner(true)
            }
        }
    }

    async function loadUsers() {

    }

    async function onLoad() {
        await loadUserData()
    }

    async function logout() {
        setToken("")
    }

    return (
        <div className={Style.Home}>
            {mode == "" && (
                <div>

                    <p>Questo è il pannello amministrativo di questa istanza di Erre2.</p>
                    {user ? (<Button bluelibClassNames={"color-red"} onClick={e => logout()}>Logout</Button>) : (
                        <Button>...</Button>)}
                    <Panel>
                        <Box>
                            <Chapter>
                                <Button onClick={e => setMode("corsi")}>Gestione Corsi</Button>
                                <Button onClick={e => setMode("riassunti")}>Gestione Riassunti</Button>
                                <Button onClick={e => setMode("profilo")}>Gestione Profilo</Button>
                            </Chapter>

                        </Box>
                    </Panel>
                    {isOwner ? (<Panel><Box><Chapter><Button onClick={e => setMode("utenti")}>Gestione Utenti</Button>
                        <Button onClick={e => setMode("server")}>Gestione Server</Button></Chapter></Box></Panel>) : (
                        <div></div>)}

                </div>
            )}

            {mode != "" && (
                <div className={Style.TopButton}>
                    <Button onClick={e => setMode("")}>Torna indietro</Button>
                </div>
            )}
            {mode == "corsi" && (
                <CorsiPanel/>
            )}
            {mode == "riassunti" && (
                <SummaryPanel user={user} isAdmin={isOwner}/>
            )}
            {mode == "profilo" && (
                <div>
                    <Heading level={2}>Gestione profilo</Heading>
                    <Panel>
                        <ProfilePanel user={user} reload={reload} setReload={setReload} uid={user.uid}/>
                    </Panel>
                </div>
            )}
            {mode == "utenti" && (
                <UtentiPanel uid={user.uid}/>
            )}
            {mode == "server" && (
                <ServerPanel isOwner={isOwner}/>
            )}
        </div>
    );
}