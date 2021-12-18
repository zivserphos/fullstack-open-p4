import axios from "axios";
import { useNavigate } from "react-router-dom";
import blogService from "./blogs";
import { Notyf } from "notyf";
const base_url_path = "http://localhost:3003/api/login";

const notyf = new Notyf();

export const login = async (event, userName, password) => {
  try {
    event.preventDefault();
    const { data } = await axios.post(
      `${base_url_path}`,
      { userName, password },
      basicHeaders
    );
    blogService.setToken(data.token);
    window.localStorage.setItem("User", JSON.stringify(data));
    return true;
  } catch (err) {
    notyf.error(err.response.data.error);
  }
};

export const isLoggedIn = () => {
  const loggedUserJSON = window.localStorage.getItem("User");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user;
  }
};

export const logOut = async () => {
  window.localStorage.removeItem("User");
};

const basicHeaders = { "Content-Type": "application/json" };
