import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
      <nav>
        <Link to="/">Landing</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/account">Account</Link>
        <Link to="/project">Project</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/project_tickets">Project Tickets</Link>
        <Link to="/ticket">Ticket</Link>
      </nav>
    )
}