import {Bar} from "react-chartjs-2"
import Table from "../Components/Table"
import TableWithLink from "../Components/TableWithLink"
import {useState, useEffect, useContext} from 'react'
import CreateTicketModal from "./../Components/CreateTicketModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory, useLocation, Link } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"
import TableSideProjects from "../Components/TableSideProjects"

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: getComputedStyle(document.querySelector("#root")).getPropertyValue("--theme-1"),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0.5,
        data: [65, 59, 80, 81, 56]
      }
    ]
}

let projects = [["Projects"], ["lil bugga"], ["chat point"]]

// Get an array of users ids and the roles
function mapUsers(usersArray){
    return usersArray.reduce((out, user) => {
        return out.concat([[user.user_id, user.role]])
    }, [])
}

function myRole(id, usersArray){
    return usersArray.reduce((a,i) => i[0] == id ? i[1] : a, -1)
}

// Map projects to array format.
function mapTickets(tickets, pid){
    return tickets.reduce((out, row) => {
        return out.concat([[row.id, row.status, row.created_at, `/project/ticket/${pid}/${row.id}`]])
    }, [])
}

export default function Project(props) {

    const {prefix, user } = useContext(UserContext)

    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const [userID, setUserID] = useState(-1);
    const [tickets, setTickets] = useState([]);
    const [project, setProject] = useState({});
    const [users, setUsers] = useState([])

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

            // Get the user_id and user roles if any projects exist.
            setUserID(body.user_id)
            setUsers(mapUsers(body.project_users));

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
    }, [location.pathname])

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer" >

            {/* Side Bar */}
            <div className="side_panel m-0 p-1">
                <TableSideProjects/>
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="d-flex page m-0 p-0 w-100">
                
                <div className="container-fluid quart_chunk">
                    {/* Allows resilience to non-instant loads */}
                    {project.project_detail ? 
                        <>
                        <h2>Project: {project.project_detail.project_name}</h2> 
                        <p className="text-center">{project.project_detail.description}</p>
                        <p className="text-center">({myRole(userID, users)})</p>
                        <p className="text-center">View Users - Owner and Admin can edit user roles</p>
                        </>
                    : <></>}

                    {/* Only Project Owners can access these parts */}
                    {project.project_detail && myRole(userID, users) == "owner" ? 
                        <>
                            <hr/>
                            <p>Update Project - Lumped into a project settings form.</p>
                            <p>Delete Project</p>
                        </>
                    : <></>}
                </div>
                <div className="quart_chunk p-1">
                    <h2>Ticket History</h2>
                    <Link class="btn btn-primary" to={`/project/tickets/${id}`}>View all Tickets</Link>
                    <Bar
                        data={state}
                        options={{
                        title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                        }}
                    />
                </div>
                <div id="Tickets" className="quart_chunk d-flex flex-column">
                    <h2 class="text-center">Tickets</h2>
                    <Button variant="primary" onClick={() => setCreateTicketModalShow(true)}>
                        Create Ticket
                    </Button>
                    <CreateTicketModal
                        show={createTicketModalShow}
                        onHide={() => setCreateTicketModalShow(false)}
                    />
                    {tickets.length > 0 ? <TableWithLink content={tickets}/> : <></>}
                </div>

            </div>
        </div>
    )
}