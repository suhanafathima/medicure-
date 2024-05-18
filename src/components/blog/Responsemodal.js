import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const ResponseModal = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Response</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">Are u sure want to update</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default ResponseModal;