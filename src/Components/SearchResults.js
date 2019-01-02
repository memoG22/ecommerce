import React from "react";
import Styles from "./Nav.module.css";
import { connect } from "react-redux";
function SearchResults() {
  return (
    <React.Fragment>
      <div className="row">
        <div className=" col sm-4">
          <h1 className={Styles.textCenter}>Search Results</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SearchResults);
