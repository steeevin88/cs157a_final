import axios from 'axios'

const API_URL = '/api/exercises'

// Get all exercises
const getExercises = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

// Add a new exercise
const addExercise = async (exerciseData) => {
  const response = await axios.post(API_URL, exerciseData);
  return response.data;
}

// Delete an exercise
const deleteExercise = async (id) => {
  const response = await axios.delete(API_URL + '/' + id);
  return response.data;
}

const exerciseService = {
  getExercises,
  addExercise,
  deleteExercise,
}

export default exerciseService;
