import React from "react";
import axios from "axios";
import Carousel from "../Shared/Carousel";
import Modal from "../Shared/Modal";

import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Styles from "./Nav.module.css";

function SignIn() {
  const [isOpen, toggleModal] = React.useState(false);
  const [Name, setProductName] = React.useState("");
  const [Price, setProductPrice] = React.useState("");
  const [Image, setProductImage] = React.useState("");
  const [Gender, setProductGender] = React.useState("");
  const [AgeGroup, setProductAgeGroup] = React.useState("");
  const [Size, setProductSize] = React.useState("");
  const [ItemType, setProductItemType] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginTrue, setLoginSuccessful] = React.useState(false);

  function login() {
    const payload = {
      email,
      password
    };
    axios
      .post("api/create/user", payload)
      .then(response => {
        alert("create was successful");
        loginSuccessful();
      })
      .catch(response => {
        alert("Please fill in all fields");
      });
  }

  function loginSuccessful() {
    setLoginSuccessful(!loginTrue);
  }

  function postImages() {
    const payload = {
      Name,
      AgeGroup,
      Gender,
      Image,
      Price,
      Size,
      Description
    };
    axios
      .post("api/item//post", payload)
      .then(response => {
        alert("Post was successful");
        toggleModal(!isOpen);
      })
      .catch(response => {
        alert("Please fill in all fields");
      });
  }

  React.useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get("/api/items").then(response => {
      let items = response.data;
      for (let i = 0; i < items.length; i++) {
        setItems(items);
      }
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col sm-4">
          <div className={Styles.textCenter}>
            <h1>Upload Your products</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col sm-4">
          Email:
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={() => login()}>Submit</button>
        </div>
      </div>
      {loginTrue && (
        <div>
          <div className="row">
            <div className={Styles.textLeft}>
              <Button
                style={{ height: "10vh", width: "20vw", marginBottom: "15%" }}
                color="primary"
                type="button"
                onClick={() => toggleModal(!isOpen)}
              >
                Upload
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col sm-4">
              <div>
                <h1 style={{ cursor: "pointer", fontSize: "3vw" }}>
                  Press the{" "}
                  <span
                    style={{ color: "blue" }}
                    onClick={() => toggleModal(!isOpen)}
                  >
                    Upload
                  </span>{" "}
                  button to start making money
                </h1>
              </div>
            </div>
          </div>
          <div />
          <div>
            <Modal isOpen={isOpen}>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => toggleModal(!isOpen)}
              >
                X
              </Button>

              <ModalBody>
                Name of product:
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={Name}
                  onChange={e => setProductName(e.target.value)}
                />
                <br />
                Product Price:
                <br />
                <input
                  type="number"
                  placeholder="Price"
                  value={Price}
                  onChange={e => setProductPrice(e.target.value)}
                />
                <br />
                Paste Image URL:
                <br />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={Image}
                  break
                  onChange={e => setProductImage(e.target.value)}
                />
                <br />
                Description:
                <br />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={Description}
                  break
                  onChange={e => setDescription(e.target.value)}
                />
                <br />
                Gender:
                <br />
                <select
                  value={Gender}
                  onChange={e => setProductGender(e.target.value)}
                >
                  <option>Please Select</option>

                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <br />
                </select>
                <br />
                Age group:
                <br />
                <select
                  value={AgeGroup}
                  onChange={e => setProductAgeGroup(e.target.value)}
                >
                  <option>Please Select</option>

                  <option value="1">Adult</option>
                  <option value="2">Teen</option>
                  <option value="3">Child</option>
                </select>
                <br />
                Size:
                <br />
                <select
                  value={Size}
                  onChange={e => setProductSize(e.target.value)}
                >
                  <option>Please Select</option>

                  <option value="1">Extra Small</option>
                  <option value="2">Small</option>
                  <option value="3">Medium</option>
                  <option value="4">Large</option>
                  <option value="5">Extra Large</option>
                  <option value="6">XXl</option>
                </select>
                <br />
                Item Type:
                <br />
                <select
                  value={ItemType}
                  onChange={e => setProductItemType(e.target.value)}
                >
                  <option>Please Select</option>

                  <option value="1">Top</option>
                  <option value="2">Pants</option>
                  <option value="3">Shoes</option>
                  <option value="4">Accessories</option>
                </select>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => postImages()}>Submit</button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="row">
            <div className="col sm-4">
              <div className={Styles.textRight}>
                <h3>
                  Join the millions of success stories and become entreprenuer
                  with us!
                </h3>
              </div>
            </div>
          </div>

          <div className="col sm-4">
            <div>{/* <Carousel items={items} /> */}</div>
          </div>
        </div>
      )}
      //{" "}
    </div>
  );
}

export default SignIn;
