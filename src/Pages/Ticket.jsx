import Table from "../Components/Table"
import TableWithLink from "../Components/TableWithLink"
import TableSideProjects from "../Components/TableSideProjects"
import {useState, useEffect, useContext} from 'react'
import CreateEntryModal from "./../Components/CreateEntryModal"
import Button from "react-bootstrap/Button"
import { useParams, useHistory, useLocation } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"

// Map projects to array format.
function mapTickets(tickets){
    return tickets.reduce((out, row) => {
        return out.concat([[row.id, row.subject, row.body, row.created_at, row.user_id]])
    }, [])
}

export default function ProjectTickets() {
    // Important variables
    const {prefix, user } = useContext(UserContext)
    const [createEntryModalShow, setCreateEntryModalShow] = useState(false);
    const [entries, setEntries] = useState([]);
    const [ticketData, setTicketData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const {id, tid} = useParams();
    let history = useHistory();
    let location = useLocation();

    // On page load, try to load entires else redirect.
    useEffect(()=>{
        axios.get(`${prefix}projects/${id}/tickets/${tid}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => {
            setTicketData(res.data)
            return res.data.entries
        })
        .then(body => {
            let pid = id;
            setEntries([["Id", "Subject", "Body", "Created At", "User Id"], ...mapTickets(body)])
        })
        .catch(err => {
            console.log("Project wasn't found!");
        })
    }, [location.pathname, refresh])

    // Method to reload the entries on upload.
    function handleEntry(){
        setRefresh(!refresh)
    }
    
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
                    <h1 class="text-center">Ticket: {ticketData.id}</h1>
                    <h4 class="text-center">Info on the first entry</h4>
                    <Button class="btn btn-primary" variant="primary" onClick={() => setCreateEntryModalShow(true)}>
                        Create Entry
                    </Button>
                    <CreateEntryModal
                        show={createEntryModalShow}
                        onHide={() => {
                            handleEntry();
                            setCreateEntryModalShow(false)
                        }}
                        handleEntry={handleEntry}
                    />
                    {entries.length > 1 && <Table content={entries}/>}
                </div>
            </div>
        </div>
    )
}