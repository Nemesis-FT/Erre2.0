import React, {useEffect, useState} from "react";
import {Panel} from "@steffo/bluelib-react";
import {useHistory} from "react-router-dom";


export default function Summary(props) {
    let history = useHistory();
    const [date, setDate] = useState(null)

    useEffect((e)=>{
        let d = new Date(props.commit.date)
        setDate(`${d.getDate()}/${d.getMonth()+1}/${d.getUTCFullYear()} - ${d.getHours()}:${d.getMinutes()}`)
    }, [props.commit])


    return (

        <Panel><p>{date}</p>{props.commit.description}</Panel>
    );
}