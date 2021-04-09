import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "../homepage/Navbar.jsx";
import React, { useState, useEffect } from "react";
import QuizCreator from "../quizcreator/QuizCreator.jsx";
import QuizList from "../quizList/quizList";
import QuizSearch from "../quizSearch/QuizSearch";
import UserProfile from "../users/UserProfile";
import TakeQuiz from "../takeQuiz/TakeQuiz";
import Authentication from "../authentication/Authentication.jsx";

function Routes() {
  const [criteria, setCriteria] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    id: 1,
    username: 'admin',
  });

  return (
    <div>
      <Authentication
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        setUserId={setUserId}
      />
      <Router>
        <Navbar />
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
        <Switch>
          <Route path="/quizzes">
            <QuizSearch setCriteria={setCriteria} />
            <QuizList criteria={criteria} loggedInUser={loggedInUser} />
          </Route>
          <Route path="/create">
            <QuizCreator />
          </Route>
          <Route path="/profile">
            <UserProfile loggedInUser={{ id: userId, username: "test" }} />
          </Route>
          <Route path="/quiz/:quizId">
            <TakeQuiz userId={userId} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
