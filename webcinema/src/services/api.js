import axios from "axios";

export const key = "896a22abfccbdb3faa226caed5f9ef23";
export const API = axios.create({
  // baseURL: `https://api.themoviedb.org/3/`,
  // baseURL: `http://localhost:5000`,
  baseURL: 'http://125.212.203.148/api/'
});
