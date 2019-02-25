import React from "react";
import axios from "axios";
import Styles from "./Css/Nav.module.css";
import { connect } from "react-redux";
import { Button } from "reactstrap";

function ShopMen(props) {
  const [items, setItems] = React.useState([]);
  const [currentUserId, setCurrentuUserId] = React.useState("");

  React.useEffect(() => {
    getItems();
    getCurrentUser();
  }, []);

  function getItems() {
    axios.get("/api/item/male").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);
      }
    });
  }

  function addToShopcart(item) {
    let payload = {
      userId: currentUserId,
      itemId: item.Id
    };
    axios.post("/api/order/insert", payload).then(response => {
      console.log(response);
      alert("Item added to shopping cart");
    });
    // axios.props.setShoppingCart([...props.shoppingCart, item]);
  }

  function getCurrentUser() {
    let currentUserId = sessionStorage.userId;
    setCurrentuUserId(currentUserId);
    console.log(currentUserId);
  }

  return (
    <div>
      <div className="row">
        <div className="col sm-12">
          <h1 className={Styles.textCenter}>Shop Men</h1>
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
                    alt="none"
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
)(ShopMen);
