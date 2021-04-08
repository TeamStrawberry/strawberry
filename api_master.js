const axios = require("axios").default;

const url = "http://localhost:3000";

// Handles all GET requests, takes a route and a params
function handleGetRequests(route, params) {
  let options;
  options = { method: "get", url: url + route, params: params };
  return axios(options);
}

function getStrangers(userId) {
  return handleGetRequests(`/strangers/${userId}`);
}

function getUserQuizHistory(userId) {
  return handleGetRequests(`/getcreatedquizzes/${userId}`);
}

function getCreatedQuizQuestions(quizId) {
  return handleGetRequests(`/getcreatedquizquestions/${quizId}`);
}

function getQuestionsByCategory(category) {
  return handleGetRequests(`/questions/${category}`)
}

// Handles all POST requests, takes a route, params, and data object
function handlePostRequests(route, data = {}, params = {}) {
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

function getFriends(userId) {
  return handleGetRequests(`/friends/${userId}`);
}

function createFriendship(userId, friendUserId) {
  return handlePostRequests(`/friends/${userId}/${friendUserId}`);
}

function createQuiz(quizData) {
  return handlePostRequests(`/createquiz`, quizData);
}

function createQuestion(questionsData) {
  return handlePostRequests(`/createquestion`, questionsData);
}

// Handles all PUT requests, takes a route and a params
function handlePutRequests(route, data = {}, params = {}) {
  let options = {
    method: "put",
    url: url + route,
    headers: {
      "Content-Type": "application/json",
    },
    params: params,
    data: data,
  };
  return axios(options);
}

function reviseQuizQuestion(questionId, newQuestionData) {
  return handlePutRequests(`/revisequestion/${questionId}`, newQuestionData);
}

// Handles all DELETE requests, takes a route and a params
function handleDeleteRequests(route, params) {
  let options = {
    method: "delete",
    url: url + route,
    params: params,
  };
  return axios(options);
}

function removeQuiz(quizId) {
  return handleDeleteRequests(`/deletequiz/${quizId}`);
}

export {
  getStrangers,
  getFriends,
  createFriendship,
  createQuiz,
  createQuestion,
  reviseQuizQuestion,
  getUserQuizHistory,
  getCreatedQuizQuestions,
  getQuestionsByCategory,
  removeQuiz
};

