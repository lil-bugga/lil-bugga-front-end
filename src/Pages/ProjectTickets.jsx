import TableWithLink from "../Components/TableWithLink"
import TableSideProjects from "../Components/TableSideProjects"
import {useState, useEffect, useContext} from 'react'
import CreateTicketModal from "./../Components/CreateTicketModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory, useLocation } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"

// Map projects to array format.
function mapTickets(tickets, pid){
    return tickets.reduce((out, row) => {
        return out.concat([[row.id, row.status, row.created_at, `/project/ticket/${pid}/${row.id}`]])
    }, [])
}

export default function ProjectTickets() {
    // Important variables
    const {prefix, user } = useContext(UserContext)
    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [project, setProject] = useState({});
    const {id} = useParams();
    let history = useHistory();
    let location = useLocation();

    // On page load, try to load project else redirect.
    useEffect(()=>{
        axios.get(`${prefix}projects/${id}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => res.data)
        .then(body => {
            console.log(`${body.project_detail.project_name}: Loaded`);
            setProject(body);
            let pid = body.id;

            // If project loads, then load in the tickets.
            axios.get(`${prefix}projects/${id}/tickets`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.data)
            .then(body => {
                body && console.log(`Tickets: Loaded`);
                setTickets([["Ticket Id", "Status", "Created At", "View"], ...mapTickets(body, pid)])
            })
            .catch(err => {
                console.log("No Tickets were found!");
            })

        })
        .catch(err => {
            console.log("Project wasn't found!");
            history.push(`/projects`);
        })
    }, [location.pathname, history, id, prefix, user])
    
    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer" id="">

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0 p-1">
                <TableSideProjects/>
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="container-fluid d-flex page m-0 p-2 align-items-center">
                <div className="whole_chunk">
                    <h1 className="text-center">{project}</h1>
                    <Button className="btn btn-primary" variant="primary" onClick={() => setCreateTicketModalShow(true)}>
                        Create Ticket
                    </Button>
                    <CreateTicketModal
                        show={createTicketModalShow}
                        onHide={() => setCreateTicketModalShow(false)}
                    />
                    {tickets.length > 0 && <TableWithLink content={tickets}/>}
                </div>
            </div>
        </div>
    )
}