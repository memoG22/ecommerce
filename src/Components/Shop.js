import React from "react";
import axios from "axios";
import Styles from "./Css/Nav.module.css";
import { withRouter } from "react-router-dom";

function Shop(props) {
  const [items, setItems] = React.useState([]);
  const [imageMen, setImageMen] = React.useState("");
  const [imageMen1, setImageMen1] = React.useState("");

  const [imageWomen, setImageWomen] = React.useState("");
  const [imageWomen1, setImageWomen1] = React.useState("");

  const [imageChildren, setImageChildren] = React.useState("");
  const [imageChildren1, setImageChildren1] = React.useState("");

  React.useEffect(() => {
    getMale();
    getFemale();
    getChildren();
  }, []);

  function getMale() {
    axios.get("/api/item/male").then(response => {
      let items = response.data;
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        let imageMen = items[0].Image;
        let imageMen1 = items[0].Image;

        setImageMen(imageMen);
        setImageMen1(imageMen1);
      }
    });
  }

  function getFemale() {
    axios.get("/api/item/female").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let imageWomen = items[0].Image;
        let imageWomen1 = items[2].Image;

        setImageWomen(imageWomen);
        setImageWomen1(imageWomen1);
      }
    });
  }

  function getChildren() {
    axios.get("/api/item/children").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let imageChildren = items[0].Image;
        let imageChildren1 = items[1].Image;

        setImageChildren(imageChildren);
        setImageChildren1(imageChildren1);
      }
    });
  }

  function ShopMen() {
    props.history.push("/shop/men");
  }

  function ShopWomen() {
    props.history.push("/shop/women");
  }

  function ShopChildren() {
    props.history.push("/shop/children");
  }

  function testMethod(o) {
    let str = new RegExp("easy");
    let result = str.exec(o);
    console.log(result);
    return;
  }

  return (
    <div className={Styles.gridContainer}>
      <div
        onClick={() => ShopMen()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageMen + ")"
        }}
      >
        <h1>Men</h1>
      </div>

      <div
        onClick={() => ShopWomen()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageWomen + ")"
        }}
      >
        <h1>Women</h1>
      </div>
      <div
        onClick={() => ShopChildren()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageChildren + ")"
        }}
      >
        <h1>Children</h1>
      </div>
      <div
        onClick={() => ShopMen()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageMen1 + ")"
        }}
      >
        <h1>Men</h1>
      </div>

      <div
        onClick={() => ShopWomen()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageWomen1 + ")"
        }}
      >
        <h1>Women</h1>
      </div>
      <div
        onClick={() => ShopChildren()}
        className={Styles.grid}
        style={{
          backgroundImage: "url(" + imageChildren1 + ")"
        }}
      >
        <h1>Children</h1>
      </div>
    </div>
  );
}

export default withRouter(Shop);
