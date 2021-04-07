const frisby = require('frisby');

it('should return a 201 status for quiz creation', function () {
  return frisby
    .post('http://localhost:3000/createquiz', {
      name: 'Strawberry',
      category: 'General-Knowledge',
      difficulty: 'Hard',
      id_users: 1
    })
    // .inspectJSON()
    // .inspectBody()
    .expect('status', 201)
});

it('should return a 201 status for question creation', function () {
  return frisby
    .post('http://localhost:3000/createquestion', {
      category: 'General-Knowledge',
      type: 'Multiple',
      difficulty: 'Hard',
      question: 'What color is a strawberry?',
      correct_answer: 'Red',
      incorrect_answers: ['Blue, White, Purple'],
      id_users: 1,
      id_quiz: 1
    })
    // .inspectJSON()
    // .inspectBody()
    .expect('status', 201)
});