import axios from "axios";

const BASE_URL = "http://168.126.147.134:18080";

export const login = (loginId, password) =>
  axios.post(`${BASE_URL}/auth/login`, { loginId, password });

export const getDriverInfo = (token) =>
  axios.get(`${BASE_URL}/route/driver`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const getDispatch = (token, date) =>
  axios.get(`${BASE_URL}/dispatch/driver/${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  