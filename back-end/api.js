// api.js
const axios = require('axios');

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  console.log("Token: ", token);
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

module.exports = { axiosWithAuth };
