import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import UserImage from "./../assets/user.png"

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
          <img src={UserImage}/>
        <Link className="btn btn-primary w-75" onClick={props.sampleUserLogin} to="/dashboard">Log in Sample User</Link>
      </Modal.Body>
    </Modal>
  );
}
