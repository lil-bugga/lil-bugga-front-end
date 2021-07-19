import {Bar} from "react-chartjs-2"
import Table from "../Components/Table"
import TableWithLink from "../Components/TableWithLink"
import {useState, useEffect, useContext} from 'react'
import CreateTicketModal from "./../Components/CreateTicketModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"

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

// Map projects to array format.
function mapTickets(tickets, pid){
    return tickets.reduce((out, row) => {
        console.log(pid)
        return out.concat([[row.id, row.status, row.created_at, `${pid}/${row.id}`]])
    }, [])
}

export default function Project(props) {

    const {prefix, user } = useContext(UserContext)

    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [project, setProject] = useState({});

    const {id} = useParams();
    let history = useHistory();

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
    }, [])

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer" >

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0 p-1">
                <Table 
                    className="w-100"
                    content={projects}
                />
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="container-fluid d-flex page m-0 p-0">
                
                <div className="container-fluid quart_chunk">
                    <h2>Project Name here</h2>
                    <p>Data Required</p>
                    <ul>
                        <li>current user name</li>
                        <li>project information and all tickets</li>
                    </ul>
                </div>
                <div className="quart_chunk p-1">
                    <h2>Ticket History</h2>
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