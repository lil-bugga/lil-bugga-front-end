import TableSideProjects from "../Components/TableSideProjects"
import Table from "../Components/TableWithLink";

export default function Ticket() {

    let entries = [["Comment", "Change", "Author"], ["Tailwind is superior!", "Important", "Ryan"]];
    let projects = [["Projects"], ["lil bugga"], ["chat point"]]

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer">

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0">
                <TableSideProjects/>
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="container-fluid d-flex page m-0 p-0 align-items-center">
                <div className="whole_chunk d-flex flex-column align-items-center">
                    <h1>Project Name</h1>
                    <h2>Ticket Name</h2>
                    <p><b>Description: </b>The Ticket Description</p>
                    <p><b>Importance: </b>The Ticket Importance</p>
                    <hr/>
                    <Table content={entries}/>
                </div>
            </div>
        </div>
    )
}