import Table from "../Components/Table"

let projects = [["Projects"], ["lil bugga"], ["chat point"]]

export default function ProjectTickets() {

    let tickets = [["Ticket Name", "Ticket Description", "Ticket Urgency", "Creator"],
        ["Material UI glitch", "Change out material UI.", "Urgent", "Dean"],
        ["Table Keys Error", "React needs unique keys for each element", "Non-Essential", "Dean"]]

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0" id="">

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0">
                <Table 
                    content={projects}
                />
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="container-fluid d-flex page m-0 p-0 align-items-center">
                <div className="whole_chunk">
                    <Table 
                        content={tickets}
                    />
                </div>
            </div>
        </div>
    )
}