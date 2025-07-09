const axios = require('axios');
const BASE_URL = process.env.REMOTE_API_URL;

async function get(path, token) {
  const res = await axios.get(`${BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}

async function post(path, data, token) {
  const res = await axios.post(`${BASE_URL}${path}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}

async function put(path, data, token) {
  const res = await axios.put(`${BASE_URL}${path}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}

async function del(path, token) {
  const res = await axios.delete(`${BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}

module.exports = { get, post, put, del };
