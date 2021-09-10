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
import {faSave} from "@fortawesome/free-solid-svg-icons";
import SummarySelector from "../../SummarySelector";
import {Input} from "react-select/animated/dist/react-select.esm";


export default function SummaryComponent(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    async function save(e){
        console.debug(e.target.files[0])
        props.setFile(e.target.files[0])
    }

    return (
        <div>
            <Box>
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => props.setName(e)} value={props.name} required={true}
                                    placeholder={"Nome"} validity={props.name != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Field type={"file"} onChange={e => save(e)} placeholder={"File..."}/>
                    </Form.Row>
                </Form>
                <SummarySelector setCourseId={props.setCourseId}/> <br/>
                <Button customColor={"green"} onClick={e => props.saveElement()} disabled=
                    {props.name==""||props.file==null}>
                    <FontAwesomeIcon icon={faSave}/></Button>
            </Box>
        </div>
    );
}