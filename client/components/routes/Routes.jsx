import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


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
              <Link to="/profile">Account</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/quizzes">
          <Quizzes />
          </Route>
          <Route path="/create">
          <CreateQuiz />
          </Route>
        </Switch>
    </Router>
    </div>
    )
}

function Quizzes() {
  return <h2>Take your quizzes here</h2>;
}

function CreateQuiz() {
  return <h2>Build your own pizza(quiz) here</h2>;
}

export default Routes;