import React, { useState } from "react";
import Beer from "./Beer";
import google from "../static/google.svg";
import twitter from "../static/twitter.svg";
import facebook from "../static/facebook-logo-2019.svg";

function Form() {
  const [login, setLogin] = useState(true);
  const [displayContainer, setDisplayContainer] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("user");
  const [password, setPassword] = useState(1234);
  const [loggedIn, setLoggedIn] = useState(false); // Added state for logged in status

  const handleSubmitForm = () => {
    if (login) {
      // Login Button has been clicked
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if((storedEmail === email && storedPassword === password) || (email === "user" && password == 1234)) {
        setLoggedIn(true);
        setDisplayContainer(false); // Hide the login/signup form
      } else {
        alert("Login failed");
      }
    } else {
      // Signup Button has been clicked
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      alert("Signup successful");
    }
  };

  return (
    <div className="container">
      {displayContainer && (
        <div>
          <div className="form-container">
            <div
              className={login ? "form-container-active" : ""}
              onClick={() => setLogin(true)}
            >
              <h1>Login</h1>
            </div>
            <div
              className={!login ? "form-container-active" : ""}
              onClick={() => setLogin(false)}
            >
              <h1>Signup</h1>
            </div>
          </div>

          <form>
            {!login && (
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleSubmitForm}>
              {login ? "LOGIN" : "SIGNUP"}
            </button>
          </form>

          {login && <h4>Forgot Password?</h4>}
          <h5>or {login ? "login" : "signup"} with</h5>

          <div className="icons">
            <div className="icon">
              <img src={google} alt="google" />
            </div>
            <div className="icon">
              <img src={facebook} alt="facebook" />
            </div>
            <div className="icon">
              <img src={twitter} alt="twitter" />
            </div>
          </div>
          <h5>
            Don't have an Account?{" "}
            <button id="createAccountBtn" onClick={() => setLogin(false)}>
              Create new account
            </button>
          </h5>
        </div>
      )}

      {loggedIn && (
        <div className="afterLogin">
          <Beer/>
        </div>
      )}
    </div>
  );
}

export default Form;