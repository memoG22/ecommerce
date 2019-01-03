import React from "react";
import Styles from "./Nav.module.css";
import { connect } from "react-redux";
import { Button } from "reactstrap";

function SearchResults(props) {
  const [searchItems, setSearchItems] = React.useState([]);
  const [nullView, setNullView] = React.useState(false);

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
              <ul>
                <div style={{ width: "20vw", height: "20vh" }}>
                  <img
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
                <div>
                  <Button onClick={() => addToShopcart(item)} color="primary">
                    Add to Shopping Cart
                  </Button>
                </div>
              </ul>
            </div>
          ))}
        </div>
      )}
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
