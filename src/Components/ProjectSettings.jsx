import Modal from 'react-bootstrap/Modal'
import EditProjectForm from './EditProjectForm';

export default function ProjectSettingsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="edit-project-modal">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <EditProjectForm closeModal={props.onHide}/>
        
      </Modal.Body>
    </Modal>
  );
}
