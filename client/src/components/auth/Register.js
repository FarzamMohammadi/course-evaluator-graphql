import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import './auth.css';

export default function Register(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentNumber: '',
    fname: '',
    lname: '',
    address: '',
    city: '',
    phoneNumber: '',
    program: '',
    password: '',
    email: '',
  });

  const {
    studentNumber,
    fname,
    lname,
    address,
    city,
    phoneNumber,
    program,
    password,
    email,
  } = formData;

  async function handleSubmit(e) {
    e.preventDefault();
    const registerPromise = await register(formData).then(function (
      isRegistered
    ) {
      if (isRegistered) {
        alert('Account Created!');
        navigate('/');
      }
    });
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log into Your Account
        </p>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Student Number:*</p>
            <input
              type='text'
              placeholder='30110940'
              name='studentNumber'
              value={studentNumber}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Frist Name:</p>
            <input
              type='text'
              placeholder='Billy'
              name='fname'
              value={fname}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Last Name:</p>
            <input
              type='text'
              placeholder='Bobbilson'
              name='lname'
              value={lname}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Address:</p>
            <input
              type='text'
              placeholder='1928 Yonge street'
              name='address'
              value={address}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>City:</p>
            <input
              type='text'
              placeholder='Toronto'
              name='city'
              value={city}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Phone Number:</p>
            <input
              type='text'
              placeholder='6471231234'
              name='phoneNumber'
              value={phoneNumber}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Program:</p>
            <input
              type='text'
              placeholder='Software Eng'
              name='program'
              value={program}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Email:*</p>
            <input
              type='email'
              placeholder='hello@react.com'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>Password:*</p>
            <input
              type='password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type='submit' className='register-button'>
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to='/'>Login</Link>
        </p>
      </section>
    </Fragment>
  );
}
