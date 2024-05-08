import axios from 'axios'

const API_URL = '/api/workout_exercises'

// Get all workouts
const getWorkoutExercises = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken);
  return response.data;
}

// Add an exercise to a workout
const addWorkoutExercise = async (workoutData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL + '/' + workoutData.WID, workoutData, authToken);
  return response.data;
}

// Delete an exercise from a workout
const deleteWorkoutExercise = async (workoutData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + workoutData.WID + "_" + workoutData.EID, authToken);
  return response.data;
}

const workoutExerciseService = {
  getWorkoutExercises,
  addWorkoutExercise,
  deleteWorkoutExercise,
}

export default workoutExerciseService;
