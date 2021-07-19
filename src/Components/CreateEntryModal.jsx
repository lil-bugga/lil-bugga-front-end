import Modal from 'react-bootstrap/Modal'
import NewEntryForm from './NewEntryForm';

export default function CreateEntryModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="create-entry-modal">
          Create an Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <NewEntryForm/>
        
      </Modal.Body>
    </Modal>
  );
}
