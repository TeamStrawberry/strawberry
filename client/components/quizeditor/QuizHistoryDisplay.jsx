import React from 'react';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteButton from './DeleteButton.jsx';
import { makeStyles } from '@material-ui/core/styles';

const QuizHistoryDisplay = ({ quizzes, getQuiz}) => {


  const useStyles = makeStyles({
    table: {
      width: 'auto'
    },
  });

  const classes = useStyles();

  return (
    <TableContainer className = 'quiz-table'>
      <Table className = {classes.table} stickyHeader = {true} aria-label = 'quizzes'>
        <TableHead>
          <TableRow>
            <TableCell align="center" style ={{fontSize: 22}}>Name</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Category</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Date-Created</TableCell>
            <TableCell align="center" style ={{fontSize: 22}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map(quiz => (
            <TableRow>
              <TableCell align="center" style ={{fontSize: 16}}>{quiz.name}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>{quiz.category}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>{quiz.date_created.slice(0,10)}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>
                <Button variant = 'contained' color = 'primary' onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Start Edits</Button>
                <DeleteButton quizId={quiz.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuizHistoryDisplay;

{/* // const QuizHistoryDisplay = ({ quizzes, getQuiz}) => {

//   return quizzes.map((quiz) => {
//     return (
//         <li key={quiz.id}>
//           <h3 className = 'quiz-name'>{quiz.name}</h3>
//           <h3 className = 'quiz-category'>{quiz.category}</h3>
//           <h3 className = 'quiz-date-created'>{quiz.date_created.slice(0,10)}</h3>
//           <Button variant = 'contained' color = 'primary' onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Start Edits</Button>
//           <DeleteButton quizId={quiz.id}/>
//         </li>
//     )
//   })
// }

// export default QuizHistoryDisplay; */}