import Table from "../Components/Table"
import {Bar} from "react-chartjs-2"
import UserImage from "./../assets/user.png"
import {useEffect} from 'react'
import { useHistory } from "react-router"

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function Dashboard(props){

  let history = useHistory();

  let notifications = [["Project", "Ticket", "Change"], 
    ["lil bugga","Glitchy landing page.","Importance has shifted to urgent."], 
    [4,5,6]]

  return(
    <div className="container-fluid h-100">
      
      <h1 className="text-center title">{props.user.name}</h1>

      <div className="container-fluid d-flex flex-wrap page p-0" id="Dashboard">
        <div className="container-fluid quart_chunk p-1">
          <h2>Account</h2>
          <div className="d-flex">
          <img src={UserImage}/>
          <div className="d-flex flex-column">
            <p><b>Email Address</b></p>
            <p><b>Owner of 4 projects.</b></p>
            <p><b>Developer in 2 projects.</b></p>
          </div>
          </div>
        </div>
        <div className="quart_chunk p-1">
          <h2>Notifications</h2>
          <Table
            content={notifications}
          />
        </div>
        <div className="quart_chunk p-1">
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
        <div className="quart_chunk p-1">
          <h2>Projects</h2>
          <p>Data Required</p>
          <ul>
              <li>current user data - all</li>
              <li>associated projects for user</li>
              <li>associated tickets for the user</li>
              <li>potentially notifications or updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}