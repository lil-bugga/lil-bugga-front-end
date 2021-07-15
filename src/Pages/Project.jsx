import {Bar} from "react-chartjs-2"
import Table from "../Components/Table"

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

let projects = [["Projects"], ["lil bugga"], ["chat point"]]

let tickets = [["Project", "Ticket", "Change"], 
    ["lil bugga","Glitchy landing page.","Importance has shifted to urgent."], 
    [4,5,6]]

export default function Project() {
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
                    <h2>Project Information</h2>
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
                    <Table
                        content={tickets}
                    />
                </div>

            </div>
        </div>
    )
}