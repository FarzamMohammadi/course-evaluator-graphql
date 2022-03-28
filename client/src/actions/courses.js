import axios from 'axios';

const isLoggedIn = axios.defaults.headers.common['x-auth-token'];

// Register Course
export const registerCourse = async function (fromData) {
  try {
    const res = await axios.post('/api/courses', fromData);
    return true;
  } catch (error) {
    if (isLoggedIn) {
      alert(error.response.data.msg);
    } else {
      alert('Need to log in first');
    }
  }
};

// Register Course
export const updateCourse = async function (fromData, id) {
  try {
    const res = await axios.put('/api/courses/' + id, fromData);
    return true;
  } catch (error) {
    if (isLoggedIn) {
      alert(error.response.data.msg);
    } else {
      alert('Need to log in first');
    }
  }
};

// Get Course By Id
export const getCourseById = async function (id) {
  try {
    const res = await axios.get('/api/courses/' + id);
    const course = res.data.course;
    return course;
  } catch (error) {
    if (isLoggedIn) {
      alert(error.response.data.msg);
    } else {
      alert('Need to log in first');
    }
  }
};

// Get List of Courses
export const getCourses = async function () {
  try {
    const res = await axios.get('/api/courses/');
    const courses = res.data.courses;
    return courses;
  } catch (error) {
    if (isLoggedIn) {
      alert(error.response.data.msg);
    } else {
      alert('Need to log in first');
    }
  }
};

// Add as attendee
export const addAsAttendee = async function (courseId) {
  try {
    const res = await axios.put(`/api/courses/${courseId}/addstudent`);
    return true;
  } catch (error) {
    alert(error.response.data.msg);
  }
};

// Add as attendee
export const deleteCourse = async function (courseId) {
  try {
    const res = await axios.delete('/api/courses/' + courseId);
    return true;
  } catch (error) {
    alert(error.response.data.msg);
  }
};
