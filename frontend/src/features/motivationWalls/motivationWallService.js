import axios from 'axios'

const API_URL = '/api/motivation_walls'

// Get all exercises
const getMotivationWalls = async (token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL, authToken);
  return response.data;
}

// Get exercise by ID
const getMotivationWallById = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken);
  return response.data;
}

// Add a new exercise
const addMotivationWall = async (exerciseData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, exerciseData, authToken);
  return response.data;
}

// Delete an exercise
const deleteMotivationWall = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const motivationWallService = {
  getMotivationWalls,
  getMotivationWallById,
  addMotivationWall,
  deleteMotivationWall
}

export default motivationWallService;
