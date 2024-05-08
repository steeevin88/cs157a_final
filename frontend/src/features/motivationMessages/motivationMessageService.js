import axios from 'axios'

const API_URL = '/api/messages'

// Get a wall's messages
const getMessages = async (id, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.get(API_URL + '/' + id, authToken);
  return response.data;
}

// Add a new message to a wall
const addMessage = async (messageData, token) => {
  const authToken = { headers: { Authorization: `Bearer ${token}`}}
  const response = await axios.post(API_URL, messageData, authToken);
  return response.data;
}

const motivationMessageService = {
  getMessages,
  addMessage,
}

export default motivationMessageService;
