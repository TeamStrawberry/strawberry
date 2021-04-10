import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSingleQuiz, submitQuizAnswers, getQuizGlobalRankings, getQuizFriendRankings, getFriends } from "../../../api_master";
import { useHistory, useParams } from "react-router-dom";
import ChallengeFriend from '../friends/ChallengeFriend';

const useStyles = makeStyles(theme => ({
  quiz: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
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
  },
  header: {
    position: "fixed",
    top: 80,
    left: 10,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  body: {
    position: "fixed",
    top: 200,
    bottom: 10,
    maxHeight: '100%',
    overflow: 'auto',
  },
  question: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 10,
    backgroundColor: theme.palette.background.paper,
  },
  answers: {
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: theme.palette.background.paper,
  }
}));

const TakeQuiz = ({ userId = 12, loggedInUser }) => {
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
  const [submitted, setSubmitted] = useState(false);
  const [friends, setFriends] = useState([]);

  const classes = useStyles();
  let { quizId } = useParams();
  let history = useHistory();

  const randomizeAnswers = (correct, incorrect) => {
    let currentIndex, temporaryValue, randomIndex;
    let cleanedAnswers = [];
    let allAnswers = [correct].concat(incorrect.slice(0, 3));
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
    .then(userScore => {
      getFriendRankings(userScore);
      getGlobalRankings(userScore);
      submitAnswers(userScore);
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
    if (Object.keys(userAnswers).length === quizQuestions.length && !submitted) {
      setValidated(true);
      setSubmitted(true);
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
    if (!validated && !Object.keys(userAnswers).length) {
      history.goBack();
    } else if (!validated) {
      setShow(true);
    } else {
      history.goBack();
    }
  }

  const refreshFriends = () => {
    getFriends(loggedInUser.id).then((res) => {
      setFriends(res.data.rows);
    });
  };

  const retrieveQuiz = () => {
    let allAnswers = {}, cleanedQuestions = [], allQuestions;
    getSingleQuiz(quizId)
      .then(quiz => {
        setQuizQuestions(quiz.data.rows);
        return quiz.data.rows;
      })
      .then(quiz => {
        allQuestions = quiz;
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
      .then(cleanedQuestions => {
        for (var i = 0; i < cleanedQuestions.length; i++) {
          const answer = cleanedQuestions[i].correct_answer;
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
      id_users: userId
    })
    .catch(err => {
      console.error('Error: cannot submit quiz answers to database', err);
    })
  };

  const getGlobalRankings = (userScore) => {
    let rankings = [], allScores;
    let percentage = (userScore.correct / userScore.total * 100).toFixed(0);
    getQuizGlobalRankings(quizId)
      .then(scores => {
        allScores = scores.data.rows;
        if (!allScores.length) {
          setPercentile(100);
          return [];
        } else {
          return allScores;
        }
      })
      .then(allScores => {
        if (allScores.length) {
          for (let i = 0; i < allScores.length; i++) {
            const correct = Number(allScores[i].correct_answer_count);
            const incorrect = Number(allScores[i].incorrect_answer_count);
            const total = correct + incorrect;
            rankings.push((correct/total * 100).toFixed(0));
          }
          setGlobalScores(rankings);
          return rankings;
        } else {
          return [];
        }
      })
      .then(rankings => {
        if (rankings.length) {
          let sorted = rankings.sort();
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
    getQuizFriendRankings(quizId, userId)
      .then(scores => {
        allScores = scores.data.rows;
        if (allScores.length) {
          return allScores;
        } else {
          return [];
        }
      })
      .then(allScores => {
        if (allScores.length) {
          for (let i = 0; i < allScores.length; i++) {
            const correct = Number(allScores[i].correct_answer_count);
            const incorrect = Number(allScores[i].incorrect_answer_count);
            const total = correct + incorrect;
            rankings.push((correct/total * 100).toFixed(0));
          }
          rankings.push(percentage);
          let sorted = rankings.sort((a, b) => (b - a));
          return sorted;
        }
      })
      .then(sortedRankings => {
        if (sortedRankings) {
          setFriendScores(sortedRankings);
          let index = sortedRankings.indexOf(percentage) + 1;
          let individualRank = index.toString() + '/' + sortedRankings.length.toString();
          setRank(individualRank);
        }
      })
      .catch(err => {
        console.error('Error: cannot retrieve friends\' scores for quiz', err);
      })
  };

  useEffect(() => {
    retrieveQuiz();
    refreshFriends();
    return () => {
      setFriends([]);
    };
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
          <ChallengeFriend loggedInUser={ loggedInUser } friends={ friends } link={ `localhost:3000/quiz/${quizId}` } />
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
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" spacing={3} alignItems="center" className={ classes.header }>
        <Grid item xs={1} alignItems="center" spacing={2}>
          <Button onClick={ handleBack }>Go Back</Button>
        </Grid>
        <Grid item xs={10} container direction="column" display="flex" alignItems="center" spacing={2} >
          {quizQuestions.length
            ? <Grid item direction="column" display="flex" spacing={3}>
                <Grid item>
                  <h1 style={{ marginTop: 0, marginBottom: 0 }}>{ quizQuestions[0].name }</h1>
                </Grid>
                <Grid item container direction="row" justify='space-evenly'>
                  <Grid item display="flex">
                    <h4 style={{ marginTop: 0, marginBottom: 0 }}>Category: { quizQuestions[0].category }</h4>
                  </Grid>
                  <Grid item display="flex" >
                    <h4 style={{ marginTop: 0, marginBottom: 0 }}>Difficulty: { quizQuestions[0].difficulty }</h4>
                  </Grid>
                </Grid>
            </Grid>
            : null
          }
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={3} justify="center" className={ classes.body }>
        <Grid
          item
          xs={10}
          container
          direction="column"
          display="flex"
          spacing={2}
        >
          {quizQuestions.length
            ? quizQuestions.map((question, index) => (
              <FormControl key={ index } className={ classes.quiz }>
                <Grid item container direction="column">
                  <Grid item className={ classes.question }>
                    <FormLabel>{ question.question }</FormLabel>
                  </Grid>
                  <Grid item container direction="row" justify='space-evenly' className={ classes.answers }>
                    <Grid item xs={8} style={{ paddingLeft: "20%" }}>
                      <RadioGroup
                        aria-label={ question.question }
                        name={ question.question }
                        onChange={ handleChange }
                      >
                        {question.randomizedAnswers
                          ? question.type === 'multiple'
                            ? question.randomizedAnswers.slice(0, 2).map((answer, index) => (
                            <FormControlLabel
                              key={ index }
                              value={ answer }
                              control={ <Radio /> }
                              label={ answer } />
                            ))
                            : <FormControlLabel
                              value={ question.randomizedAnswers[0] }
                              control={ <Radio /> }
                              label={ question.randomizedAnswers[0] } />
                          : null
                        }
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={4} >
                      <RadioGroup
                        aria-label={ question.question }
                        name={ question.question }
                        onChange={ handleChange }
                      >
                        {question.randomizedAnswers
                          ? question.type === 'multiple'
                            ? question.randomizedAnswers.slice(2, 4).map((answer, index) => (
                            <FormControlLabel
                              key={ index }
                              value={ answer }
                              control={ <Radio /> }
                              label={ answer } />
                            ))
                            : <FormControlLabel
                              value={ question.randomizedAnswers[1] }
                              control={ <Radio /> }
                              label={ question.randomizedAnswers[1] } />
                          : null
                        }
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </FormControl>
            ))
            : null
          }
          {submitted
            ? <Button onClick={ handleOpen }>View Score</Button>
            : <Button type='submit' onClick={ handleSubmit }>Submit</Button>
          }
        </Grid>
      </Grid>

      <Modal open={ show } onClose={ handleClose }>
        { body }
      </Modal>
    </Grid>
  );
};

export default TakeQuiz;