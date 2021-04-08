const axios = require("axios").default;

const url = "http://localhost:3000";

// Handles all GET requests, requires a route and a params
function handleGetRequests(route, params) {
  let options;
  options = { method: "get", url: url + route, params: params };
  return axios(options);
}

function getStrangers(userId) {
  return handleGetRequests(`/strangers/${userId}`);
}

export { getStrangers };
