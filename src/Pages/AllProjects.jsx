import Table from "../Components/Table"

export default function AllProjects() {

    let projects = [["Projects"], ["lil bugga"], ["chat point"]]

    return (
        <div className="page d-flex align-items-center">
            <div className="whole_chunk">
                <Table content={projects}/>
            </div>
        </div>
    )
}