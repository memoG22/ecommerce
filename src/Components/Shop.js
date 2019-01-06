import React from "react";
import axios from "axios";
import Styles from "./Nav.module.css";
import Carousel from "../Shared/Carousel";
import { Route, NavLink, withRouter } from "react-router-dom";

function Shop(props) {
  const [color, colorToggle] = React.useState(false);
  const [color1, colorToggle1] = React.useState(false);
  const [color2, colorToggle2] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [imageMen, setImageMen] = React.useState("");
  const [imageWomen, setImageWomen] = React.useState("");
  const [imageChildren, setImageChildren] = React.useState("");

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        let imageMen = items[1].Image;
        let imageWomen = items[5].Image;
        let imageChildren = items[0].Image;
        setImageMen(imageMen);
        setImageWomen(imageWomen);
        setImageChildren(imageChildren);
        setItems(items);
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
  return (
    <div>
      <div className="row" style={{ marginRight: "0px", marginLeft: "0px" }}>
        <div
          onClick={() => ShopMen()}
          onMouseEnter={() => colorToggle(!color)}
          onMouseLeave={() => colorToggle(!color)}
          className="col xs-4"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "33vw",
            width: "100%",
            backgroundImage: "url(" + imageMen + ")"
          }}
        >
          <div>
            <h1 className={Styles.whiteText}>Men</h1>
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
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "33vw",
            backgroundImage: "url(" + imageWomen + ")"
          }}
          className="col xs-4"
        >
          <div>
            <h1 className={Styles.whiteText}>Women</h1>
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
            backgroundRepeat: "no-repeat",
            backgroundSize: "158%",
            height: "33vw",
            backgroundImage: "url(" + imageChildren + ")"
          }}
          className="col xs-4"
        >
          <div>
            <h1 className={Styles.whiteText}>Children</h1>
          </div>
          {color2 && (
            <div
              onClick={() => ShopChildren()}
              className={Styles.colorToggle}
            />
          )}
        </div>
      </div>
      ))}
    </div>
  );
}

export default withRouter(Shop);
