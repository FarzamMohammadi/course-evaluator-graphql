import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import './auth.css';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../queries/Auth';

export default function Login(props) {
  let navigate = useNavigate();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const { password, email } = formData;

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    loginUser({
      variables: { email, password },
    })
      .then((res) => {
        const token = res.data.loginUser;
        localStorage.setItem('token', token);
        setAuthToken(token);
        props.onIsAuthChange(true);
        props.onTokenChange(token);
        navigate('/course');
      })
      .catch((err) => {
        alert('Could not log in');
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
        <h1>Login</h1>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Email:</p>
            <input
              type='email'
              placeholder='hello@react.com'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>Password:</p>
            <input
              type='password'
              placeholder=''
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type='submit' className='login-button'>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </section>
    </Fragment>
  );
}
