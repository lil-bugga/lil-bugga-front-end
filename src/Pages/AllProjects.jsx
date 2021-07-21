import TableWithLink from "../Components/TableWithLink"
import { useState, useEffect, useContext } from "react"
import Button from "react-bootstrap/Button"
import CreateProjectModal from "./../Components/CreateProjectModal"
import axios from 'axios'
import { useHistory } from "react-router-dom"
import {UserContext} from "./../Components/UserProvider"

export default function AllProjects(props) {

    let {prefix, user} = useContext(UserContext);

    const [createProjectModalShow, setCreateProjectModalShow] = useState(false);
    const [projects, setProjects] = useState([])
    let history = useHistory();

    // Map projects to array format.
    function mapProjects(projects){
        return projects.reduce((out, row) => {
            return out.concat([[row.project_detail.project_name, 
                new Date(row.project_detail.created_at).toString('YYYY-MM-dd').split(" ").slice(0,4).join(" "),
                `project/${row.project_detail.id}`]])
        }, [])
    }

    // On page load, load in projects.
    useEffect(()=>{
        if(user.jwt){
            axios.get(`${prefix}/projects`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.data)
            .then(body => {
                setProjects([["Project Name", "Created At", "Link"], ...mapProjects(body)])
                }
            )
            .catch(err => {
                console.log(err);
                history.push("/");
            })
        }
    }, [user, prefix, history])

    return (
        <div className="page d-flex align-items-center outer">
            <div className="whole_chunk d-flex flex-column my-3">
                <h1 className="text-center">Projects</h1>
                <Button className="mb-1" variant="primary" onClick={() => setCreateProjectModalShow(true)}>
                    Create a Project
                </Button>
                <CreateProjectModal
                    show={createProjectModalShow}
                    onHide={() => setCreateProjectModalShow(false)}
                />
                {projects.length > 0 ? <TableWithLink content={projects}/> : <></>} 
            </div>
            
        </div>
    )
}