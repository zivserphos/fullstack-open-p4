import { login } from "../services/userService";
import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cancel, setCancel] = useState("none");
  const [displayForm, setDisplayForm] = useState("none");

  const loginFormEl = useRef();
  const cancelButtonEl = useRef();

  const navigate = useNavigate();
  return (
    <form ref={loginFormEl}>
      <div style={{ display: displayForm }}>
        UserName
        <input
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        ></input>
      </div>
      <div style={{ display: displayForm }}>
        Password
        <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button
        type="submit"
        onClick={async (event) => {
          event.preventDefault();
          if (displayForm === "none") {
            setDisplayForm("block");
            setCancel("block");
            return;
          }
          if (await login(event, userName, password)) {
            navigate("/blogs");
            return setUser(userName);
          }
          navigate("/");
        }}
      >
        LOGIN
      </button>
      <div>
        <button
          type="button"
          style={{ display: cancel }}
          onClick={() => {
            setCancel("none");
            setDisplayForm("none");
          }}
          ref={cancelButtonEl}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
