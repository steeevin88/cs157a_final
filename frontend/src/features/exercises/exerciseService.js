import axios from 'axios'

const API_URL = '/api/exercises'

// Get all exercises
const getExercises = async (token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL, authToken);
  return response.data;
}

// Get exercise by ID
const getExerciseById = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken);
  return response.data;
}

// Add a new exercise
const addExercise = async (exerciseData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, exerciseData, authToken);
  return response.data;
}

// Delete an exercise
const deleteExercise = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const exerciseService = {
  getExercises,
  getExerciseById,
  addExercise,
  deleteExercise,
}

export default exerciseService;
