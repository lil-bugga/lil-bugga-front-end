import {Bar} from "react-chartjs-2"
import Table from "../Components/Table"
import {useState, useEffect} from 'react'
import CreateTicketModal from "./../Components/CreateTicketModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios'

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0.5,
        data: [65, 59, 80, 81, 56]
      }
    ]
}

let projects = [["Projects"], ["lil bugga"], ["chat point"]]

let tickets = [["Project", "Ticket", "Change"], 
    ["lil bugga","Glitchy landing page.","Importance has shifted to urgent."], 
    [4,5,6]]

export default function Project(props) {

    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const [project, setProject] = useState({});

    const {id} = useParams();
    let history = useHistory();

    // On page load, try to load project else redirect.
    useEffect(()=>{
        axios.get(`${props.prefix}projects/${id}`, {headers: {"Authorization": `Bearer ${props.user.jwt}`}})
        .then(res => res.data)
        .then(body => {
            console.log(`${body.project_detail.project_name}: Loaded`);
            setProject(body);
        })
        .catch(err => {
            console.log("Project wasn't found!");
            history.push({pathname: "/projects", props:{user:props.user, prefix:props.user}});
        })
    }, [])

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0" id="">

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0 p-1">
                <Table 
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
                <div id="Tickets" className="quart_chunk p-1">
                    <h2>Tickets</h2>
                    <Button variant="primary" onClick={() => setCreateTicketModalShow(true)}>
                        Create Ticket
                    </Button>
                    <CreateTicketModal
                        show={createTicketModalShow}
                        onHide={() => setCreateTicketModalShow(false)}
                    />
                    <Table
                        content={tickets}
                    />
                </div>

            </div>
        </div>
    )
}