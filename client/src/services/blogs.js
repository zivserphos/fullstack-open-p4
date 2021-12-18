import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf();
const base_url_path = "http://localhost:3003/api/blogs";

let token;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  if (!localStorage.getItem("User")) return;
  token = JSON.parse(localStorage.getItem("User")).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const request = axios.get(base_url_path, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  if (!newObject.author || !newObject.title || !newObject.url) {
    notyf.error("Bad Request");
    return false;
  }
  token = JSON.parse(localStorage.getItem("User")).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  try {
    newObject.userId = JSON.parse(window.localStorage.getItem("User")).id;
    const response = await axios.post(base_url_path, newObject, config);
    notyf.success("added a new blog");
    return response.data;
  } catch (err) {
    notyf.error(err.response.data.error);
  }
};

const update = async (id, newObject) => {
  try {
    const { data } = await axios.put(`${base_url_path} /${id}`, newObject);
    return data;
  } catch (err) {
    notyf.error(err.message);
  }
};

export default { getAll, create, update, setToken };
