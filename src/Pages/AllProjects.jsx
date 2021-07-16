import Table from "../Components/Table"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import CreateProjectModal from "./../Components/CreateProjectModal"


export default function AllProjects() {

    const [createProjectModalShow, setCreateProjectModalShow] = useState(false);

    let projects = [["Projects"], ["lil bugga"], ["chat point"]]

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
                <Table content={projects}/>
            </div>
            
        </div>
    )
}