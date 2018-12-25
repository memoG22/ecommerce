import React from "react";
import { Route, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import Styles from "./Nav.module.css";
import Careers from "./Careers";
import Contact from "./Contact";
import Shop from "./Shop";
import SignIn from "./SignIn";
import ShopMen from "./ShopMen";
import ShopWomen from "./ShopWomen";
import ShopChildren from "./ShopChildren";

class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          {/* <div className="col md-12"> */}
          <Nav className={Styles.navBar}>
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
          </Nav>
        </div>
        {/* </div> */}
        <div>
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/careers" component={Careers} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/shop/men" component={ShopMen} />
          <Route exact path="/shop/women" component={ShopWomen} />
          <Route exact path="/shop/children" component={ShopChildren} />
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
