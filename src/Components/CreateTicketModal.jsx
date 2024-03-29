import Modal from 'react-bootstrap/Modal'
import NewTicketForm from './NewTicketForm';

export default function CreateTicketModal(props) {
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
