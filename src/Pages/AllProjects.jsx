import Table from "../Components/Table"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import CreateProjectModal from "./../Components/CreateProjectModal"
import axios from 'axios'
import { useHistory } from "react-router-dom"

export default function AllProjects(props) {

    const [createProjectModalShow, setCreateProjectModalShow] = useState(false);
    const [projects, setProjects] = useState([])
    let history = useHistory();

    // Map projects to array format.
    function mapProjects(projects){
        return projects.reduce((out, row) => {
            return out.concat([[row.project_detail.project_name, row.project_detail.description, row.status, row.project_detail.created_at]])
        }, [])
    }

    // On page load, load in projects.
    useEffect(()=>{
        axios.get(`${props.prefix}/projects`, {headers: {"Authorization": `Bearer ${props.user.jwt}`}})
        .then(res => res.data)
        .then(body => {
            setProjects([["Project Name", "Project Description", "Status", "Created At"], ...mapProjects(body)])
            }
        )
        .catch(err => {
            history.push("/");
        })
    }, [])

    return (
        <div className="page d-flex align-items-center">
            <div className="whole_chunk">
                <Button variant="primary" onClick={() => setCreateProjectModalShow(true)}>
                    Create a Project
                </Button>
                <CreateProjectModal
                    show={createProjectModalShow}
                    onHide={() => setCreateProjectModalShow(false)}
                />
                {projects.length > 0 ? <Table content={projects}/> : <></>} 
            </div>
            
        </div>
    )
}