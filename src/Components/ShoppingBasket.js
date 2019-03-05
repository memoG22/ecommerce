import React from "react";
import Styles from "./Css/Nav.module.css";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import ItemModal from "../Shared/ItemModal";
import axios from "axios";

function ShoppingBasket(props) {
  const [creditCard, setCreditCard] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [isCheckoutOpen, toggleCheckoutModal] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState("");
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isOpen, toggleViewModal] = React.useState(false);
  const [viewItem, setViewItem] = React.useState([]);
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState("");
  const [currentUserItems, setCurrentUserItems] = React.useState([]);

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  function appendItems(currentUserItems) {
    debugger;
    calculateTotal(currentUserItems);
    ifEmpty(currentUserItems);
  }

  function getCurrentUser() {
    axios.get("/api/currentuser").then(response => {
      console.log(response);
    });
    debugger;
    let currentUserEmail = sessionStorage.userEmail;
    let currentUserId = sessionStorage.userId;
    if (sessionStorage.length === 0) {
      setIsEmpty(true);
      console.log("no user");
    }
    setCurrentUserEmail(currentUserEmail);
    setCurrentUserId(currentUserEmail);
    getCurrentUserList(currentUserId);
    console.log(currentUserId);
  }

  function getCurrentUserList(currentUserId) {
    debugger;
    let id = Number(currentUserId);
    axios.get("/api/getorder/" + id).then(response => {
      let currentUserItems = response.data;
      setCurrentUserItems(currentUserItems);
      appendItems(currentUserItems);
      console.log(currentUserItems);
    });
  }
  function ifEmpty(currentUserItems) {
    debugger;
    if (currentUserItems === 0) {
      setIsEmpty(true);
      return "0";
    }
  }

  function ifZero(int) {
    if (int === 0) {
      return 0;
    } else {
      return int;
    }
  }

  function calculateTotal(currentUserItems) {
    let totalPrice = 0;
    for (let val of currentUserItems) {
      totalPrice += val.Price;
    }
    if (totalPrice === 0 || totalPrice === null || totalPrice === undefined) {
      return;
    } else {
      appendTotal(totalPrice);
    }
  }

  function appendTotal(totalPrice) {
    setTotalPrice(totalPrice);
  }

  function imageClick(item) {
    console.log("modal");
    setViewItem(item);
    toggleViewModal(!isOpen);
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
            <Button
              onClick={() => toggleCheckoutModal(!isCheckoutOpen)}
              color="primary"
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
      <div className="row" style={{ display: "inline-flex" }}>
        {currentUserItems.map(item => (
          <div key={item.Id} className="col sm-4">
            <div>
              <ul>
                <div style={{ width: "20vw", height: "20vh" }}>
                  <img
                    onClick={() => imageClick(item)}
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
        <Modal isOpen={isCheckoutOpen}>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => toggleCheckoutModal(!isCheckoutOpen)}
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
              onClick={() => toggleCheckoutModal(!isOpen)}
            >
              Buy
            </Button>
          </ModalBody>
        </Modal>
      </div>
      {isOpen && (
        <div>
          <ItemModal
            isOpen={isOpen}
            viewItem={viewItem}
            toggleModal={toggleViewModal}
          />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { shoppingCart: state.shoppingCart };
}

export default connect(mapStateToProps)(ShoppingBasket);
