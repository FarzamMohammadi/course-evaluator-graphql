import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  registerCourse,
  getCourseById,
  updateCourse,
} from '../../actions/courses';
import './courses.css';

export default function AddCourse() {
  let navigate = useNavigate();
  const [executed, setExecuted] = useState(false);
  const [courseId, setCourseId] = useState(useParams().id);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    section: '',
    semester: '',
  });
  if (courseId && !executed) {
    getCourse();
  }
  const { code, name, section, semester } = formData;

  async function getCourse() {
    const getCoursePromise = await getCourseById(courseId).then(function (
      course
    ) {
      if (course) {
        setFormData(course);
        setExecuted(true);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!courseId) {
      const courseRegistrationPromise = await registerCourse(formData).then(
        function (isRegistered) {
          if (isRegistered) {
            alert('Course Created!');
            navigate('/list-courses');
          }
        }
      );
    } else {
      const updateCoursePromise = await updateCourse(formData, courseId).then(
        function (isUpdated) {
          if (isUpdated) {
            alert('Course Updated!');
            navigate('/list-courses');
          }
        }
      );
    }
  }

  function getWelcomeMsg() {
    if (courseId) {
      return <h1>Edit Course</h1>;
    } else {
      return <h1>Add Course</h1>;
    }
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <section className='container'>
        {getWelcomeMsg()}
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Course Code:*</p>
            <input
              type='text'
              placeholder='COMP399'
              name='code'
              value={code}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Coures Name:</p>
            <input
              type='text'
              placeholder='Intro to full-stack development'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Course Section:</p>
            <input
              type='text'
              placeholder='003'
              name='section'
              value={section}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Semester:</p>
            <input
              type='text'
              placeholder='2'
              name='semester'
              value={semester}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <button type='submit' className='register-button'>
            Submit
          </button>
        </form>
        <p>
          <Link to='/list-courses'>View All Courses</Link>
        </p>
      </section>
    </Fragment>
  );
}
