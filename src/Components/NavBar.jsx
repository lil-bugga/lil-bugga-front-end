import {Link} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from "./UserProvider"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from "react-bootstrap/Nav"

export default function NavBar(props) {

  const {userSignOut } = useContext(UserContext)

  return (
    <Navbar collapseOnSelect expand="lg" id="NavBar">
      <Container class="d-flex px-3 py-0 w-100" id="NavBarContainer">
        <Navbar.Brand href="#home">lil bugga</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" class="ms-auto"/>
        <Navbar.Collapse id="responsive-navbar-nav w-100">
          <Nav className="ms-auto">
            <Link className="nav-link py-0" to="/dashboard">Dashboard</Link>
            <Link className="nav-link py-0" to="/account">Account</Link>
            <Link className="nav-link py-0" to="/projects">Projects</Link>
            <a href="#" className="nav-link py-0" onClick={userSignOut}>Sign Out</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}