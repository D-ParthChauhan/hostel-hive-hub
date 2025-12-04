import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api', // Make sure this is 5001
});

export const fetchComplaints = () => API.get('/complaints');
export const createComplaint = (data) => API.post('/complaints', data);
export const updateComplaintStatus = (id, status) => API.patch(`/complaints/${id}`, { status });

export default API;