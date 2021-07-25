import Modal from 'react-bootstrap/Modal'
import { useContext } from 'react'
import {UserContext} from "./UserProvider"
import { Link } from 'react-router-dom'
import Admin from "./../assets/admin.svg"
import Developer from "./../assets/developer.svg"
import Client from "./../assets/pleb.svg"
import Owner from "./../assets/owner.svg"
import axios from 'axios'

export default function SampleUserModal(props) {

  const { userLogin,  prefix } = useContext(UserContext)

  //Handle sign in.
  function logInSample(e){
    e.preventDefault();

    let user = {
      email: `${e.target.getAttribute('name')}@sample.com`,
      password: "password"
    }

    axios.post(`${prefix}users/signin`, { user })
    .then(res => {
      userLogin(res.data.username, res.data.email, res.data.jwt);
    })
    .catch(err => {
      alert(`${err.message}No server response!`)
      
    })
  }

  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-center">
          Select Sample User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="user">
          <img src={Client} alt="Client User"/> 
          <Link name="sample" className="btn btn-primary w-75" onClick={logInSample} to="/dashboard">Log in Client</Link>
        </div>
        <div className="user">
          <img src={Developer} alt="Client User"/>
          <Link name="developer" className="btn btn-primary w-75" onClick={logInSample} to="/dashboard">Log in Developer</Link>
        </div>
        <div className="user">
          <img src={Admin} alt="Client User"/>
          <Link name="admin" className="btn btn-primary w-75" onClick={logInSample} to="/dashboard">Log in Admin</Link>
        </div>
        <div className="user">
          <img src={Owner} alt="Client User"/>
          <Link name="owner" className="btn btn-primary w-75" onClick={logInSample} to="/dashboard">Log in Owner</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
