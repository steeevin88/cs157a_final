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
