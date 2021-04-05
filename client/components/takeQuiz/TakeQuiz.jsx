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
  modal: {}
}));

const TakeQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});

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

  useEffect(() => {
    let allQuestions = sampleData;
    let cleanedQuestions = [];
    if (allQuestions.length) {
      for (var i = 0; i < allQuestions.length; i++) {
        const questionBody = cleanText(allQuestions[i].question);
        const cleanedQuestion = Object.assign(allQuestions[i], { question: questionBody });
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

  return (
    <Box>
        {quizQuestions.length
          ? quizQuestions.map((question, index) => {
            const allAnswers = randomizeAnswers(question.correct_answer, question.incorrect_answers);
            return (
              <FormControl key={ index } className={ classes.quiz }>
                <FormLabel>{ question.question }</FormLabel>
                <RadioGroup aria-label={ question.question }>
                  {allAnswers.map((answer, index) => (
                    <FormControlLabel
                      key={ index }
                      value={ answer }
                      control={ <Radio /> }
                      label={ answer } />
                  ))}
                </RadioGroup>
              </FormControl>
            )})
          : null
        }

      <Modal className={ classes.modal }>
      </Modal>

    </Box>
  );
};

export default TakeQuiz;