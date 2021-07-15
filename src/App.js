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
import {useEffect, useState} from 'react'
import { Redirect } from 'react-router';

// Main Website Application
export default function App() {
  
  let [user, setUser] = useState(false)

  // On render, if user exists, extract it and set it to state.
  useEffect(()=> {
    let store = localStorage.getItem("user");
    if(store){
      let saved_user = JSON.parse(store);
      console.log(user)
      setUser(saved_user)
    }
  }, [])

  // On login to sample user, save user so they persist throughout page. (jwt, email, name)
  function handleSampleLogin(e){
    console.log("Logging in sample user")
    e.preventDefault();
    setUser({"name": "Sample User", "email":"sample@user.com", "jwt":"asdfasdfasdf;lk;lkj;lkj"})
    // This might error, may not be saving user due to async
    localStorage.setItem("user", JSON.stringify(user));
    
  }

  // Sign out functionality.
  function signOut(e){
    e.preventDefault();
    setUser(false);
    localStorage.removeItem("user");
  }

  return (
    <div className="App">
      <Router>
        <Switch>

          {/* Landing Page - no navigation bar */}
          <Route exact path="/">
            {user ? <Redirect to="/dashboard"/> : <></>}
            <Landing user={user} sampleUserLogin={handleSampleLogin}/>
          </Route>
          
          {/* Regular Routes - NavBar renders on all */}
          <Route>
            
            {/* Common to all Pages except Landing */}
            {!user ? <Redirect to="/"/> : <></>}
            <NavBar userSignOut={signOut}/>

            <Switch>
              <Route path="/dashboard">
                <Dashboard user={user}/>
              </Route>
              <Route path="/account">
                <Account user={user}/>
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