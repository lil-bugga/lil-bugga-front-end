import Modal from 'react-bootstrap/Modal'
import NewProjectForm from './NewProjectForm';

export default function SampleUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="create-project-modal">
          Create a Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <NewProjectForm prefix={props.prefix} user={props.user} closeModal={props.onHide}/>
        
      </Modal.Body>
    </Modal>
  );
}
