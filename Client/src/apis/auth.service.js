import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";


const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));       
      }
      return response;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUserToken = () => { 
  return JSON.parse(localStorage.getItem("user").token);
};

const getCurrentUserRole = () => {
  return JSON.parse(localStorage.getItem("user").role);
};

const getCurrentUserUserName = () => {
  return JSON.parse(localStorage.getItem("user").username);
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("connectionId");
};

export default {
    login,
    getCurrentUser,
    getCurrentUserToken,
    getCurrentUserUserName,
    getCurrentUserRole,
    logout
  };