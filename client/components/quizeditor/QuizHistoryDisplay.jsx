import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import DeleteButton from './DeleteButton.jsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
      width: '100%'
  }
}));

const QuizHistoryDisplay = ({ quizzes, getQuiz}) => {

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className = {classes.table} stickyHeader = {true} aria-label = 'quizzes'>
        <TableHead>
          <TableRow>
            <TableCell align="center" style ={{fontSize: 22}}>Name</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Category</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Date Created</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map(quiz => (
            <TableRow>
              <TableCell align="center" style ={{fontSize: 16}}>{quiz.name}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>{quiz.category}</TableCell>
              <TableCell align="center" style ={{fontSize: 16, width:'100%'}}>{quiz.date_created.slice(0,10)}</TableCell>
              <TableCell
                align="center"
                style ={{
                  fontSize: 16
                }}
              >
                <div
                  className = 'buttons'
                  style = {{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Button variant = 'contained' color = 'primary' onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Edit</Button>
                  <Button variant = 'contained' color = 'primary'>Share</Button>
                  <DeleteButton quizId={quiz.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuizHistoryDisplay;