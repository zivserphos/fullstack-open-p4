import axios from "axios";
const base_url_path = "http://localhost:3003/api/login";

export const login = async (event, userName, password) => {
  try {
    event.preventDefault();
    console.log("logging in with", userName, password);
    const response = await axios.post(
      `${base_url_path}`,
      { userName, password },
      basicHeaders
    );
    window.localStorage.setItem("User", JSON.stringify(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const isLoggedIn = () => {
  const loggedUserJSON = window.localStorage.getItem("User");
  console.log(loggedUserJSON);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user;
  }
};

const basicHeaders = { "Content-Type": "application/json" };
