import React from "react";
import axios from "axios";
import Styles from "./Nav.module.css";

function ShopMen() {
  const [items, setItems] = React.useState([]);
  const [image, setImage] = React.useState([]);

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      console.log(response);
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let image = items[i].Image;
        setImage(image);
        setItems(items);

        console.log(items);
      }
    });
  }
  return (
    <div>
      <div className="row">
        <div className="col sm-12">
          <h1 style={{ textAlign: "center" }}>Shop Men</h1>
        </div>
      </div>
      <div className="row">
        {items.map(item => (
          <div key={item.Id} className="col sm-4">
            <div>
              <ul>
                <div>
                  <img
                    style={{ width: "50vw", height: "50vh" }}
                    src={item.Image}
                    alt="no image"
                  />
                </div>
                <br />

                <div>{item.Name}</div>
                <br />
                <div>Price: $ {item.Price}</div>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopMen;
