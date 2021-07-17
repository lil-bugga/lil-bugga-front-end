import Modal from 'react-bootstrap/Modal';
import NewAccountForm from "./../Components/NewAccountForm"
import {useContext} from 'react'
import {UserContext} from './UserProvider'

export default function CreateAccountModal(props) {


  const { userLogin, prefix } = useContext(UserContext)

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

        <NewAccountForm
          userLogin={userLogin}
          prefix={prefix}
        />
        
      </Modal.Body>
    </Modal>
  );
}
