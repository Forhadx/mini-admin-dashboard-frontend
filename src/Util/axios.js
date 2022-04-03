import axios from "axios";

const instance = axios.create({
  baseURL: "https://mini-dashboard-forhad.herokuapp.com",
});

export default instance;
