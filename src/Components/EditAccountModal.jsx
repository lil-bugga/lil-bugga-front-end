import Modal from 'react-bootstrap/Modal'
import EditAccountForm from "./../Components/EditAccountForm"

export default function EditAccountModal(props) {



  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title id="edit-account-modal">
          Edit Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <EditAccountForm />
        
      </Modal.Body>
    </Modal>
  );
}
