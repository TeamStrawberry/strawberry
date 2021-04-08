import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSingleQuiz, submitQuizAnswers } from "../../../api_master";
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
      .replace(/&eacute;/g, "é");
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
      calculateScore();
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
    submitQuizAnswers(14, 1, userScore) // later change to: submitQuizAnswers(quizId, userId, userScore);
    .catch(err => {
      console.error('Error: cannot submit quiz answers to database', err);
    })
  };

  useEffect(() => {
    retrieveQuiz();
  }, [])

  const body = (
    validated
      ? <Grid className={ classes.modal }>
        <Grid item>
          <h1>You scored...</h1>
          <h1>{ (Number(score.correct)/Number(score.total) * 100).toFixed(0) }%</h1>
          <h2>{ score.correct }/{ score.total } questions</h2>
          <h4>{ score.correct } correct out of a total of { score.total }!</h4>
        </Grid>
        <Grid item>
          <Grid>
            <h1>insert score out of friends</h1>
          </Grid>
          <Grid>
            <h1>insert global percentile</h1>
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