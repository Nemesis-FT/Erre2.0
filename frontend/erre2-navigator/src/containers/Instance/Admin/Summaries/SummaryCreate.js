import React, {useState} from "react";
import {useAppContext} from "../../../../libs/Context";
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
                author_id: props.user.uid,
                course_id: courseId,
                filename: file.name,
                downloads: 0
            }
        ))
        formData.append("file", file)
        let response = await fetch("http://" + instanceIp + "/summary/", {
            method: "POST",
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
            <SummaryComponent name={name} setName={setName} file={file} setFile={setFile} courseId={courseId}
                              setCourseId={setCourseId} saveElement={saveElement}/>
        </div>
    );
}