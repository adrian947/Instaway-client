import jwt_decode from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};
export const getToken = (token) => {
  return localStorage.getItem("token");
};

export const decodeToken = (token) => {
  return jwt_decode(token);
};
