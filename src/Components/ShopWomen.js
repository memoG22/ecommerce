import React from "react";
import Styles from "./Nav.module.css";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ShopWomen() {
  const [items, setItems] = React.useState([]);

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

  return (
    <React.Fragment>
      <div className={Styles.pageBackground}>
        <div className="row">
          <div className="col sm-4">
            <h1 className={Styles.whiteTextandCenter}>Shop Women</h1>
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
                  <div className={Styles.whiteText}>
                    <b>{item.Name}</b>
                  </div>
                  <br />
                  <div className={Styles.whiteText}>
                    <b>Price:</b> ${item.Price}
                  </div>
                  <br />
                  <div>
                    <Button
                      // onClick={() => deleteClick(item.Id)}
                      color="primary"
                    >
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
export default ShopWomen;
