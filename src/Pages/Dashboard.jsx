import React from 'react'
import TableWithLink from "./../Components/TableWithLink"
import {Bar} from "react-chartjs-2"
import {useState, useContext, useEffect} from 'react'
import { useLocation, useParams, useHistory} from 'react-router-dom'
import CreateProjectModal from "./../Components/CreateProjectModal"
import Button from "react-bootstrap/Button"
import EditAccountModal from '../Components/EditAccountModal'
import {UserContext} from "./../Components/UserProvider"
import axios from 'axios'

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: getComputedStyle(document.querySelector("#root")).getPropertyValue("--theme-1"),
      borderColor: 'rgba(0,0,0,0.5)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

// Map projects to array format.
function mapProjects(projects){
  return projects.reduce((out, row) => {
      return out.concat([[row.project_detail.project_name, `project/${row.project_detail.id}`]])
  }, [])
}

export default function Dashboard(props){

  // Important variables for the site
  const {user, prefix} = useContext(UserContext)
  const [createProjectModalShow, setCreateProjectModalShow] = useState(false);
  const [editAccountModalShow, setEditAccountModalShow] = useState(false);
  const [projects, setProjects] = useState({});
  const {id} = useParams();
  let history = useHistory();
  let location = useLocation();

  let notifications = [["Project", "Ticket", "Change"], 
    ["lil bugga","Glitchy landing page.","Importance has shifted to urgent."], 
    [4,5,6]]

  // On page load, load in projects.
  useEffect(()=>{
    axios.get(`${prefix}/projects`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
    .then(res => res.data)
    .then(body => {
        setProjects([["Project Name", "Link"], ...mapProjects(body)])
        }
    )
    .catch(err => {
        console.log(err);
        history.push("/");
    })
}, [])

  return(
    <div className="d-flex flex-wrap outer" id="Dashboard">

      <div className="quart_chunk">
        <h2>Account</h2>
        <Button variant="primary" onClick={() => setEditAccountModalShow(true)}>
          Edit Account
        </Button>
        
        <div className="d-flex">
          <EditAccountModal
            show={editAccountModalShow}
            onHide={() => setEditAccountModalShow(false)}
          />
          <div className="d-flex flex-column w-100">
            <h2>{user.email}</h2>
          </div>
        </div>
      </div>

      <div className="quart_chunk" >
        <h2>My Tickets</h2>
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

      <div id="DashboardProjects" className="quart_chunk">
        <h2>Projects</h2>

        <Button variant="primary" onClick={() => setCreateProjectModalShow(true)}>
          Create a Project
        </Button>
        <CreateProjectModal
          show={createProjectModalShow}
          onHide={() => setCreateProjectModalShow(false)}
        />
        {projects.length > 0 ? <TableWithLink content={projects}/> : <></>} 
      </div>
      
    </div>
  )
}