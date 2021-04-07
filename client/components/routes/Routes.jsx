import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserProfile from "../users/UserProfile";
import QuizSearch from '../quizSearch/QuizSearch';
import QuizCreator from '../quizcreator/QuizCreator.jsx';
import TakeQuiz from '../takeQuiz/TakeQuiz';

function Routes() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizzes">Quizzes/Categories</Link>
            </li>
            <li>
              <Link to="/create">Create A Quiz</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/takeQuiz">Take Quiz</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/quizzes">
            <Quizzes />
          </Route>
          <Route path="/create">
            <QuizCreator />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/takeQuiz">
            <TakeQuiz />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Quizzes() {
  return (
    <div>
      <h2>Take your quizzes here</h2>
      <QuizSearch />
    </div>
  );
}

function CreateQuiz() {
  return <h2>Build your own pizza(quiz) here</h2>;
}

export default Routes;
