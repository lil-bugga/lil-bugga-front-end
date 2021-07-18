import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import Admin from "./../assets/admin.svg"
import Developer from "./../assets/developer.svg"
import Client from "./../assets/pleb.svg"
import Owner from "./../assets/owner.svg"

export default function SampleUserModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Sample User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="user">
          <img src={Client}/> 
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Client</Link>
        </div>
        <div class="user">
          <img src={Developer}/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Developer</Link>
        </div>
        <div class="user">
          <img src={Admin}/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Admin</Link>
        </div>
        <div class="user">
          <img src={Owner}/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Owner</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
