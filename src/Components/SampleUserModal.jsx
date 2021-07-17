import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import UserImage from "./../assets/user.png"
import {useContext} from 'react'
import {UserContext} from './UserProvider'

export default function SampleUserModal(props) {

  const { handleSampleLogin } = useContext(UserContext)

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
        <Link className="btn btn-primary w-75" onClick={handleSampleLogin} to="/dashboard">Log in Sample User</Link>
      </Modal.Body>
    </Modal>
  );
}
