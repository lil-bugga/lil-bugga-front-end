import {Bar} from "react-chartjs-2"
import TableWithLink from "../Components/TableWithLink"
import {useState, useEffect, useContext} from 'react'
import CreateTicketModal from "./../Components/CreateTicketModal"
import ProjectUsersModal from "../Components/ProjectUsersModal"
import ProjectSettingsModal from "../Components/ProjectSettingsModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory, useLocation, Link } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"
import TableSideProjects from "../Components/TableSideProjects"

// Takes histogram and returns state ready for graph.
function histogramState(data){
    if (data){
        return {
            labels: data.map(p => p[0]),
            datasets: [
                {
                label: 'Tickets',
                backgroundColor: getComputedStyle(document.querySelector("#root")).getPropertyValue("--theme-1"),
                borderColor: 'rgba(0,0,0,0.5)',
                borderWidth: 1,
                data: data.map(p => p[1])
                }
            ]
        }
    } else { 
        return null;
    }
}

// Turns ticket and project Ids into a histogram for graphing.
function ticketHistogram(data){
    let hist = [];
    data.forEach(e => {
        if(hist.length > 0 && hist.reduce((a,p) => p[0]=== e[0] ? true : a ,false)){
        hist.find(val => val[0] === e[0])[1]++;
        } else {
        hist.push([e[0], 1])
        }
    })
    return hist;
}

// Get an array of users ids and the roles
function mapUsers(usersArray){
    return usersArray.reduce((out, user) => {
        return out.concat([[user.user_id, user.role]])
    }, [])
}

function myRole(id, usersArray){
    return usersArray.reduce((a,i) => i[0] === id ? i[1] : a, -1)
}

// Map projects to array format.
function mapTickets(tickets, pid){
    return tickets.reduce((out, row) => {
        return out.concat([[row.id, 
            row.status, 
            new Date(row.created_at).toString('YYYY-MM-dd').split(" ").slice(0,4).join(" "), 
            `/project/ticket/${pid}/${row.id}`]])
    }, [])
}

export default function Project(props) {

    const {prefix, user } = useContext(UserContext)

    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const [theCrewModal, setTheCrewModal] = useState(false);
    const [projectSettingsModal, setProjectSettingsModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [userID, setUserID] = useState(-1);
    const [tickets, setTickets] = useState([]);
    const [project, setProject] = useState({});
    const [users, setUsers] = useState([])

    const {id} = useParams();
    let history = useHistory();
    let location = useLocation();

    // Method that refreshes this page.
    function handleRefresh(){
        setRefresh(!refresh);
    }

    // On page load, try to load project else redirect.
    useEffect(()=>{
        if(user.jwt){
            axios.get(`${prefix}projects/${id}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => res.data)
            .then(body => {
                console.log(`Project Loaded: ${body.project_detail.project_name}`);
                setProject(body);
                let pid = body.id;

                // Get the user_id and user roles if any projects exist.
                setUserID(body.user_id)
                setUsers(mapUsers(body.project_users));

                // If project loads, then load in the tickets.
                axios.get(`${prefix}projects/${id}/tickets`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
                .then(res => res.data)
                .then(body => {
                    console.log(`Tickets: Loaded`);
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
        }
    }, [location.pathname, refresh, history, id, prefix, user, createTicketModalShow])

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer" >

            {/* Side Bar */}
            <div className="side_panel m-0 p-1">
                <TableSideProjects/>
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="d-flex page m-0 p-0 w-100">
                
                <div className="quart_chunk">
                    {/* Allows resilience to non-instant loads */}
                    {project.project_detail ? 
                        <>
                        <h2>Project: {project.project_detail.project_name}</h2> 
                        <p className="text-center">{project.project_detail.description}</p>
                        <p className="text-center">({myRole(userID, users)})</p>
                        <Button variant="primary rounded-0" onClick={() => setTheCrewModal(true)}>
                            The Crew
                        </Button>
                        <ProjectUsersModal
                            user_id={userID}
                            users={users}
                            show={theCrewModal}
                            onHide={() => setTheCrewModal(false)}
                        />
                        </>
                    : <></>}

                    {/* Only Project Owners can access these parts */}
                    {project.project_detail && myRole(userID, users) === "owner" ? 
                        <>
                            <hr/>
                            <p className="text-center"><b>Admin Settings</b></p>
                            <Button variant="primary rounded-0" onClick={() => setProjectSettingsModal(true)}>
                                Settings
                            </Button>
                            <ProjectSettingsModal
                            show={projectSettingsModal}
                            onHide={() => {
                                handleRefresh();
                                return setProjectSettingsModal(false)
                            }}
                            />
                        </>
                    : <></>}
                </div>
                <div className="quart_chunk p-1">
                    <h2>Ticket History</h2>
                    <Link className="btn btn-primary rounded-0" to={`/project/tickets/${id}`}>View all Tickets</Link>
                    { tickets.length > 0 ? 
                        <Bar
                            data={histogramState( ticketHistogram(tickets).splice(1) )}
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
                        /> : <></> }
                </div>
                <div id="Tickets" className="quart_chunk d-flex flex-column">
                    <h2 className="text-center">Tickets</h2>
                    <Button variant="primary rounded-0" onClick={() => setCreateTicketModalShow(true)}>
                        Create Ticket
                    </Button>
                    <CreateTicketModal
                        show={createTicketModalShow}
                        onHide={() => setCreateTicketModalShow(false)}
                    />
                    <div className="scrollable-wrapper">
                        {tickets.length > 0 ? <TableWithLink content={tickets}/> : <></>}
                    </div>
                </div>

            </div>
        </div>
    )
}