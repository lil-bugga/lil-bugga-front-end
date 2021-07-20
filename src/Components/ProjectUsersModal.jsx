import Modal from 'react-bootstrap/Modal'
import ProjectUsersTable from './../Components/ProjectUsersTable'

export default function ProjectUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="create-project-modal">
          The Crew
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <ProjectUsersTable user_id={props.user_id} users={props.users} closeModal={props.onHide}/>
        
      </Modal.Body>
    </Modal>
  );
}
