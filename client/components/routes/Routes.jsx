import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuizCreator from '../quizcreator/QuizCreator.jsx';
import QuizList from '../quizList/QuizList';
import QuizSearch from '../quizSearch/QuizSearch';
import UserProfile from "../users/UserProfile";
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
          </ul>
        </nav>
        <Switch>
          <Route path="/quizzes">
            <QuizList />
          </Route>
          <Route path="/create">
            <QuizCreator />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path='/quiz/:quizId'>
            <TakeQuiz/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function CreateQuiz() {
  return <h2>Build your own pizza(quiz) here</h2>;
}

export default Routes;
