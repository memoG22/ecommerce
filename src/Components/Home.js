import React from "react";
import Carousel from "../Shared/Carousel";
import axios from "axios";
import Styles from "./Nav.module.css";

function Home() {
  const [items, setItems] = React.useState([]);
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let image1 = items[1].Image;
        let image2 = items[5].Image;
        setImage1(image1);
        setImage2(image2);
        setItems(items);
      }
    });
  }
  console.log(items.Image);
  return (
    <div className="body">
      <div className="col xs-4">
        <h1 className={Styles.textCenter}>Home</h1>
      </div>
      <div className="row" style={{ display: "block" }}>
        <div
          className="col sm-4"
          style={{
            backgroundSize: "100%",
            width: "100%",
            backgroundRepeat: "no-repeat",
            height: "33vh",
            backgroundImage: "url(" + image1 + ")"
          }}
        />

        <div className={Styles.carousel} style={{ height: "50%" }}>
          <Carousel items={items} />
        </div>
        <div
          className="col sm-4"
          style={{
            width: "100%",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            height: "33vh",
            backgroundImage: "url(" + image2 + ")"
          }}
        />
      </div>
    </div>
  );
}

export default Home;
