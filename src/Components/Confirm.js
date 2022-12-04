import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Confirm(props,{onDelete}) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Confirm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <p>
            <b>Are you sure you want to delete?</b> <br/>Selected note will be deleted permanently, the action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.onHide()}>Cancel</Button>
          <Button variant="danger" onClick={()=>props.onHide(true)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

export default Confirm;