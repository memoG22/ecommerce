import React from "react";
import Carousel from "../Shared/Carousel";
import axios from "axios";
import Styles from "./Nav.module.css";

function Home() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);

        console.log(items);
      }
    });
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col xs-4">
          <h1 className={Styles.textCenter}>Home</h1>
        </div>
      </div>
      <div className="row">
        <div className="col xs-4">
          <div style={{ maxHeight: "100%" }}>
            <Carousel items={items} />
          </div>
        </div>
        <div className="col xs-4">
          <img
            height="100%"
            width="100%"
            src="data:image/jpeg;base64,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"
          />
        </div>
      </div>

      {/* divider */}
      <div className="row">
        <div style={{ height: "50%" }} className="col xs-12">
          <img
            height="50%"
            width="100%"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdohWGkDIG5o4JgqZuytZMMIXn-NcVZIvPujOjQ7UKp8UUUpdHQ"
          />
        </div>
      </div>
      <div className="row">
        <div className="col xs-4">
          <img
            height="100%"
            width="100%"
            src="data:image/jpeg;base64,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"
          />
        </div>
        <div className="col xs-4">
          <img
            height="100%"
            width="100%"
            src="data:image/jpeg;base64,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"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
