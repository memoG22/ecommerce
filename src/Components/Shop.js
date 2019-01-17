import React from "react";
import axios from "axios";
import Styles from "./Nav.module.css";
import { withRouter } from "react-router-dom";

function Shop(props) {
  const [color, colorToggle] = React.useState(false);
  const [color1, colorToggle1] = React.useState(false);
  const [color2, colorToggle2] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [imageMen, setImageMen] = React.useState("");
  const [imageWomen, setImageWomen] = React.useState("");
  const [imageChildren, setImageChildren] = React.useState("");
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    getMale();
    getFemale();
    getChildren();
  }, []);

  function getId() {
    let Id = 1026;
    axios.get("/api/currentuser/" + Id).then(response => {
      let items = response;
      setItems(items);
      console.log("Id" + items);
    });
  }

  function getMale() {
    axios.get("/api/item/male").then(response => {
      let items = response.data;
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        let imageMen = items[0].Image;
        setImageMen(imageMen);
      }
    });
  }

  function getFemale() {
    axios.get("/api/item/female").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let imageWomen = items[0].Image;
        setImageWomen(imageWomen);
      }
    });
  }

  function getChildren() {
    axios.get("/api/item/children").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let imageChildren = items[0].Image;
        setImageChildren(imageChildren);
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
    <div>
      <div className="body" style={{ marginRight: "0px", marginLeft: "0px" }}>
        <div>
          <button onClick={getId}>get Id Test</button>
        </div>
        <div
          onClick={() => ShopMen()}
          onMouseEnter={() => colorToggle(!color)}
          onMouseLeave={() => colorToggle(!color)}
          className="col sm-4"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "50vw",
            width: "100%",
            backgroundImage: "url(" + imageMen + ")"
          }}
        >
          <div>
            <h1>Men</h1>
          </div>
          {color && (
            <div onClick={() => ShopMen()} className={Styles.colorToggle} />
          )}
        </div>

        <div
          onClick={() => ShopWomen()}
          onMouseEnter={() => colorToggle1(!color1)}
          onMouseLeave={() => colorToggle1(!color1)}
          style={{
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "50vw",
            backgroundImage: "url(" + imageWomen + ")"
          }}
          className="col sm-4"
        >
          <div>
            <h1>Women</h1>
          </div>
          {color1 && (
            <div onClick={() => ShopWomen()} className={Styles.colorToggle} />
          )}
        </div>
        <div
          onClick={() => ShopChildren()}
          onMouseEnter={() => colorToggle2(!color2)}
          onMouseLeave={() => colorToggle2(!color2)}
          style={{
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "50vw",
            backgroundImage: "url(" + imageChildren + ")"
          }}
          className="col sm-4"
        >
          <div>
            <h1>Children</h1>
          </div>
          {color2 && (
            <div
              onClick={() => ShopChildren()}
              className={Styles.colorToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Shop);
