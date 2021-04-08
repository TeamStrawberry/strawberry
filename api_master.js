const axios = require("axios").default;

const url = "http://localhost:3000";

// Handles all GET requests, takes a route and a params
function handleGetRequests(route, params) {
  let options;
  options = { method: "get", url: url + route, params: params };
  return axios(options);
}

// Handles all POST requests, takes a route, params, and data object
function handlePostRequests(route, params = {}, data = {}) {
  let options = {
    method: "post",
    url: url + route,
    headers: {
      "Content-Type": "application/json",
    },
    params: params,
    data: data,
  };
  return axios(options);
}

function getStrangers(userId) {
  return handleGetRequests(`/strangers/${userId}`);
}

function createFriendship(userId, friendUserId) {
  return handlePostRequests(`/friends/${userId}/${friendUserId}`);
}

export { getStrangers, createFriendship };
