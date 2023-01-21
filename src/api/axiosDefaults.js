import axios from "axios";

axios.defaults.baseURL = "https://backend-pp5.her8okuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();