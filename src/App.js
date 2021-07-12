import './App.css';
import Landing from "./Pages/Landing"
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

// Main Website Application
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* Landing Page - no navigation bar */}
          <Route exact path="/">
            <Landing/>
          </Route>

          <Route path="/dashboard">
            <Dashboard/>
          </Route>

          {/* No Match */}
          <Route path="*">
            That path doesn't exist, retreat!
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;