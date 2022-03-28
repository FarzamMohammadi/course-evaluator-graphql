import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const register = async function (fromData) {
  try {
    const res = await axios.post('/api/students', fromData);
    return true;
  } catch (error) {
    alert('Could not register');
  }
};

// Login User
export const login = async function (fromData) {
  try {
    localStorage.removeItem('token');
    const res = await axios.post('/api/auth', fromData);
    const token = res.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return token;
  } catch (error) {
    alert('Could not log in');
  }
};
