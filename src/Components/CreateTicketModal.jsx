import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import NewTicketForm from './NewProjectForm';

export default function SampleUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="create-ticket-modal">
          Create a Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <NewTicketForm/>
        
      </Modal.Body>
    </Modal>
  );
}
