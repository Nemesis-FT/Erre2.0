import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Chapter, Heading, ListUnordered, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import Style from "./Summary.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudDownloadAlt, faUser, faHistory, faAt} from "@fortawesome/free-solid-svg-icons";


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