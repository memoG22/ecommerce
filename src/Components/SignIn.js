import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, ModalHeader, Button, ModalBody, ModalFooter } from "reactstrap";
import Styles from "./Css/Nav.module.css";

function SignIn(props) {
  const [createEmail, setCreateEmail] = React.useState("new@email.com");
  const [createPassword, setCreatePassword] = React.useState("password123");
  const [email, setEmail] = React.useState("me@email.com");
  const [password, setPassword] = React.useState("password123");
  const [isOpen, toggleModal] = React.useState(false);
  const [create, setCreate] = React.useState(false);

  function register() {
    const payload = {
      email: createEmail,
      passwordHash: createPassword
    };

    axios
      .post("/api/create/user", payload)
      .then(response => {
        alert("create was successful");
      })
      .catch(response => {
        console.log(response);
        alert(response);
      });
  }

  function getCurrentUser() {
    axios.get("/api/currentuser").then(response => {
      console.log(response);
    });
  }

  function login() {
    const payload = {
      email,
      password
    };

    axios
      .post("/api/login", payload)
      .then(response => {
        let user = response.data;
        alert("login was successful");
        // getCurrentUser();
        loginSuccessful(user);
        props.setUser(user);
      })
      .catch(response => {
        alert("Invalid username or password");
      });
  }

  function loginSuccessful(user) {
    console.log(user);

    props.history.push("/adminview");
    sessionStorage.userId = user.Id;
    sessionStorage.userEmail = user.Email;
  }

  return (
    <div>
      <div>
        <div className="col sm-4">
          <div>
            <h1>Login</h1>
          </div>
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
          <button onClick={() => login()}>Login</button>
        </div>
        <div>
          <h3>Don't have an account? Sign Up here</h3>
          <Button onClick={() => toggleModal(!isOpen)} color="primary">
            Create Account
          </Button>
        </div>
        <div onClick={() => setCreate(!create)} />
      </div>

      <div>
        <Modal isOpen={isOpen}>
          <Button color="danger" onClick={() => toggleModal(!isOpen)}>
            X
          </Button>
          <ModalHeader>
            <h1>Create an account</h1>
          </ModalHeader>
          Email:
          <input
            type="text"
            value={createEmail}
            onChange={e => setCreateEmail(e.target.value)}
          />
          <br />
          Password:
          <input
            type="password"
            value={createPassword}
            onChange={e => setCreatePassword(e.target.value)}
          />
          <button onClick={() => register()}>Register</button>
        </Modal>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: user =>
      dispatch({
        type: "SET_USER",
        user
      })
  };
}
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignIn)
);
