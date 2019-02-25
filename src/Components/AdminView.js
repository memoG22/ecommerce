import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Styles from "./Css/Nav.module.css";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
function AdminView(props) {
  const [isOpen, toggleModal] = React.useState(false);
  const [editisOpen, edittoggleModal] = React.useState(false);
  const [Name, setProductName] = React.useState("");
  const [Price, setProductPrice] = React.useState("");
  const [Image, setProductImage] = React.useState("");
  const [Gender, setProductGender] = React.useState("");
  const [AgeGroup, setProductAgeGroup] = React.useState("");
  const [Size, setProductSize] = React.useState("");
  const [ItemType, setProductItemType] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [editItem, setEditItem] = React.useState([]);
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState("");
  const [currentUserItems, setCurrentUserItems] = React.useState([]);

  function postImages() {
    const payload = {
      Name,
      AgeGroup,
      Gender,
      Image,
      Price,
      Size,
      ItemType,
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
    getCurrentUser();
  }, []);

  function getCurrentUserList(currentUserId) {
    axios.get("/api/getorder/" + currentUserId).then(response => {
      let currentUserItems = response.data;
      setCurrentUserItems(currentUserItems);
    });
  }
  // function getCurrentUser() {
  //   axios.get("/api/currentuser").then(response => {
  //     console.log(response);
  //   });
  // }

  function getCurrentUser() {
    let currentUserEmail = sessionStorage.userEmail;
    let currentUserId = sessionStorage.userId;
    setCurrentUserEmail(currentUserEmail);
    setCurrentUserId(currentUserEmail);
    getCurrentUserList(currentUserId);
    console.log(currentUserId);
  }

  function deleteItem(item) {
    let payload = {
      orderid: item.OrderId
      // itemId: item.ItemId
    };
    debugger;
    if (
      window.confirm(
        "You will not be able to get this item back, are you sure you want to delete this item from your mechandise?"
      )
    ) {
      axios.post("/api/deleteorderitem", payload).then(response => {
        console.log(response);
      });
    } else return "You chose to keep this item";
  }

  function editClick(item) {
    let editItem = item;
    setProductName(item.Name);
    setProductImage(item.Image);
    setProductSize(item.Size);
    setProductItemType(item.ItemType);
    setProductGender(item.Gender);
    setProductAgeGroup(item.AgeGroup);
    setProductPrice(item.Price);
    setDescription(item.Description);
    setEditItem(editItem);
    edittoggleModal(!editisOpen);
  }

  function putItem(item) {
    let Id = item.Id;
    const payload = {
      Id: Id,
      Name: Name,
      Image: Image,
      Size: Size,
      ItemType: ItemType,
      Gender: Gender,
      Age: AgeGroup,
      Price: Price,
      Description: Description
    };
    console.log(payload);
    if (window.confirm("Do you want to edit this item?")) {
      axios
        .put("/api/item/" + Id, {
          Id: Id,
          Name: Name,
          Image: Image,
          Size: Size,
          ItemType: ItemType,
          Gender: Gender,
          Age: AgeGroup,
          Price: Price,
          Description: Description
        })
        .then(response => {
          alert("Edit was successful");
          window.location.reload();
        })
        .catch(response => {
          alert(response);
        });
    }
  }

  function logout() {
    sessionStorage.clear();
    alert("You are now logged out");
    props.history.push("/signin");
    console.log("logout" + sessionStorage);
  }

  return (
    <div>
      <div>
        <h1>Welcome {currentUserEmail}</h1>
      </div>
      <div className="row">
        <div>
          <div className={Styles.textLeft}>
            <Button
              style={{
                height: "10vh",
                width: "20vw",
                marginBottom: "15%"
              }}
              color="primary"
              type="button"
              onClick={() => toggleModal(!isOpen)}
            >
              Upload
            </Button>

            <Button
              style={{
                height: "10vh",
                width: "20vw",
                marginBottom: "15%"
              }}
              color="primary"
              type="button"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
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
      <div>
        <Modal isOpen={isOpen}>
          <Button color="danger" onClick={() => toggleModal(!isOpen)}>
            X
          </Button>
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
            placeholder="Description"
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
          <ModalFooter>
            <button onClick={() => postImages()}>Submit</button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="row">
        <div className="col sm-4">
          <div className={Styles.textRight}>
            <h3 style={{ fontSize: "4vw" }}>
              Join the millions of success stories and become an entreprenuer
              with us!
            </h3>
          </div>
        </div>
      </div>
      <div className="row" style={{ display: "inline-flex" }}>
        {currentUserItems.map(item => (
          <div key={item.Id} className="col sm-4">
            <div>
              <ul>
                <div style={{ width: "20vw", height: "20vh" }}>
                  <img
                    width={"100%"}
                    height={"100%"}
                    style={{ width: "100%", height: "100%" }}
                    src={item.Image}
                    alt="none"
                  />
                </div>
                <br />
                <div>
                  <b>{item.Name}</b>
                </div>
                <br />
                <div>
                  <b>Price:</b> ${item.Price}
                </div>
                <br />
                <div />

                <div>
                  <Button onClick={() => deleteItem(item)} color="danger">
                    Delete Item
                  </Button>
                </div>
                <br />
                <div>
                  <Button onClick={() => editClick(item)} color="primary">
                    Edit Item
                  </Button>
                </div>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Modal isOpen={editisOpen}>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => edittoggleModal(!editisOpen)}
          >
            X
          </Button>
          <ModalHeader isOpen={editisOpen}>
            <img src={editItem.Image} />
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
              placeholder="Description"
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
            <button onClick={() => putItem(editItem)}>Submit edit</button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(AdminView);
