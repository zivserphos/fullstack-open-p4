import { login } from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <form>
      <div>
        UserName
        <input
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        ></input>
      </div>
      <div>
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
          if (await login(event, userName, password)) {
            navigate("/blogs");
            return setUser(userName);
          }
          navigate("/");
        }}
      >
        LOGIN
      </button>
    </form>
  );
}
