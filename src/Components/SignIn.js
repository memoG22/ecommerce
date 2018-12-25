import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Styles from "./Nav.module.css";

function SignIn() {
  const [isOpen, toggleModal] = React.useState(false);
  const [Name, setProductName] = React.useState("");
  const [Price, setProductPrice] = React.useState("");
  const [Image, setProductImage] = React.useState("");
  const [Gender, setProductGender] = React.useState("");
  const [AgeGroup, setProductAgeGroup] = React.useState("");

  function postImages() {
    const payload = {
      Name,
      AgeGroup,
      Gender,
      Image,
      Price
    };
    axios.post("api/post/item/", payload).then(response => {
      console.log(response);
      alert("Post was successful");
      toggleModal(!isOpen);
    });
  }

  return (
    <div className={Styles.pageBackground}>
      <div className={Styles.whiteTextandCenter}>
        <h1>Upload Your products</h1>
      </div>
      <button type="button" onClick={() => toggleModal(!isOpen)}>
        upload
      </button>
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
          <br />
          Image:
          <br />
          <input
            type="file"
            placeholder="Image"
            value={Image}
            onChange={e => setProductImage(e.target.value)}
          />
          <br />
          Gender:
          <br />
          <select
            value={Gender}
            onChange={e => setProductGender(e.target.value)}
          >
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
            <option value="1">Adult</option>
            <option value="2">Teen</option>
            <option value="3">Child</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => postImages()}>Submit</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignIn;
