import React from "react";
import axios from "axios";
import Styles from "./Nav.module.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ShopMen() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/item/male").then(response => {
      console.log(response);
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);
      }
    });
  }

  function deleteClick(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  }

  function deleteItem(id) {
    axios.delete("/api/item/" + id).then(response => {
      console.log(response);
      alert("Delete was successful");
      window.location.reload();
    });
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
  );
}

export default ShopMen;
