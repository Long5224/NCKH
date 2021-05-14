import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getStudentBoard = () => {
  return axios.get(API_URL + "student", { headers: authHeader() });
};

const getParentBoard = () => {
  return axios.get(API_URL + "parent", { headers: authHeader() });
};

const getTeacherBoard = () => {
  return axios.get(API_URL + "teacher", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};