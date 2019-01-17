import React from "react";
import axios from "axios";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Styles from "./Nav.module.css";

function SignIn(props) {
  const [email, setEmail] = React.useState("me@email.com");
  const [password, setPassword] = React.useState("password123");
  const [create, setCreate] = React.useState(false);

  function register() {
    const payload = {
      email,
      passwordHash: password
    };
    console.log(payload);

    axios
      .post("/api/create/user", payload)
      .then(response => {
        alert("create was successful");
        loginSuccessful();
      })
      .catch(response => {
        console.log(response);
        alert("Please fill in all fields");
      });
  }

  function login() {
    const payload = {
      email,
      passwordHash: password
    };
    console.log(payload);

    axios
      .post("/api/login", payload)
      .then(response => {
        console.log(response);
        alert("login was successful");
        loginSuccessful();
      })
      .catch(response => {
        alert(response);
      });
  }

  function loginSuccessful() {
    props.history.push("/adminview");
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
      <div onClick={() => setCreate(!create)}>
        <button onC>Create Account</button>
      </div>
      <div className="row">
        <div className="col sm-4">
          <div>
            <h1>Create an account</h1>
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
          <button onClick={() => register()}>Register</button>
        </div>
      </div>
      <div className={Styles.textRight}>
        <div className="row">
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
        </div>
      </div>
    </div>
  );
}

export default SignIn;
