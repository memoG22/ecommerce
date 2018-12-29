import React from "react";
import axios from "axios";
import Carousel from "../Shared/Carousel";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
  const [items, setItems] = React.useState([]);
  const [color, colorToggle] = React.useState(true);
  function postImages() {
    const payload = {
      Name,
      AgeGroup,
      Gender,
      Image,
      Price,
      Size
    };
    axios.post("api/post/item/", payload).then(response => {
      console.log(response);
      alert("Post was successful");
      toggleModal(!isOpen);
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

        console.log(items);
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
        <div
          className="col sm-4"
          style={{
            height: "50vh",
            width: "75vw"
          }}
        >
          <div
            onMouseEnter={() => colorToggle(!color)}
            onMouseLeave={() => colorToggle(!color)}
            style={{
              width: "100%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50%",
              backgroundImage:
                // "url(" +
                // "data:image/jpeg;base64,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" +
                // ")"
                ""
            }}
          >
            <h1 style={{ cursor: "pointer", fontSize: "3vw" }}>
              Press the{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => toggleModal(!isOpen)}
              >
                Upload
              </span>{" "}
              button to make money with us
            </h1>
          </div>
        </div>
      </div>
      <div>
        <Modal isOpen={isOpen}>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => toggleModal(!isOpen)}
          >
            X
          </Button>
          <ModalHeader>
            <h1>Upload Your Product</h1>
          </ModalHeader>
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
            {/* <br />
            Image:
            <br />
            <input
              type="file"
              placeholder="Select Image"
              value={Image}
              onChange={e => setProductImage(e.target.value)}
            />
            <br />
            
            <span style={{ color: "red" }}>
              <b>OR</b>
            </span> */}
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
            <select value={Size} onChange={e => setProductSize(e.target.value)}>
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
              Join the millions of success stories and become entreprenuer with
              us!
            </h3>
          </div>
        </div>
      </div>

      <div className="col sm-4" style={{ width: "50%" }}>
        <div
          styles={{
            width: "50%"
          }}
        >
          <Carousel items={items} />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
