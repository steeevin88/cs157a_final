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
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(255),
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
);

-- 3. Records table
CREATE TABLE Records (
  RID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  EID INT NOT NULL,
  weight VARCHAR(255),
  repetitions INT,
  date DATE NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE,
  FOREIGN KEY (EID) REFERENCES Exercises(EID) ON DELETE CASCADE
);

-- 4. Goals table
CREATE TABLE Goals (
  GID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
);

-- 5. Location table
CREATE TABLE Location (
  LID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  description TEXT,
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
);

-- 6. Workout Routines table
CREATE TABLE WorkoutRoutines (
  WID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  time VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
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
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
);

-- 9. MotivationalMessages table
CREATE TABLE MotivationalMessages (
  MMID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email) ON DELETE CASCADE
);

-- 10. MotivationalWallMessages table
CREATE TABLE MotivationWallMessages (
  MWID INT NOT NULL,
  MMID INT NOT NULL,
  PRIMARY KEY (MWID, MMID),
  FOREIGN KEY (MWID) REFERENCES MotivationWall(MWID),
  FOREIGN KEY (MMID) REFERENCES MotivationalMessages(MMID)
);

-- Indexes via b-tree
CREATE INDEX idx_users_email ON Users (email);
CREATE INDEX idx_exercises_eid ON Exercises (EID);
CREATE INDEX idx_records_rid ON Records (RID);
CREATE INDEX idx_goals_gid ON Goals (GID);
CREATE INDEX idx_location_lid ON Location (LID);
CREATE INDEX idx_workoutroutines_wid ON WorkoutRoutines (WID);
CREATE INDEX idx_workoutroutineexercises_eid_wid ON WorkoutRoutineExercises (EID, WID);
CREATE INDEX idx_motivationwall_mwid ON MotivationWall (MWID);
CREATE INDEX idx_motivationalmessages_mmid ON MotivationalMessages (MMID);
CREATE INDEX idx_motivationwallmessages_mwid_mmid ON MotivationWallMessages (MWID, MMID);

-- Insert default user, password is password for ALL users...
INSERT INTO Users (email, name, password)
VALUES 
  ('steven@gmail.com', 'Steven', '$2a$10$HKB8KJw/pwWLCCwzc1yteOwvnmF3HROAiEBtNQLIRX1cMPcrQgKo.'),
  ('ethan@gmail.com', 'Ethan', '$2a$10$jkzzJx3RxU4P6cw4T0hiNOjYu8PwUQUBoECfOh4WudhaQez0SPLpK'),
  ('andy@gmail.com', 'Andy', '$2a$10$FESae.sYYDFlFxTwXas6iuTMffI8/iDYuu/ojWW3jl4qythdsdgF.'),
  ('ysabella@gmail.com', 'Ysabella', '$2a$10$HG.1UlYac.qHiuAJo3X8WeEa2pfyXchX7glDbHqRL5fYArzUuKLgy'),
  ('kelly@gmail.com', 'Kelly', '$2a$10$h/U1sMA3SDoghYKXIhO2Xu4JgAqcH/ig5r0JfsCvDwlQRcD.EQFgu');

-- Insert default exercises for users
INSERT INTO Exercises (email, name, muscle_group)
VALUES 
  ('steven@gmail.com', 'Bench Press', 'Chest'),
  ('steven@gmail.com', 'Squat', 'Legs'),
  ('steven@gmail.com', 'Leg Press', 'Legs'),
  ('steven@gmail.com', 'Shoulder Press', 'Arms/Shoulders'),
  ('steven@gmail.com', 'Lat Pulldown', 'Back'),
  ('steven@gmail.com', 'Abdominal Crunch', 'Other'),
  ('steven@gmail.com', 'Bicep Curls', 'Arms/Shoulders'),
  ('ethan@gmail.com', 'Bench Press', 'Chest'),
  ('ethan@gmail.com', 'Squat', 'Legs'),
  ('ethan@gmail.com', 'Leg Press', 'Legs'),
  ('ethan@gmail.com', 'Shoulder Press', 'Arms/Shoulders'),
  ('ethan@gmail.com', 'Lat Pulldown', 'Back'),
  ('ethan@gmail.com', 'Abdominal Crunch', 'Other'),
  ('ethan@gmail.com', 'Bicep Curls', 'Arms/Shoulders'),
  ('kelly@gmail.com', 'Bench Press', 'Chest'),
  ('kelly@gmail.com', 'Squat', 'Legs'),
  ('kelly@gmail.com', 'Leg Press', 'Legs'),
  ('kelly@gmail.com', 'Shoulder Press', 'Arms/Shoulders'),
  ('kelly@gmail.com', 'Lat Pulldown', 'Back'),
  ('kelly@gmail.com', 'Abdominal Crunch', 'Other'),
  ('kelly@gmail.com', 'Bicep Curls', 'Arms/Shoulders'),
  ('ysabella@gmail.com', 'Bench Press', 'Chest'),
  ('ysabella@gmail.com', 'Squat', 'Legs'),
  ('ysabella@gmail.com', 'Leg Press', 'Legs'),
  ('ysabella@gmail.com', 'Shoulder Press', 'Arms/Shoulders'),
  ('ysabella@gmail.com', 'Lat Pulldown', 'Back'),
  ('ysabella@gmail.com', 'Abdominal Crunch', 'Other'),
  ('ysabella@gmail.com', 'Bicep Curls', 'Arms/Shoulders'),
  ('andy@gmail.com', 'Bench Press', 'Chest'),
  ('andy@gmail.com', 'Squat', 'Legs'),
  ('andy@gmail.com', 'Leg Press', 'Legs'),
  ('andy@gmail.com', 'Shoulder Press', 'Arms/Shoulders'),
  ('andy@gmail.com', 'Lat Pulldown', 'Back'),
  ('andy@gmail.com', 'Abdominal Crunch', 'Other'),
  ('andy@gmail.com', 'Bicep Curls', 'Arms/Shoulders');

-- Insert default records for users (bench press)
INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '95 lbs', 5, DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Bench Press';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '100 lbs', 6, DATE_SUB(CURDATE(), INTERVAL 7 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Bench Press';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '135 lbs', 3, DATE_SUB(CURDATE(), INTERVAL 5 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Bench Press';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '135 lbs', 7, DATE_SUB(CURDATE(), INTERVAL 2 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Bench Press';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '155 lbs', 1, CURDATE()
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Bench Press';

-- Insert default records for users (squat)
INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '135 lbs', 4, DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Squat';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '145 lbs', 6, DATE_SUB(CURDATE(), INTERVAL 7 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Squat';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '135 lbs', 10, DATE_SUB(CURDATE(), INTERVAL 5 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Squat';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '155 lbs', 7, DATE_SUB(CURDATE(), INTERVAL 2 WEEK)
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Squat';

INSERT INTO Records (email, EID, weight, repetitions, date)
SELECT U.email, E.EID, '185 lbs', 1, CURDATE()
FROM Users U
JOIN Exercises E ON U.email = E.email
WHERE E.name = 'Squat';
