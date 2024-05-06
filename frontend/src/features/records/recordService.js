import axios from 'axios'

const API_URL = '/api/records'

// Get all records
const getRecords = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken); // here, id is the exercise_id, not the record_id
  return response.data;
}

// Add a new record
const addRecord = async (recordData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, recordData, authToken);
  return response.data;
}

// Delete an record
const deleteRecord = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.delete(API_URL + '/' + id, authToken);
  return response.data;
}

const exerciseService = {
  getRecords,
  addRecord,
  deleteRecord,
}

export default exerciseService;
