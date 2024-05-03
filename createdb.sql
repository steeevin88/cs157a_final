CREATE DATABASE pr_tracker;
USE pr_tracker;

-- 1. Users table
CREATE TABLE Users (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- 2. Exercises table
CREATE TABLE Exercises (
  EID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(255)
);

-- 3. Records table
CREATE TABLE Records (
  RID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  EID INT NOT NULL,
  weight VARCHAR(255),
  repetitions INT,
  date DATE NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email),
  FOREIGN KEY (EID) REFERENCES Exercises(EID)
);

-- 4. Goals table
CREATE TABLE Goals (
  GID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email)
);

-- 5. Location table
CREATE TABLE Location (
  LID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  description TEXT,
  FOREIGN KEY (email) REFERENCES Users(email)
);

-- 6. Workout Routines table
CREATE TABLE WorkoutRoutines (
  WID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  time VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (email) REFERENCES Users(email)
);

-- 7. Workout Routine Exercises table
CREATE TABLE WorkoutRoutineExercises (
  EID INT NOT NULL,
  WID INT NOT NULL,
  PRIMARY KEY (EID, WID),
  FOREIGN KEY (EID) REFERENCES Exercises(EID),
  FOREIGN KEY (WID) REFERENCES WorkoutRoutines(WID)
);

-- 8. MotivationWall table
CREATE TABLE MotivationWall (
  MWID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (email) REFERENCES Users(email)
);

-- 9. MotivationalMessages table
CREATE TABLE MotivationalMessages (
  MMID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email)
);

-- 10. MotivationalWallMessages table
CREATE TABLE MotivationWallMessages (
  MWID INT NOT NULL,
  MMID INT NOT NULL,
  PRIMARY KEY (MWID, MMID),
  FOREIGN KEY (MWID) REFERENCES MotivationWall(MWID),
  FOREIGN KEY (MMID) REFERENCES MotivationalMessages(MMID)
);