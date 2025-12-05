import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
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

// Auth
export const loginUser = (credentials: any) => API.post('/auth/login', credentials);
export const registerUser = (userData: any) => API.post('/auth/register', userData);

// Complaints
export const fetchComplaints = () => API.get('/complaints');
export const createComplaint = (data: any) => API.post('/complaints', data);
export const updateComplaintStatus = (id: string, status: string) => API.patch(`/complaints/${id}`, { status });

// Community
export const fetchSubreddits = () => API.get('/community/subreddits');
export const createSubreddit = (data: any) => API.post('/community/subreddits', data);
export const fetchPosts = (subreddit?: string) => API.get(`/community/posts${subreddit ? `?subreddit=${subreddit}` : ''}`);
export const createPost = (data: any) => API.post('/community/posts', data);

// Users (New)
export const fetchUsers = () => API.get('/users');
export const createUser = (data: any) => API.post('/users', data);
export const deleteUser = (id: string) => API.delete(`/users/${id}`);

// Events (New)
export const createEvent = (data: any) => API.post('/events', data);
export const deleteEvent = (id: string) => API.delete(`/events/${id}`);
export const fetchEvents = () => API.get('/events');

export default API;