import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
      <nav>
        <Link to="/">Landing</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    )
  }