import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-0" id="NavBar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">lil bugga</a>

          <div className="navbar py-0" id="navbarSupportedContent">

                <Link className="nav-link py-0" to="/">Landing</Link>
                <Link className="nav-link py-0" to="/dashboard">Dashboard</Link>
                <Link className="nav-link py-0" to="/account">Account</Link>
                <Link className="nav-link py-0" to="/project">Project</Link>
                <Link className="nav-link py-0" to="/projects">Projects</Link>
                <Link className="nav-link py-0" to="/project_tickets">Project Tickets</Link>
                <Link className="nav-link py-0" to="/ticket">Ticket</Link>
          </div>   
        </div>
      </nav>
    )
}