import './App.css';
import NavBar from './Components/NavBar';
import Landing from "./Pages/Landing"
import Dashboard from './Pages/Dashboard';
import Account from "./Pages/Account"
import AllProjects from './Pages/AllProjects';
import Project from "./Pages/Project"
import ProjectTicket from "./Pages/ProjectTickets"
import Ticket from "./Pages/Ticket"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useEffect} from 'react'

// Main Website Application
export default function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* Landing Page - no navigation bar */}
          <Route exact path="/">
            <Landing/>
          </Route>
          
          {/* Regular Routes - NavBar renders on all */}
          <Route>

            <NavBar/>

            <Switch>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
              <Route path="/account">
                <Account/>
              </Route>
              <Route exact path="/project">
                <Project/>
              </Route>
              <Route path="/projects">
                <AllProjects/>
              </Route>
              <Route path="/project_tickets">
                <ProjectTicket/>
              </Route>
              <Route path="/ticket">
                <Ticket/>
              </Route>

              {/* No Match */}
              <Route path="*">  
                That path doesn't exist, retreat!
              </Route>

            </Switch>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}