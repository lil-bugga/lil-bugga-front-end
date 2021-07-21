import React from 'react'
import TableWithLink from "./../Components/TableWithLink"
import {Bar} from "react-chartjs-2"
import {useState, useContext, useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import CreateProjectModal from "./../Components/CreateProjectModal"
import Button from "react-bootstrap/Button"
import EditAccountModal from '../Components/EditAccountModal'
import {UserContext} from "./../Components/UserProvider"
import axios from 'axios'

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
  const [tickets, setTickets] = useState({});
  let history = useHistory();

  // On page load, load in projects and tickets. (If User jwt exists.)
  useEffect(()=>{
    if(user.jwt){
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

      axios.get(`${prefix}/tickets/user`, {headers: {"Authorization": `Bearer ${user.jwt}`}})
      .then(res => res.data)
      .then(body => {
          setTickets(body.map(t => [t.project_id, t.id ]))
          }
      )
      .catch(err => {
          console.log(err);
          history.push("/");
      })
    };
  }, [history, prefix, user])

  return(
    <div className="d-flex flex-wrap outer" id="Dashboard">

      <div className="quart_chunk">
        <h2>Account</h2>
        <Button variant="primary rounded-0" onClick={() => setEditAccountModalShow(true)}>
          Edit Account
        </Button>

        <EditAccountModal
          show={editAccountModalShow}
          onHide={() => setEditAccountModalShow(false)}
        />
        <div className="d-flex flex-column w-100">
          <h2>{user.username}</h2>
          <h3 className="text-center">{user.email}</h3>
        </div>

      </div>

      <div className="quart_chunk" >
        <h2>My Tickets</h2>
        { tickets.length > 0 ? <Bar
          data={histogramState( ticketHistogram(tickets) )}
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

      <div id="DashboardProjects" className="quart_chunk">
        <h2>Projects</h2>

        <Button variant="primary rounded-0" onClick={() => setCreateProjectModalShow(true)}>
          Create a Project
        </Button>
        <CreateProjectModal
          show={createProjectModalShow}
          onHide={() => setCreateProjectModalShow(false)}
        />
        <div className="scrollable-wrapper">
          {projects.length > 0 ? <TableWithLink content={projects}/> : <></>} 
        </div>
      </div>
      
    </div>
  )
}