import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import Admin from "./../assets/admin.svg"
import Developer from "./../assets/developer.svg"
import Client from "./../assets/pleb.svg"
import Owner from "./../assets/owner.svg"

export default function SampleUserModal(props) {

  return (
    <Modal
      {...props}s
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Sample User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="user">
          <img src={Client} alt="Client User"/> 
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Client</Link>
        </div>
        <div className="user">
          <img src={Developer} alt="Client User"/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Developer</Link>
        </div>
        <div className="user">
          <img src={Admin} alt="Client User"/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Admin</Link>
        </div>
        <div className="user">
          <img src={Owner} alt="Client User"/>
          <Link className="btn btn-primary w-75" onClick={props.handleLogin} to="/dashboard">Log in Owner</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
