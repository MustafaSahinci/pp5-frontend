import axios from "axios";

axios.defaults.baseURL = "https://backend-pp5.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;