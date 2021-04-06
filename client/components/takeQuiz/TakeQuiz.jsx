import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import sampleData from '/sampleData.json';

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

const TakeQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState({
    'total': 15,
    'correct': 0,
    'incorrect': 0
  });
  const [show, setShow] = useState(false);

  const classes = useStyles();

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
      .replace(/&rsquo;/g, "'")
      .replace(/&#039;/g, "'");
  };

  const handleChange = (e) => {
    const previousAnswers = Object.assign({}, userAnswers);
    previousAnswers[e.target.name] = e.target.value;
    setUserAnswers(previousAnswers);
  };

  const calculateScore = () => {
    let correct = 0, incorrect = 0;
    for (var key in userAnswers) {
      if (quizAnswers[userAnswers[key]]) {
        correct++;
      } else {
        incorrect++;
      }
    }
    if (!correct && !incorrect) {
      setScore({
        'total': quizQuestions.length,
        'correct': 0,
        'incorrect': 0
      })
    } else {
      setScore({
        'total': correct + incorrect,
        'correct': correct,
        'incorrect': incorrect
      })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateScore();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  }

  useEffect(() => {
    let allQuestions = sampleData;
    let cleanedQuestions = [];
    if (allQuestions.length) {
      for (var i = 0; i < allQuestions.length; i++) {
        const questionBody = cleanText(allQuestions[i].question);
        const randomAnswers = randomizeAnswers(allQuestions[i].correct_answer, allQuestions[i].incorrect_answers);
        const cleanedQuestion = Object.assign(allQuestions[i], { question: questionBody, allAnswers: randomAnswers });
        cleanedQuestions.push(cleanedQuestion);
      }
    }
    setQuizQuestions(cleanedQuestions);
  }, [])

  useEffect(() => {
    const allAnswers = {};
    if (quizQuestions.length) {
      for (var i = 0; i < quizQuestions.length; i++) {
        const answer = quizQuestions[i].correct_answer;
        allAnswers[answer] = true;
      }
      setQuizAnswers(allAnswers);
    }
  }, [quizQuestions])

  const body = (
    <Grid className={ classes.modal }>
      <Grid item>
        <h1>You scored...</h1>
        <h1>{ Number(score.correct)/Number(score.total) * 100 }%</h1>
        <h2>{ score.correct }/{ score.total } questions</h2>
        <h4>{ score.correct } correct out of a total of { score.total }!</h4>
      </Grid>
      <Grid item >
        <Button
          variant="contained"
          variant="outlined"
          color="primary"
          onClick={ handleClose }
        >
          Back to Quiz
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Box>
      {quizQuestions.length
        ? quizQuestions.map((question, index) => (
          <FormControl key={ index } className={ classes.quiz }>
            <FormLabel>{ question.question }</FormLabel>
            <RadioGroup aria-label={ question.question } name={ question.question } onChange= { handleChange }>
              {question.allAnswers.map((answer, index) => (
                <FormControlLabel
                  key={ index }
                  value={ answer }
                  control={ <Radio /> }
                  label={ answer } />
              ))}
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