import axios from "axios";

const API_PATH = "http://localhost:5000/api/auth/";


const login = (username, password) => {
  return axios
    .post(API_PATH + "login", {
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

const update = (data, url) => {
  return axios.put(`${API_PATH}${url}`, data);
}

const create = (data, url) => {
  return axios.post(`${API_PATH}${url}`, data)
}

function getByUserName(id) {
  return new Promise((resolve, reject) =>{
      axios.get(`${API_PATH}${id}`)
      .then(res =>{
          resolve(res);
      })
  })
}

const get = (username) => {
  return axios.get(`${API_PATH}${username}`);
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUserRole = () => {
  return JSON.parse(localStorage.getItem("user").role);
};

const getCurrentUserUserName = () => {
  return JSON.parse(localStorage.getItem("user").username);
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
    login,
    getCurrentUser,
    getCurrentUserUserName,
    getCurrentUserRole,
    update,
    getByUserName,
    logout,
    create,
    get
  };