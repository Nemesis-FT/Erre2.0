import React from "react";
import {Box, Button, Field, Form} from "@steffo/bluelib-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import SummarySelector from "../../SummarySelector";


export default function SummaryComponent(props) {

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
                <Button bluelibClassNames={"color-lime"} onClick={e => props.saveElement()} disabled=
                    {props.name==""||props.file==null}>
                    <FontAwesomeIcon icon={faSave}/></Button>
            </Box>
        </div>
    );
}