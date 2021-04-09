import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSingleQuiz, submitQuizAnswers, getQuizGlobalRankings, getQuizFriendRankings } from "../../../api_master";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  quiz: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    alignContent: 'flex-start',
  },
  modal: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "5px solid",
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
}));

const TakeQuiz = (userId) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState({
    'total': 15,
    'correct': 0,
    'incorrect': 0
  });
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [globalScores, setGlobalScores] = useState([]);
  const [friendScores, setFriendScores] = useState([]);
  const [percentile, setPercentile] = useState(0);
  const [rank, setRank] = useState('');

  const classes = useStyles();
  let { quizId } = useParams();
  let history = useHistory();

  const randomizeAnswers = (correct, incorrect) => {
    let currentIndex, temporaryValue, randomIndex;
    let cleanedAnswers = [];
    let allAnswers = [correct].concat(incorrect);
    currentIndex = allAnswers.length;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = allAnswers[currentIndex];
      allAnswers[currentIndex] = allAnswers[randomIndex];
      allAnswers[randomIndex] = temporaryValue;
    }
    for (var i = 0; i < allAnswers.length; i++) {
      cleanedAnswers.push(cleanText(allAnswers[i]));
    }
    return cleanedAnswers;
  };

  const cleanText = (text) => {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&eacute;/g, "é")
      .replace(/&ouml;/g, "Ö");
  };

  const calculateScore = () => {
    (async () => {
      let correct = 0, incorrect = 0, currentScore;
      for (var key in userAnswers) {
        if (quizAnswers[userAnswers[key]]) {
          correct++;
        } else {
          incorrect++;
        }
      }
      if (!correct && !incorrect) {
        currentScore = {
          'total': quizQuestions.length,
          'correct': 0,
          'incorrect': 0
        }
      } else {
        currentScore = {
          'total': correct + incorrect,
          'correct': correct,
          'incorrect': incorrect
        }
      }
      await setScore(currentScore);
      return currentScore;
    })()
    .then(response => {
      getFriendRankings(response);
      getGlobalRankings(response);
      submitAnswers(response);
    })
    .catch(err => {
      console.error('Error: cannot submit answers to the database', err);
    })
  };

  const handleChange = (e) => {
    const previousAnswers = Object.assign({}, userAnswers);
    previousAnswers[e.target.name] = e.target.value;
    setUserAnswers(previousAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (Object.keys(userAnswers).length === quizQuestions.length) {
      setValidated(true);
      calculateScore();
      handleOpen();
    } else {
      setValidated(false);
      handleOpen();
    }
  };

  const handleClose = () => {
    setShow(false);
  }

  const handleOpen = () => {
    setShow(true);
  }

  const handleBack = () => {
    if (!validated) {
      setShow(true);
    } else {
      history.goBack();
    }
  }

  const retrieveQuiz = () => {
    let allAnswers = {}, cleanedQuestions = [], allQuestions;
    getSingleQuiz(quizId)
      .then(response => {
        setQuizQuestions(response.data.rows);
        return response.data.rows;
      })
      .then(response => {
        allQuestions = response;
        if (allQuestions.length) {
          for (var i = 0; i < allQuestions.length; i++) {
            const questionBody = cleanText(allQuestions[i].question);
            const randomAnswers = randomizeAnswers(allQuestions[i].correct_answer, allQuestions[i].incorrect_answers);
            const cleanedQuestion = Object.assign(allQuestions[i], { question: questionBody, randomizedAnswers: randomAnswers });
            cleanedQuestions.push(cleanedQuestion);
          }
          setQuizQuestions(cleanedQuestions);
          return cleanedQuestions;
        }
      })
      .then(response => {
        for (var i = 0; i < response.length; i++) {
          const answer = response[i].correct_answer;
          allAnswers[answer] = true;
        }
        setQuizAnswers(allAnswers);
      })
      .catch(err => {
        console.error('Error: cannot retreive quiz questions from database', err)
      })
  }

  const submitAnswers = (userScore) => {
    submitQuizAnswers({
      correct_answer_count: userScore.correct,
      incorrect_answer_count: userScore.incorrect,
      id_quiz: quizId,
      id_users: 11 // later change to: userId
    })
    .catch(err => {
      console.error('Error: cannot submit quiz answers to database', err);
    })
  };

  const getGlobalRankings = (userScore) => {
    let rankings = [], allScores;
    let percentage = (userScore.correct / userScore.total * 100).toFixed(0);
    getQuizGlobalRankings(quizId)
      .then(response => {
        allScores = response.data.rows;
        if (!allScores.length) {
          setPercentile(100);
          return [];
        } else {
          return allScores;
        }
      })
      .then(response => {
        if (response.length) {
          for (let i = 0; i < response.length; i++) {
            const correct = Number(response[i].correct_answer_count);
            const incorrect = Number(response[i].incorrect_answer_count);
            const total = correct + incorrect;
            rankings.push((correct/total * 100).toFixed(0));
          }
          setGlobalScores(rankings);
          return rankings;
        } else {
          return [];
        }
      })
      .then(response => {
        if (response.length) {
          let sorted = response.sort();
          let below = 0;
          let equal = 0;
          for (let i = 0; i < sorted.length; i++) {
            if (sorted[i] < percentage) {
              below++;
            } else if (sorted[i] === percentage) {
              equal++;
            }
          }
          let userPercentile = ((below + (0.5 * equal)) / sorted.length) * 100;
          setPercentile(userPercentile);
        }
      })
      .catch(err => {
        console.error('Error: cannot retrieve global rankings for quiz', err);
      })
  }

  const getFriendRankings = (userScore) => {
    let percentage = (userScore.correct / userScore.total * 100).toFixed(0);
    let allScores, rankings = [];
    getQuizFriendRankings(quizId, 9) // later change to: getQuizFriendRankings(quizId, userId)
      .then(response => {
        allScores = response.data.rows;
        if (allScores.length) {
          return allScores;
        } else {
          return [];
        }
      })
      .then(response => {
        if (response.length) {
          for (let i = 0; i < response.length; i++) {
            const correct = Number(response[i].correct_answer_count);
            const incorrect = Number(response[i].incorrect_answer_count);
            const total = correct + incorrect;
            rankings.push((correct/total * 100).toFixed(0));
          }
          rankings.push(percentage);
          let sorted = rankings.sort((a, b) => (b - a));
          return sorted;
        }
      })
      .then(response => {
        if (response) {
          setFriendScores(response);
          let index = response.indexOf(percentage) + 1;
          let individualRank = index.toString() + '/' + response.length.toString();
          setRank(individualRank);
        }
      })
      .catch(err => {
        console.error('Error: cannot retrieve friends\' scores for quiz', err);
      })
  };

  useEffect(() => {
    retrieveQuiz();
  }, [])

  const body = (
    validated
      ? <Grid className={ classes.modal }>
        <Grid item>
          <h1>Your score is...</h1>
          <h1>{ (Number(score.correct)/Number(score.total) * 100).toFixed(0) }%</h1>
          <h2>You answered { score.correct } out of { score.total } correct!</h2>
        </Grid>
        <Grid item>
          {rank.length
            ? <Grid>
              <h1>You rank { rank } of your friends!</h1>
            </Grid>
            : <Grid>
              <h1>None of your friends have taken this quiz.</h1>
            </Grid>
          }
          <Grid>
            <h1>You've scored in the { percentile.toFixed(0) } percentile globally!</h1>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            variant="outlined"
            color="primary"
          >
            Share Score
          </Button>
          <Button
            variant="contained"
            variant="outlined"
            color="primary"
          >
            Challenge a Friend
          </Button>
          <Button
            variant="contained"
            variant="outlined"
            color="primary"
            onClick={ handleClose }
          >
            Close
          </Button>
        </Grid>
      </Grid>
      : <Grid className={ classes.modal }>
        <Grid item>
          <h1>Looks like you've missed some questions.</h1>
          <h1>[insert warning icon]</h1>
          <h1>Please answer all questions then submit your quiz!</h1>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            variant="outlined"
            color="primary"
            onClick={ handleClose }
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
  );

  return (
    <Box>
      <Button onClick={ handleBack }>Go Back</Button>
      <Button>placeholder for timer: 0:00</Button>
      {quizQuestions.length
        ? quizQuestions.map((question, index) => (
          <FormControl key={ index } className={ classes.quiz }>
            <FormLabel>{ question.question }</FormLabel>
            <RadioGroup
              aria-label={ question.question }
              name={ question.question }
              onChange={ handleChange }
            >
              {question.randomizedAnswers
                ? question.randomizedAnswers.map((answer, index) => (
                <FormControlLabel
                  key={ index }
                  value={ answer }
                  control={ <Radio /> }
                  label={ answer } />
                ))
                : null
              }
            </RadioGroup>
          </FormControl>
        ))
        : null
      }
      <Button type='submit' onClick={ handleSubmit }>Submit</Button>
      <Modal open={ show } onClose={ handleClose }>
        { body }
      </Modal>
    </Box>
  );
};

export default TakeQuiz;