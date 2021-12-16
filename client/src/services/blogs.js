import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf();
const base_url_path = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(base_url_path, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token },
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
