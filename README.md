# GymRatz (Personal Record Tracker Application + Gym Management Application)

Our project is a personal record (PR) tracker, used to track personal records at the gym. 

As avid gym-goers, it’s become increasingly important for us to track our progress in lifting weights at the gym. A valuable way to measure our gym progression and performance is by tracking our records of the weights we lift. For example, the bench press is a common exercise practiced by gym-goers. If someone were to bench press 135 lbs. one week, and then 155 lbs. two months later, we could reliably claim that such an individual has made progress. Additionally, personal records may be difficult to remember. Perhaps an individual pushed their limits and lifted a heavier weight than normal; however, upon returning to the gym, they may have forgotten this information and lost potential progress. 

Ultimately, our application aims to mediate both issues by providing a professional way to track/log one’s progression in physical fitness. However, this isn't the application only purpose; this application further serves to manage gym information. This include, but is not limited to, features such as tracking gym goals, workouts, and finding gyms posted by other "GymRatz" users.

## Features

* Account Registration: Users will be able to register for an account by providing an email, username, and password. This authentication system will be secure: passwords will be encrypted with JWT tokens.

* Exercise Log: Users will be able to log personal records for various gym exercises. These logs will include common associated details, including but not limited to exercise name, the weight lifted, the number of repetitions, and the date achieved. 

* Goal Setting: Users will be able to set goals and compare them to current their progress.

* Gym Finder: Users will be able to post and view gym locations; this will help other gym-goers find new, potentially lesser known gyms.

* Motivation Wall: Users will be able to create motivation walls. On these walls, everyone can post motivational messages for others to see.

## Technology Stack
This project uses React, Express, Node, Redux (for global state management) and MySQL (data). GymRatz is styled using a combination of raw CSS, Tailwind, and DaisyUI.

## Division of Work
This project was created as part of SJSU's CS157A Final Project. The students involved were: Steven Le, Ysabella Dela Cruz, Kelly Dang, Ethan Park, and Andy Wang. Ultimately, the division of work leaned into the strengths + current abilities of each student. While more general design choices, such as the application overall UI, color theme(s), and schemas, were chosen as a team, the division of specific parts of the project was as follows:

#### Steven Le:
- Created inital React Application
- Added initial schema indexing
- Created Exercises + Homepage Functionality
- Created Workouts Page + Logic
- Created Motivation Wall Page + Logic

#### Ysabella Dela Cruz:
- Created Gym-Finder (Locations) Page + Logic
- Finished Login + Registration Logic
- Configured Tailwind CSS for simpler styling
- Planned specific project details + wrote project README

#### Kelly Dang:
- Created the initial schema/tables
- Initial backend/ Express server setup
- Created Registration + Login Endpoints
- Created + designed final project presentation slides

#### Ethan Park:
- Worked on adding records (PRs) functionality + UI
- Helped develop Redux reducers for global state management (on frontend)
- Handled logic behind functions that queried SQL statements to insert 1000+ data entries for certain tables (to highlight indexing)
- Finished README following final project specifications

#### Andy Wang:
- Created Goals Page + Logic
- Helped setup DaisyUI extension for modal components
- Acted as team manager, organizing team meetups + check ins
- Assisted in creating project presentation slides


## Instructions for using GymRatz

### 1. Setting up MySQL + Environment Variables

To run this application locally, you'll need to have an instance of the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) running. To make setup easy, GymRatz uses the root user to connect to one's MySQL server.
<br>
<br>
Following the .env.example file, create a .env file in the project's root directory. Replace DB_PASSWORD with the password of the user currently logged into your MySQL server instance
```
DB_PASSWORD = YOUR_MYSQL_PASSWORD
NODE_ENV = development
JWT_SECRET = abc123
```
For testing purposes, keep the JWT_SECRET as abc123. For personal use, change this secret and keep it private.

### 2. Running the Application
Starting from the root directory, run the following command to install packages used to run our backend and frontend concurrently.
```
npm i
```
Now run these commands to install backend dependencies.
```
cd backend
npm i
```
Now, cd into the frontend directory to install frontend dependencies.
```
cd ../frontend
npm i
```
Finally, cd back into the root directory and run the application.
```
cd ..
npm run dev
```