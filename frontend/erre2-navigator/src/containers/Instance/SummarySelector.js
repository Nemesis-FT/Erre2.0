import React, {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import customStyle from "../styles/select"


export default function SummarySelector(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const [courseList, setCourseList] = useState([])
    let history = useHistory();
    const [options, setOptions] = useState([])

    useEffect(() =>{
        gatherData()
    }, [instanceIp])

    useEffect(() => {
        setOptions(courseList.map(function(e){
            return {label: e.name+" - "+e.professor, value:e.cid}
        }))
    }, [courseList])

    async function gatherData(){
        const response = await fetch("http://" + instanceIp + "/course/", {
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
            setCourseList(values.courses)
        }
    }

    async function test(e){
        console.debug(e)
    }



    return (
        <Select options={options} name="corso" placeholder="Seleziona un corso..." styles={customStyle}
                noOptionsMessage={()=>{return "Nessun risultato."}} onChange={(e) => {props.setCourseId(e.value)}}>
        </Select>
    );
}