import './App.css';
import NavBar from './Components/NavBar';
import Landing from "./Pages/Landing"
import Dashboard from './Pages/Dashboard';
import AllProjects from './Pages/AllProjects';
import Project from "./Pages/Project"
import ProjectTicket from "./Pages/ProjectTickets"
import Ticket from "./Pages/Ticket"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserProvider from './Components/UserProvider';
import UserRedirect from "./Components/UserRedirect"
import UnauthorizedUserRedirect from "./Components/UnauthorizedUserRedirect"

// Main Website Application
export default function App() {

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>

            {/* Landing Page - no navigation bar */}
            <Route exact path="/">
              <UserRedirect/>
              <Landing/>
            </Route>
            
            {/* Regular Routes - NavBar renders on all */}
            <Route>

              {/* Common to all Pages except Landing */}
              <UnauthorizedUserRedirect/>
              <NavBar/>

              <Switch>
                <Route path="/dashboard">
                  <Dashboard/>
                </Route>
                <Route exact path="/project/:id">
                  <Project/>
                </Route>
                <Route path="/projects">
                  <AllProjects/>
                </Route>
                <Route path="/project/tickets/:id">
                  <ProjectTicket/>
                </Route>
                <Route path="/project/ticket/:id/:tid">
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
      </UserProvider>
    </div>
  );
}