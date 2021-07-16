import Modal from 'react-bootstrap/Modal';
import NewAccountForm from "./../Components/NewAccountForm"

export default function CreateAccountModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="edit-account-modal">
          Create Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <NewAccountForm/>
        
      </Modal.Body>
    </Modal>
  );
}
