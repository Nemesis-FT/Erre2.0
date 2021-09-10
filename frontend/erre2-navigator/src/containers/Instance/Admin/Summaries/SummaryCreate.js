import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {
    Anchor,
    Box,
    Button,
    Chapter,
    Field,
    Footer,
    Form,
    Heading,
    LayoutFill,
    Panel,
    Table
} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SummaryComponent from "./SummaryComponent";


export default function SummaryCreate(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")
    const [courseId, setCourseId] = useState("")

    async function saveElement() {
        const formData = new FormData()
        formData.append("summary", JSON.stringify(
            {
                sid: 0,
                name: name,
                author_id: props.uid,
                course_id: courseId,
                filename: file.name,
                downloads: 0
            }
        ))
        formData.append("file", file)
        console.debug(typeof file)
        let response = await fetch("http://" + instanceIp + "/summary/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + token
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
            <SummaryComponent name={name} setName={setName} file={file} setFile={setFile} courseId={courseId}
                              setCourseId={setCourseId} saveElement={saveElement}/>
        </div>
    );
}