import React from "react";
import axios from "axios";
import Styles from "./Css/Nav.module.css";

function Home() {
  const [items, setItems] = React.useState([]);
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let image1 = items[1].Image;
        let image2 = items[5].Image;
        let image3 = items[7].Image;

        setImage1(image1);
        setImage2(image2);
        setImage3(image3);

        setItems(items);
      }
    });
  }

  return (
    <div className={Styles.gridContainer}>
      <div
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + image1 + ")"
        }}
      />

      <div
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + image2 + ")"
        }}
      />
      <div
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + image3 + ")"
        }}
      />
    </div>
  );
}

export default Home;
