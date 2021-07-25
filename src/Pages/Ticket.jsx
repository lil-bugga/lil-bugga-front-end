import Table from "../Components/Table"
import TableSideProjects from "../Components/TableSideProjects"
import {useState, useEffect, useContext} from 'react'
import CreateEntryModal from "./../Components/CreateEntryModal"
import Button from "react-bootstrap/Button"
import { useParams, useLocation, useHistory } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../Components/UserProvider"

// Map projects to array format.
function mapTickets(tickets){
    return tickets.reduce((out, row) => {
        return out.concat([[
            row.subject, 
            row.body, 
            new Date(row.created_at).toString('YYYY-MM-dd').split(" ").slice(0,4).join(" "), 
            row.user_id
        ]])
    }, [])
}

export default function ProjectTickets() {
    // Important variables
    const {prefix, user } = useContext(UserContext)
    const [createEntryModalShow, setCreateEntryModalShow] = useState(false);
    const [entries, setEntries] = useState([]);
    const [ticketData, setTicketData] = useState({});
    const [status, setStatus] = useState("");
    const [refresh, setRefresh] = useState(false);
    const {id, tid} = useParams();
    let location = useLocation();
    const history = useHistory();

    // On page load, try to load entires else redirect.
    useEffect(()=>{
        if(user.jwt){
            axios.get(`${prefix}projects/${id}/tickets/${tid}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
            .then(res => {
                setTicketData(res.data)
                setStatus(res.data.status)
                return res.data.entries
            })
            .then(body => {
                setEntries([["Subject", "Body", "Created At", "User Id"], ...mapTickets(body)])
            })
            .catch(err => {
                console.log("Ticket wasn't found!");
            })
        }
    }, [location.pathname, refresh, id, tid, prefix, user])

    // Method to reload the entries on upload.
    function handleEntry(){
        setRefresh(!refresh)
    }

    // Method to delete a ticket, but only if admin.
    function handleDelete(e){
        e.preventDefault();
        axios.delete(`${prefix}projects/${id}/tickets/${tid}`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => {
            console.log("Ticket Deleted!")
            history.push(`/project/${id}`)
        })
        .catch(err => {
            alert(`${err.message}`);
        })
    }
    
    function handleStatusChange(e){
        e.preventDefault();
        setStatus(e.target.value);

        axios.patch(`${prefix}projects/${id}/tickets/${tid}`, {"ticket": {"status": e.target.value}}, {headers: {"Authorization": `Bearer ${user.jwt}`}})
        .then(res => {
            console.log("Ticket Status: Changed!")
        })
        .catch(err => {
            alert(`${err.message}`);
        })
    }

    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0 outer" id="">

            {/* Side Bar */}
            <TableSideProjects/>

            {/* Page adjacent to Side Bar */}
            <div className="d-flex page m-0 p-2 align-items-center">
                <div className="whole_chunk">
                    <h1 className="text-center">Ticket: #{ticketData.id} {ticketData.status}</h1>
                    <Button className="btn btn-primary rounded-0" variant="primary" onClick={() => setCreateEntryModalShow(true)}>
                        Create Entry
                    </Button>
                    <form className="text-center py-1">
                        <label>
                            Change Ticket Status:
                            <select value={status} onChange={handleStatusChange}>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </label>
                    </form>
                    <CreateEntryModal
                        show={createEntryModalShow}
                        onHide={() => {
                            handleEntry();
                            setCreateEntryModalShow(false)
                        }}
                    />
                    <div id="EntryTable" className="scrollable-wrapper rounded-0">
                        {entries.length > 1 && <Table content={entries}/>}
                    </div>
                    <button className="btn btn-danger w-100 rounded-0" variant="primary" onClick={handleDelete}>
                        Delete Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}