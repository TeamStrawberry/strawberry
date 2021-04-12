import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../homepage/Navbar.jsx";
import HomePage from "../homepage/HomePage.jsx";
import QuizCreator from "../quizcreator/QuizCreator.jsx";
import QuizList from "../quizList/QuizList";
import QuizSearch from "../quizSearch/QuizSearch";
import UserProfile from "../users/UserProfile";
import TakeQuiz from "../takeQuiz/TakeQuiz";
import Authentication from "../authentication/Authentication.jsx";

function Routes() {
  const [criteria, setCriteria] = useState(false);
  const [user, setUser] = useState({});
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Router>
      <Navbar
        user={user}
        setUser={setUser}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
      />
      <Switch>
        <Route exact path ="/">
          <HomePage
            loggedInUser={user}
            setLoginOpen={setLoginOpen}
          />
        </Route>
        <Route path="/quizzes">
          <QuizSearch setCriteria={setCriteria} />
          <QuizList
            criteria={criteria}
            loggedInUser={user}
          />
        </Route>
        <Route path="/create">
          <QuizCreator user={user} />
        </Route>
        <Route path="/profile">
          <UserProfile loggedInUser={user} />
        </Route>
        <Route path="/quiz/:quizId">
          <TakeQuiz loggedInUser={user}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
