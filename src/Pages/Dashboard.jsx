import React from 'react'
import Table from "../Components/Table"
import {Bar} from "react-chartjs-2"
import {useState, useContext} from 'react'
import CreateProjectModal from "./../Components/CreateProjectModal"
import Button from "react-bootstrap/Button"
import EditAccountModal from '../Components/EditAccountModal'
import {UserContext} from "./../Components/UserProvider"

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

export default function Dashboard(props){

  const {user, prefix} = useContext(UserContext);
  
  const [createProjectModalShow, setCreateProjectModalShow] = useState(false);
  const [editAccountModalShow, setEditAccountModalShow] = useState(false);

  let notifications = [["Project", "Ticket", "Change"], 
    ["lil bugga","Glitchy landing page.","Importance has shifted to urgent."], 
    [4,5,6]]

  return(
    <div className="container-fluid d-flex flex-wrap page py-3 outer" id="Dashboard">

      <div className="quart_chunk p-2 my-3">
        <h2>Account</h2>
        <Button variant="primary" onClick={() => setEditAccountModalShow(true)}>
          Edit Account
        </Button>
        
        <div className="d-flex">
          <EditAccountModal
            show={editAccountModalShow}
            onHide={() => setEditAccountModalShow(false)}
          />
          <div className="d-flex flex-column">
            <p><b>{user.email}</b></p>
            <p><b>Owner of 4 projects.</b></p>
          </div>
        </div>
      </div>

      <div className="quart_chunk p-2 my-3">
        <h2>Notifications</h2>
        <Table
          content={notifications}
        />
      </div>

      <div className="quart_chunk p-2 my-3" >
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

      <div className="quart_chunk p-2 my-3">
        <h2>Projects</h2>

        <Button variant="primary" onClick={() => setCreateProjectModalShow(true)}>
          Create a Project
        </Button>
        <CreateProjectModal
          show={createProjectModalShow}
          onHide={() => setCreateProjectModalShow(false)}
        />

        <p>Data Required</p>
        <ul>
            <li>current user data - all</li>
            <li>associated projects for user</li>
            <li>associated tickets for the user</li>
            <li>potentially notifications or updates</li>
        </ul>
      </div>
      
    </div>
  )
}