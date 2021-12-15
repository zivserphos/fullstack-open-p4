import { login } from "../services/userService";
import { useState } from "react";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
        onClick={(event) => login(event, userName, password)}
      >
        LOGIN
      </button>
    </form>
  );
}
