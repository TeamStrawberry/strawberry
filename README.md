# Intermingle
Intermingle is the latest, greatest, social quiz taking site serving up fresh hot quizzes every day! Test your knowledge with quizzes in a variety of fun categories and compare your scores with fellow trivia enthusiasts across the globe. Add friends and send challenges to see who is the ultimate trivia buff. Think you're a Grand Master trivialist? Then create your own quizzes from scratch and try to stump the rest of the community!

## In Action
See fresh and hot quizzes on the homepage!
![Intermingle homepage](https://github.com/TeamStrawberry/strawberry/blob/stage/images/homepage.png?raw=true)

Take quizzes until your heart's content
![Take a quiz](https://github.com/TeamStrawberry/strawberry/blob/stage/images/takeQuiz.png?raw=true)

Think you can beat your friends? Challenge them to a quiz-off!
![challenge friends](https://github.com/TeamStrawberry/strawberry/blob/stage/images/challengeFriend.png?raw=true)

Are you an expert on a topic? Then make your own quiz and see if it's true
![make a quiz](https://github.com/TeamStrawberry/strawberry/blob/stage/images/makeQuiz.png?raw=true)


# Current Release
We worked directly with our client to prioritize critical features for this initial release.
Those features are:
 - Creating a homepage and navigation bar to explore the quizzes available
 - Requiring login for user interaction with the site
 - Being able to take quizzes and see score and ranking upon submission
 - Being able to create quizzes from scratch, or by pulling from a question bank
 - Being able to edit or delete previously created quizzes
 - Searching for quizzes based on search term, category, or difficulty level
 - Adding friends and challenging them to quizzes via a site-generated email
 - Computing quiz-related stats to show the user on their profile page and after completing a quiz

 ## Future enhancements
 Features slated for our next release include:
 - Log in with social media and have sign-in persist when navigating away from the site
 - Split search results into multiple pages for better readability
 - Saving unfinished quizzes (either while creating or taking) to return to later
 - Add quiz timer to improve ranking granularity
 - Make quiz challenges appear as in-site messages

# Stack
## Front-End
 - React
 - React Router
 - Material UI

## Back-End
 - Node
 - Express
 - PostgreSQL
 - Open Trivia DB API

## Deployment
 - Docker
 - AWS EC2

 # Workflow
 For this project we maintained one master (deployed) branch, one staging branch, and added/deleted feature branches as needed. Sprint plans were tracked using [Trello] (https://trello.com/b/bjtybXS7/blue-ocean). When features were ready to be added into stage the following steps were taken:
  1. Pull down the stage branch
  2. Merge local feature branch with local stage branch
  3. Validate that all features are still working correctly
  4. Push changes to GitHub and create a pull request into staging
  5. Another teammember must complete a code review before giving the ok to merge
  6. At the end of the sprint, stage is merged in master

# Get Started
  Our app is deployed! You can visit it at http://18.210.13.63:3000
  To run this on your own machine, execute the follwing commands from a terminal in the root folder:
   - npm install
   - npm run react-dev
   - npm start
   - navigate to localhost:3000

## Challenges/Lessons Learned
  This project was the first time for all contributors to be working on a large team to complete one application. For ease of development, we tried to make the sections as siloed as possible by dividing tasks based on user story, instead of splitting up front-end and back-end work. This meant all team members worked as full stack engineers and owned all portions of their assigned functionality. Dummy data was used while waiting for either the database to be seeded and deployed, or state to be passed from components owned by another teammate. This turned out to be a very good decision in the end as it made development faster and produced less bugs than there might otherwise have been if there was more overlap in ownership. It also minimized any down time while waiting on dependencies, allowing us to complete more features.

  Though each individual teammate faced their own unique challenges, as a team, there are a couple things we know improve on in the future. First, we wasted a day and a half brushing up n Redux, since we assumed this complex an application would require a large amount of shared state. However, once we started coding, it became clear that there were very few pieces of state shared, which negated the need for Redux. Had we spent time at the outset thinking of what state each of our components would need, we might have come to that conclusion sooner. Secondly, we did not track our tickets with great accuracy. This became problematic in those instances where one teammate was waiting for work to be completed by another, and could not trust our Trello board to be accurate, thus creating more work to track down timelines. Should we continue to work on this, using Trello more effectively will be a shared goal.

  # Contributors
  [Alex Lee](https://github.com/acerslee), [Cindy Ryoo](https://github.com/cindyryoo7), [Daniel Ko](https://github.com/danielko14), [Harshin Kanabar](https://github.com/Hkanabar), [Helen Tael](https://github.com/htael), [John Cooke](https://github.com/john-cooke832), [Lukas Schweter](https://github.com/lukas-schweter), [Mike Kolarick](https://github.com/koalarick)
