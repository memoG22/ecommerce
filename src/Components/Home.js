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

  return (
    <div>
      <div
        style={{
          backgroundRepeat: "no-repeat",

          width: "100vw",
          height: "100vw",
          backgroundImage: "url(" + image1 + ")"
        }}
      />
    </div>
  );
}

export default Home;
