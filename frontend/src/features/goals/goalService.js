import axios from 'axios'

const API_URL = '/api/goals'

// Get all goals
const getGoals = async (token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL, authToken);
  return response.data;
}

// Add a new goal
const addGoal = async (goalData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, goalData, authToken);
  return response.data;
}

// Delete a goal
const deleteGoal = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const goalService = {
  getGoals,
  addGoal,
  deleteGoal,
}

export default goalService;
