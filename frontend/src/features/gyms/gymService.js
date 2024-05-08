import axios from 'axios'

const API_URL = '/api/gyms'

// Get all gyms
const getGyms = async (token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL, authToken);
  return response.data;
}

// Add a new gym
const addGym = async (gymData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, gymData, authToken);
  return response.data;
}

// Delete a gym
const deleteGym = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const gymService = {
  getGyms,
  addGym,
  deleteGym,
}

export default gymService;
