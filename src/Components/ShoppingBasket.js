import React from "react";
import Styles from "./Nav.module.css";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";

function ShoppingBasket(props) {
  const [items, setItems] = React.useState([]);
  const [creditCard, setCreditCard] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [isOpen, toggleModal] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState("");
  const [isEmpty, setNotEmpty] = React.useState(true);

  React.useEffect(() => {
    appendItems();
  });

  function appendItems() {
    let items = props.shoppingCart;
    setItems(items);
    calculateTotal(items);
    ifEmpty(items);
  }

  function ifEmpty(items) {
    if (items.length >= 1) {
      setNotEmpty(false);
      return 0;
    }
  }

  function ifZero(int) {
    if (int == 0) {
      return 0;
    } else {
      return int;
    }
  }

  function calculateTotal(items) {
    let totalPrice = 0;
    for (let val of items) {
      totalPrice += val.Price;
    }
    if (totalPrice == 0 || totalPrice == null || totalPrice == undefined) {
      return;
    } else {
      appendTotal(totalPrice);
    }
  }

  function appendTotal(totalPrice) {
    setTotalPrice(totalPrice);
  }

  return (
    <div>
      <div className="row">
        <div className="col sm-4">
          <h1 className={Styles.textCenter}>Your Items</h1>
        </div>
      </div>
      {isEmpty && (
        <div className={Styles.textCenter}>
          You have no items in your shopping cart
        </div>
      )}
      <div>
        <div className={Styles.checkout}>
          <div>
            <b>Total</b> $ {ifZero(totalPrice)}
            <br />
            <Button onClick={() => toggleModal(!isOpen)} color="primary">
              Check out
            </Button>
          </div>
        </div>
      </div>
      <div clasname="row" style={{ display: "inline-flex" }}>
        {items.map(item => (
          <div key={item.Id} className="col sm-4">
            <div>
              <ul>
                <div style={{ width: "20vw", height: "20vh" }}>
                  <img
                    width={"100%"}
                    height={"100%"}
                    style={{ width: "100%", height: "100%" }}
                    src={item.Image}
                    alt="no image"
                  />
                </div>
                <br />
                <div>
                  <b>{item.Name}</b>
                </div>
                <br />
                <div>
                  <b>Price:</b> ${item.Price}
                </div>
                <br />
                <div>
                  <Button color="danger">Remove Item</Button>
                </div>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Modal isOpen={isOpen}>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => toggleModal(!isOpen)}
          >
            X
          </Button>
          <ModalBody>
            Fistname
            <br />
            <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
            />
            <br />
            Lastname
            <br />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
            />
            <br />
            Creit card info
            <br />
            <input
              type="number"
              placeholder="credit card number"
              value={creditCard}
              onChange={e => setCreditCard(e.target.value)}
            />
            <br />
            <Button
              style={{ backgroundColor: "primary" }}
              onClick={() => toggleModal(!isOpen)}
            >
              Buy
            </Button>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { shoppingCart: state.shoppingCart };
}

export default connect(mapStateToProps)(ShoppingBasket);
