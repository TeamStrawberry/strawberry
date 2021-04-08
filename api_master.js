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

function getSingleQuiz(quizId) {
  return handleGetRequests(`/quiz/${quizId}`);
}

function submitQuizAnswers(quizId, userId, userScore) {
  return handlePostRequests('/submitquiz', {}, {
    correct_answer_count: userScore.correct,
    incorrect_answer_count: userScore.incorrect,
    id_quiz: quizId,
    id_users: userId
  });
}

function getQuizHistory(userId) {
  return handleGetRequests(`/quiz/history/taken/${userId}`);
}

export { getStrangers, createFriendship, getSingleQuiz, submitQuizAnswers, getQuizHistory };
