import React from "react";
import Styles from "./Nav.module.css";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ShoppingBasket(props) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    appendItems();
  });

  function appendItems() {
    let items = props.shoppingCart;
    setItems(items);
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col sm-4">
          <h1 className={Styles.textCenter}>Your Items</h1>
        </div>
      </div>
      <div clasname="row">
        {items.map(item => (
          <div className="col sm-4">
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
              </ul>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return { shoppingCart: state.shoppingCart };
}

export default connect(mapStateToProps)(ShoppingBasket);
