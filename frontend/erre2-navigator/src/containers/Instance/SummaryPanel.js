import React, {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import {useHistory} from "react-router-dom";
import SummarySelector from "./SummarySelector";
import Summary from "./Summary/Summary";


export default function SummaryPanel() {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const [courseId, setCourseId] = useState(null)
    const [summaryList, setSummaryList] = useState([])
    let history = useHistory();

    useEffect(() => {
        get_summaries()
    }, [courseId])

    async function get_summaries() {
        const response = await fetch("http://" + instanceIp + "/summary/?course_id=" + courseId, {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            console.debug(values)
            let tmp = []
            values.summaries.forEach(elem => {
                elem.commits = elem.commits.reverse()
                tmp.push(elem)
            })
            setSummaryList(tmp)
        }
    }


    return (
        <div>
            <SummarySelector setCourseId={setCourseId}/>
            {summaryList.map(summary => <Summary summary={summary}/>)}
        </div>
    );
}