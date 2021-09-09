import React, {useEffect, useState} from "react";
import Style from "./AdminHome.module.css";
import {Anchor, Box, Button, Chapter, Field, Footer, Form, Heading, LayoutFill, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash, faSave} from "@fortawesome/free-solid-svg-icons";
import {B} from "react-select/dist/index-4bd03571.esm";


export default function CorsoEntry(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(props.course.name)
    const [professor, setProfessor] = useState(props.course.professor)
    const [curriculum, setCurriculum] = useState(props.course.curriculum)
    const [year, setYear] = useState(props.course.year)
    const [semester, setSemester] = useState(props.course.semester)
    let history = useHistory();

    async function updateCourse() {
        const response = await fetch("http://" + instanceIp + "/course/"+props.course.cid, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                cid: 0,
                name: name,
                professor: professor,
                curriculum: curriculum,
                year: year,
                semester: semester
            })
        });
        if (response.status === 200) {
            let values = await response.json()
            props.setReload(!props.reload)
        }
    }

    async function editFun(){
        setEdit(!edit)
        props.setExtend(!edit)
    }

    return (
        <Panel>

                <div>
                    {props.course.name} ({props.course.professor}) {props.course.curriculum}
                </div>
            <Chapter>
                <div><Button onClick={e => editFun()}><FontAwesomeIcon icon={faEdit}/></Button></div>
            </Chapter>
            {edit ? (
                <Box>
                    <Form>
                        <Form.Row>
                            <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                        placeholder={"Nome"} validity={name!=""}>
                            </Form.Field>
                        </Form.Row>
                        <Form.Row>
                            <Form.Field onSimpleChange={e => setProfessor(e)} value={professor} required={true}
                                        placeholder={"Docente"} validity={professor!=""}>
                            </Form.Field>
                        </Form.Row>
                        <Form.Row>
                            <Form.Field onSimpleChange={e => setCurriculum(e)} value={curriculum} required={true}
                                        placeholder={"Curriculum"} validity={curriculum!=""}>
                            </Form.Field>
                        </Form.Row>
                        <Form.Row>
                            <Form.Field onSimpleChange={e => setYear(e)} value={year} required={true}
                                        placeholder={"Anno"} validity={year!=="" && isNaN(year)!==true}>
                            </Form.Field>
                            <Form.Field onSimpleChange={e => setSemester(e)} value={semester} required={true}
                                        placeholder={"Semestre"} validity={semester!=="" && isNaN(semester)!==true}>
                            </Form.Field>
                        </Form.Row>
                    </Form>
                    <Chapter>
                        <Button customColor={"green"} onClick={e => updateCourse()}><FontAwesomeIcon icon={faSave}/></Button>
                    </Chapter>
                </Box>
            ):(<div></div>)}
        </Panel>
    );
}