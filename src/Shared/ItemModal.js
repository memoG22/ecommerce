import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function ItemModal(props) {
  const [isOpen, toggleModal] = React.useState(false);

  return (
    <div>
      <Modal isOpen={props.isOpen}>
        <Button color="danger" onClick={() => props.toggleModal(!props.isOpen)}>
          X
        </Button>
        <ModalBody>
          <div>
            <ul>
              <img
                width={"100%"}
                height={"100%"}
                style={{ width: "100%", height: "100%" }}
                src={props.viewItem.Image}
                alt="none"
              />
              <br />
              <div>
                <b>{props.viewItem.Name}</b>
              </div>
              <br />
              <div> $ {props.viewItem.Price}</div>
              <br />
              <div>{props.viewItem.Description}</div>
              <Button
                // onClick={() => addToShopcart(props.viewItem)}
                color="primary"
              >
                Add to Shopping Cart
              </Button>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </div>
  );
}

export default ItemModal;
