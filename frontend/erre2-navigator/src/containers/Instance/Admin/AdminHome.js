import React, {useEffect, useState} from "react";
import Style from "./AdminHome.module.css";
import {Anchor, Box, Button, Chapter, Field, Footer, Form, Heading, LayoutFill, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {Link, useHistory} from "react-router-dom";


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
            history.push("/")
        }
        onLoad()
    }, [token])

    useEffect(() => {
        onLoad()
    }, [reload])

    async function loadCourse() {
        const response = await fetch("http://" + instanceIp + "/course/", {
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
            setCourses(values.courses)
        }
    }

    async function loadSummaries() {
        const response = await fetch("http://" + instanceIp + "/summary/", {
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
            setSummaries(values.summaries)
        }
    }

    async function loadUserData() {
        let uid = null
        let response = await fetch("http://" + instanceIp + "/users/me", {
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
            setUser(values)
            uid = values.uid
        }
        response = await fetch("http://" + instanceIp + "/server/planetarium", {
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
            if (values.server.owner.uid === uid) {
                setIsOwner(true)
            }
        }
        response = await fetch("http://" + instanceIp + "/users/", {
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

    async function onLoad() {
        await loadCourse()
        await loadSummaries()
        await loadUserData()
    }


    return (
        <div>
            <Box>
                {user ? (<div>Accesso eseguito come {user.email}</div>) : (<div>Accesso eseguito come...</div>)}
            </Box>
            {mode == "" && (
                <div>
                    <div className={Style.Home}>
                        <p>Questo è il pannello amministrativo di questa istanza di Erre2.</p>
                        <Box>
                            <Chapter>
                                <Button onClick={e => setMode("corsi")}>Gestione Corsi</Button>
                                <Button onClick={e => setMode("riassunti")}>Gestione Riassunti</Button>
                                <Button onClick={e => setMode("profilo")}>Gestione Profilo</Button>
                            </Chapter>

                        </Box>
                        {isOwner ? (<Box><Chapter><Button onClick={e => setMode("utenti")}>Gestione Utenti</Button>
                            <Button onClick={e => setMode("server")}>Gestione Server</Button></Chapter></Box>) : (
                            <div></div>)}
                    </div>
                </div>
            )}
            {mode != "" && (
                <Button onClick={e => setMode("")}>Torna indietro</Button>
            )}
            {mode == "corsi" && (
                <div></div>
            )}
            {mode == "riassunti" && (
                <div></div>
            )}
            {mode == "profilo" && (
                <div></div>
            )}
            {mode == "utenti" && (
                <div></div>
            )}
            {mode == "server" && (
                <div></div>
            )}


        </div>
    );
}