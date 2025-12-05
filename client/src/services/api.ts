import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to attach the Token to every request
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('h5_user');
  if (user) {
    const { token } = JSON.parse(user);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- Auth APIs ---
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData); // Council only

// --- Complaint APIs ---
export const fetchComplaints = () => API.get('/complaints');
export const createComplaint = (data) => API.post('/complaints', data);
export const updateComplaintStatus = (id, status) => API.patch(`/complaints/${id}`, { status });

// --- Community APIs ---
export const fetchSubreddits = () => API.get('/community/subreddits');
export const createSubreddit = (data) => API.post('/community/subreddits', data); // Council only
export const fetchPosts = (subreddit) => API.get(`/community/posts${subreddit ? `?subreddit=${subreddit}` : ''}`);
export const createPost = (data) => API.post('/community/posts', data);

export default API;