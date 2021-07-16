import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
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

        <NewProjectForm/>
        
      </Modal.Body>
    </Modal>
  );
}
