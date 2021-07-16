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
import axios from 'axios'

// Main Website Application
export default function App() {
  
  let [user, setUser] = useState({})
  let prefix = "http://localhost:3000/api/v1/";

  // On render, if user exists, extract it and set it to state.
  // Calls the API to check jwt is still valid
  useEffect(()=> {
    let store = localStorage.getItem("user");

    if(store){
      let saved_user = JSON.parse(store);

      axios.get(`${prefix}projects`, {headers: {"Authorization": `Bearer ${saved_user.jwt}`}})
      .then(res => {
        if(res.data){
          // JWT is good!
          setUser(saved_user);
        }else {
          // JWT is expired
          setUser(false);
          localStorage.removeItem("user");
        }
        // setUser(saved_user)
      })
      .catch(err =>{
        if(saved_user.name == "Sample User"){
          setUser(saved_user);
        } else {
          setUser(false);
          localStorage.removeItem("user");
        }
      })
    }

  }, [])

  function userLogin(email, jwt){
    console.log(`Logging in ${email}.`);
    setUser({"name":email, "email":email, "jwt":jwt })
    localStorage.setItem("user", JSON.stringify({"name":email, "email":email, "jwt":jwt }));
  }

  // On login to sample user, save user so they persist throughout page. (jwt, email, name)
  function handleSampleLogin(e){
    console.log("Logging in sample user")
    e.preventDefault();
    setUser({"name": "Sample User", "email":"sample@user.com", "jwt":"asdfasdfasdf;lk;lkj;lkj"})

    localStorage.setItem("user", JSON.stringify({"name": "Sample User", "email":"sample@user.com", "jwt":"asdfasdfasdf;lk;lkj;lkj"}));
    
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
            <Landing user={user} userLogin={userLogin} sampleUserLogin={handleSampleLogin} prefix={prefix}/>
          </Route>
          
          {/* Regular Routes - NavBar renders on all */}
          <Route>
            
            {/* Common to all Pages except Landing */}
            {!user ? <Redirect to="/"/> : <></>}
            <NavBar userSignOut={signOut}/>

            <Switch>
              <Route path="/dashboard">
                <Dashboard user={user} prefix={prefix}/>
              </Route>
              <Route path="/account">
                <Account user={user}/>
              </Route>
              <Route exact path="/project/:id">
                <Project user={user} prefix={prefix}/>
              </Route>
              <Route path="/projects">
                <AllProjects user={user} prefix={prefix}/>
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