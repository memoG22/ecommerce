import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//Use this inn compoent to use
//<Modal toggleModal={toggleModal} isOpen={isOpen} />

function ViewItemModal(props) {
  const [isOpen, toggleModal] = React.useState(props.isOpen);

  return (
    <div>
      <Button color="danger" onClick={() => props.toggleModal(!props.isOpen)}>
        {props.buttonLabel}
      </Button>
      <Modal isOpen={props.isOpen}>
        <ModalHeader>
          <h1>Upload Your Product</h1>
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.toggleModal(!props.isOpen)}
          >
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={() => toggleModal(!props.isOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewItemModal;
