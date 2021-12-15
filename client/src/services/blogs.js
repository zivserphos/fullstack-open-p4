import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf();
const base_url_path = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const { data } = axios.get(base_url_path);
    return data;
  } catch (err) {
    notyf.error(err.message);
  }
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(base_url_path, newObject, config);
  return response.data;
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
