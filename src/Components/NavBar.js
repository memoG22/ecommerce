import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Styles from "./Nav.module.css";
import Careers from "./Careers";
import Contact from "./Contact";
import Shop from "./Shop";
import SignIn from "./SignIn";
import ShopMen from "./ShopMen";
import ShopWomen from "./ShopWomen";
import ShopChildren from "./ShopChildren";
import Home from "./Home";
import ShoppingBasket from "./ShoppingBasket";
import SearchResults from "./SearchResults";

function NavBar(props) {
  const [dropdownOpen, toggle] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const [dropDown, setDropDown] = React.useState(false);
  const [search, setSearchResults] = React.useState([]);

  function handleSearch() {
    console.log(searchString + " " + "search");

    axios.get("/api/item/search?=" + searchString).then(response => {
      console.log(response);
      let search = response.data;
      setSearchResults(search);
      props.setsearch(search);

      props.history.push("/searchresults");
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        <Nav className={Styles.navBar}>
          <div className="col sm-2">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => toggle(!dropdownOpen)}
            >
              <DropdownToggle
                style={{
                  color: "white",
                  backgroundColor: "black"
                }}
              >
                <div className="fa fa-bars fa-2x" />
              </DropdownToggle>
              <DropdownMenu
                style={{
                  backgroundColor: "black"
                }}
              >
                <DropdownItem>
                  <NavItem>
                    <NavLink to="/shop">
                      <h4 className={Styles.whiteText}>Shop</h4>
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink to="/signin">
                      <h4 className={Styles.whiteText}>Sign In</h4>
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink to="/careers">
                      <h4 className={Styles.whiteText}>Careers</h4>
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink to="/contact">
                      <h4 className={Styles.whiteText}>Contact</h4>
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="col sm-4">
            <NavItem>
              <NavLink to="/home">
                <div
                  onMouseEnter={() => setDropDown(!dropdownOpen)}
                  style={{
                    textAlign: "center",
                    height: "100%",
                    size: "100%",
                    color: "white"
                  }}
                  className="fa fa-home fa-4x"
                />
              </NavLink>
            </NavItem>
          </div>
          <div className="col sm-3">
            <NavItem>
              <NavLink to="/shop">
                <h1 className={Styles.whiteTextandCenter}>Shop</h1>
              </NavLink>
            </NavItem>
          </div>
          <div className="col sm-3">
            <NavItem>
              <NavLink to="/signin">
                <h1 className={Styles.whiteTextandCenter}>Sign In</h1>
              </NavLink>
            </NavItem>
          </div>
          <div className="col sm-3">
            <NavItem>
              <NavLink to="/careers">
                <h1 className={Styles.whiteTextandCenter}>Careers</h1>
              </NavLink>
            </NavItem>
          </div>
          <div className="col sm-3">
            <NavItem>
              <NavLink to="/contact">
                <h1 className={Styles.whiteTextandCenter}>Contact</h1>
              </NavLink>
            </NavItem>
          </div>
          <div className="col sm-4">
            <NavItem className={Styles.textRight}>
              <div
                style={{
                  color: "black",
                  backgroundColor: "white"
                }}
                className="fa fa-search"
              >
                <input
                  onChange={e => setSearchString(e.target.value)}
                  value={searchString}
                  placeholder="Search"
                  type="text"
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </NavItem>
          </div>
          <div className="col sm-4">
            <NavItem className={Styles.textRight}>
              <NavLink to="/shoppingbasket">
                <div
                  style={{ color: "white" }}
                  className="fa fa-shopping-basket fa-2x"
                />
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </div>
      <div>
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shoppingbasket" component={ShoppingBasket} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/careers" component={Careers} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/shop/men" component={ShopMen} />
        <Route exact path="/shop/women" component={ShopWomen} />
        <Route exact path="/shop/children" component={ShopChildren} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/searchresults" component={SearchResults} />
      </div>
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setsearch: user =>
      dispatch({
        type: "SET_USER",
        user
      })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
