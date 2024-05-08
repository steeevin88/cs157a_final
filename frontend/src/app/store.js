import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exerciseReducer from '../features/exercises/exerciseSlice';
import recordReducer from '../features/records/recordSlice';
import goalReducer from '../features/goals/goalSlice';
import gymReducer from '../features/gyms/gymSlice';
import motivationWallReducer from '../features/motivationWalls/motivationWallSlice';
import motivationMessageReducer from '../features/motivationMessages/motivationMessageSlice';
import workoutReducer from '../features/workouts/workoutSlice';
import workoutExerciseReducer from '../features/workoutExercises/workoutExerciseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    records: recordReducer,
    goals: goalReducer,
    gyms: gymReducer,
    motivationWalls: motivationWallReducer,
    motivationMessages: motivationMessageReducer,
    workouts: workoutReducer,
    workout_exercises: workoutExerciseReducer,
  },
});
