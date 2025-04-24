const API_BASE_URL = "http://localhost:5000/api/auth";
import axios from "axios";

export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }
  
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

const API = axios.create({ baseURL: "http://localhost:5000/api" }); 

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const createConfession = (text) => API.post("/confessions/create", { text });
export const getAllConfessions = () => API.get("/confessions/all");
export const getUserConfessions = () => API.get("/confessions/my");
export const deleteConfession = (id) => API.delete(`/confessions/${id}`);
export const likeConfession = (id) => API.put(`/confessions/like/${id}`);
export const superLikeConfession = (id) => API.put(`/confessions/superlike/${id}`);