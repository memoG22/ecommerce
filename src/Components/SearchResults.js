import React from "react";
import Styles from "./Css/Nav.module.css";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

function SearchResults(props) {
  const [isOpen, toggleModal] = React.useState(false);
  const [searchItems, setSearchItems] = React.useState([]);
  const [nullView, setNullView] = React.useState(false);
  const [viewItem, setViewItem] = React.useState([]);

  React.useEffect(() => {
    appendItems();
  });

  function appendItems() {
    let searchItems = props.searchItems;
    setSearchItems(searchItems);
    checkItems(searchItems);
  }

  function checkItems(searchItems) {
    if (searchItems < 1) {
      setNullView(false);
    } else {
      setNullView(true);
    }
  }

  function addToShopcart(item) {
    props.setShoppingCart([...props.shoppingCart, item]);
  }

  function imageClick(item) {
    setViewItem(item);
    toggleModal(!isOpen);
  }

  return (
    <React.Fragment>
      {!nullView && (
        <div className="row">
          <div className="col sm-4">
            <h3 style={{ color: "gray" }} className={Styles.textCenter}>
              Please refine your search or search for items
            </h3>
          </div>
        </div>
      )}

      {nullView && (
        <div className="row">
          {searchItems.map(item => (
            <div key={item.Id} className="col sm-4">
              <div>
                <ul>
                  <div style={{ width: "20vw", height: "20vh" }}>
                    <img
                      onClick={() => imageClick(item)}
                      width={"100%"}
                      height={"100%"}
                      style={{ width: "100%", height: "100%" }}
                      src={item.Image}
                      alt="no image"
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

                  <Button onClick={() => addToShopcart(item)} color="primary">
                    Add to Shopping Cart
                  </Button>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isOpen}>
        <Button color="danger" onClick={() => toggleModal(!isOpen)}>
          X
        </Button>
        <ModalBody>
          <div>
            <ul>
              <img
                width={"100%"}
                height={"100%"}
                style={{ width: "100%", height: "100%" }}
                src={viewItem.Image}
                alt="no image"
              />
              <br />
              <div>
                <b>{viewItem.Name}</b>
              </div>
              <br />
              <div> $ {viewItem.Price}</div>
              <br />
              <div>{viewItem.Description}</div>
              <Button onClick={() => addToShopcart(viewItem)} color="primary">
                Add to Shopping Cart
              </Button>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setShoppingCart: shoppingCart =>
      dispatch({
        type: "SET_SHOPPINGCART",
        shoppingCart
      })
  };
}

function mapStateToProps(state) {
  return { searchItems: state.searchItems, shoppingCart: state.shoppingCart };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
