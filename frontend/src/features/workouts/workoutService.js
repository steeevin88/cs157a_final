import axios from 'axios'

const API_URL = '/api/workouts'

// Get all workouts
const getWorkouts = async (token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL, authToken);
  return response.data;
}

// Get workout by ID
const getWorkoutById = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken);
  return response.data;
}

// Add a new workout
const addWorkout = async (workoutData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, workoutData, authToken);
  return response.data;
}

// Delete an workout
const deleteWorkout = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const workoutService = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  deleteWorkout,
}

export default workoutService;
