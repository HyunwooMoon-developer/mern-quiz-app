import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_DEVELOPMENT_SERVER,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('quizToken')}`,
  },
});

export default instance;
