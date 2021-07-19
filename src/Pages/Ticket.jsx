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

// import Table from "../Components/Table"
// import TableWithLink from "../Components/TableWithLink"
// import TableSideProjects from "../Components/TableSideProjects"
// import {useState, useEffect, useContext} from 'react'
// import CreateTicketModal from "./../Components/CreateTicketModal"
// import Button from "react-bootstrap/Button"
// import { useParams, useHistory, useLocation } from "react-router-dom"
// import axios from 'axios'
// import { UserContext } from "../Components/UserProvider"

// // Map projects to array format.
// function mapTickets(tickets){
//     return tickets.reduce((out, row) => {
//         return out.concat([[row.id, row.subject, row.body, row.created_at, row.user_id, `hello`]])
//     }, [])
// }

// export default function ProjectTickets() {
//     // Important variables
//     const {prefix, user } = useContext(UserContext)
//     const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
//     const [entries, setEntries] = useState([]);
//     const [ticketData, setTicketData] = useState({});
//     const {id, tid} = useParams();
//     let history = useHistory();
//     let location = useLocation();

//     // On page load, try to load entires else redirect.
//     useEffect(()=>{
//         axios.get(`${prefix}projects/${id}/tickets/${tid}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
//         .then(res => {
//             setTicketData(res.data)
//             return res.data.entries
//         })
//         .then(body => {
//             let pid = id;
//             setEntries([["Id", "Subject", "Body", "Created At", "User Id", "View"], ...mapTickets(body)])
//         })
//         .catch(err => {
//             console.log("Project wasn't found!");
//         })
//     }, [location.pathname])
    
//     return (
//         // Page with Side Bar
//         <div className="page d-flex with_side_panel p-0 m-0 outer" id="">

//             {/* Side Bar */}
//             <div className="container-fluid side_panel m-0 p-1">
//                 <TableSideProjects/>
//             </div>

//             {/* Page adjacent to Side Bar */}
//             <div className="container-fluid d-flex page m-0 p-2 align-items-center">
//                 <div className="whole_chunk">
//                     <h1 class="text-center">Project Name</h1>
//                     <Button class="btn btn-primary" variant="primary" onClick={() => setCreateTicketModalShow(true)}>
//                         Create Ticket
//                     </Button>
//                     <CreateTicketModal
//                         show={createTicketModalShow}
//                         onHide={() => setCreateTicketModalShow(false)}
//                     />
//                     {/* {entries.length > 1 && <Table content={entries}/>} */}
//                     {entries.length > 1 && <TableWithLink content={entries}/>}
//                 </div>
//             </div>
//         </div>
//     )
// }