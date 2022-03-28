import axios from 'axios';

const isLoggedIn = axios.defaults.headers.common['x-auth-token'];

// Get Student By Id
export const getStudentById = async function (attendee) {
  try {
    const res = await axios.get('/api/students/' + attendee._id);
    const student = res.data.student;
    return student;
  } catch (error) {
    if (isLoggedIn) {
      alert('Could not register course');
    } else {
      alert('Need to log in first');
    }
  }
};

// Get Students
export const getStudents = async function (attendee) {
  try {
    const res = await axios.get('/api/students/');
    const students = res.data.students;
    return students;
  } catch (error) {
    if (isLoggedIn) {
      alert('Could not register course');
    } else {
      alert('Need to log in first');
    }
  }
};
