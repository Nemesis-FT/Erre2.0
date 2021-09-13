import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {Box, Button, Chapter, Form, Heading} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {useHistory} from "react-router-dom";
import CorsoEntry from "./CorsoEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


export default function CorsiPanel() {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()
    const [courses, setCourses] = useState([])
    const [reload, setReload] = useState(false)
    const [extend, setExtend] = useState(false)

    const [name, setName] = useState("")
    const [professor, setProfessor] = useState("")
    const [curriculum, setCurriculum] = useState("")
    const [year, setYear] = useState("")
    const [semester, setSemester] = useState("")

    let history = useHistory();

    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

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
            setCourses(values.courses.sort(compare))
        }
    }

    async function onLoad() {
        await loadCourse()
    }

    async function saveElement(){
        const response = await fetch("http://" + instanceIp + "/course/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,


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
            setReload(!reload)
            setName("")
            setProfessor("")
            setCurriculum("")
            setSemester("")
            setYear("")
        }
    }


    return (
        <div>
            <Heading level={2}>Gestione corsi</Heading>
            <Box>
                <div className={extend ? (Style.ScrollableExtended) : (Style.Scrollable)}>
                    {courses.map(course => <CorsoEntry course={course} setReload={setReload} reload={reload}
                                                       setExtend={setExtend}/>)}
                </div>
            </Box>
            <Box>
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                    placeholder={"Nome"} validity={name != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setProfessor(e)} value={professor} required={true}
                                    placeholder={"Docente"} validity={professor != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setCurriculum(e)} value={curriculum} required={true}
                                    placeholder={"Curriculum"} validity={curriculum != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setYear(e)} value={year} required={true}
                                    placeholder={"Anno"} validity={year !== "" && isNaN(year) !== true}>
                        </Form.Field>
                        <Form.Field onSimpleChange={e => setSemester(e)} value={semester} required={true}
                                    placeholder={"Semestre"} validity={semester !== "" && isNaN(semester) !== true}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Chapter>
                    <Button customColor={"green"} onClick={e => saveElement()}><FontAwesomeIcon icon={faSave}/></Button>
                </Chapter>
            </Box>


        </div>
    );
}