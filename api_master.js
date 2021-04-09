const axios = require("axios").default;

const url = "http://localhost:3000";

// Handles all GET requests, takes a route and a params
function handleGetRequests(route, params) {
  let options;
  options = { method: "get", url: url + route, params: params };
  return axios(options);
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

//GETs
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
  return handleGetRequests(`/questions/${category}`);
}

function getFriends(userId) {
  return handleGetRequests(`/friends/${userId}`);
}

function getSingleQuiz(quizId) {
  return handleGetRequests(`/quiz/${quizId}`);
}

function getQuizHistory(userId) {
  return handleGetRequests(`/quiz/history/taken/${userId}`);
}

//POSTs

function createFriendship(userId, friendUserId) {
  return handlePostRequests(`/friends/${userId}/${friendUserId}`);
}

function submitQuizAnswers(quizId, userId, userScore) {
  return handlePostRequests(
    "/submitquiz",
    {},
    {
      correct_answer_count: userScore.correct,
      incorrect_answer_count: userScore.incorrect,
      id_quiz: quizId,
      id_users: userId,
    }
  );
}

function createQuiz(quizData) {
  return handlePostRequests(`/createquiz`, quizData);
}

function createQuestion(questionsData) {
  return handlePostRequests(`/createquestion`, questionsData);
}

//PUTs

function reviseQuizQuestion(questionId, newQuestionData) {
  return handlePutRequests(`/revisequestion/${questionId}`, newQuestionData);
}

//DELETEs

function removeQuiz(quizId) {
  return handleDeleteRequests(`/deletequiz/${quizId}`);
}

function removeFriendship(userId, friendUserId) {
  return handleDeleteRequests(`/friends/${userId}/${friendUserId}`);
}

export {
  getStrangers,
  getUserQuizHistory,
  getCreatedQuizQuestions,
  getQuestionsByCategory,
  getFriends,
  getSingleQuiz,
  getQuizHistory,
  createFriendship,
  removeFriendship,
  submitQuizAnswers,
  createQuiz,
  createQuestion,
  reviseQuizQuestion,
  removeQuiz,
};
