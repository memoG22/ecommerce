import React from "react";
import Styles from "./Nav.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Route, NavLink, withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ShopWomen(props) {
  const [items, setItems] = React.useState([]);
  const [shoppingCart, setShoppingCart] = React.useState([]);

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/item/female").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);
      }
      console.log(response);
    });
  }

  function addToShopcart(item) {
    props.setShoppingCart([...props.shoppingCart, item]);
  }

  return (
    <React.Fragment>
      <div>
        <div className="row">
          <div className="col sm-4">
            <h1 className={Styles.textCenter}>Shop Women</h1>
          </div>
        </div>
        <div className="row">
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
                    <Button onClick={() => addToShopcart(item)} color="primary">
                      Add to Shopping Cart
                    </Button>
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    setShoppingCart: shoppingCart =>
      dispatch({
        type: "SET_SHOPPINGCART",
        shoppingCart
      })
  };
}

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopWomen);
