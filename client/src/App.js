import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Courses from './components/courses/AddCourse';
import ListCourses from './components/courses/ListCourses';
import ListAttendees from './components/courses/ListAttendees';
import ListStudents from './components/students/ListStudents';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

function setAuth() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
}

export default class App extends Component {
  constructor() {
    super(setAuth());

    this.state = {
      isAuthenticated: false,
      token: '',
    };
    this.handleAuthenticationChange =
      this.handleAuthenticationChange.bind(this);
  }
  handleAuthenticationChange = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };
  handleTokenChange = (token) => {
    this.setState({ token });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Login
                isAuthenticated={this.state.isAuthenticated}
                token={this.state.token}
                onIsAuthChange={this.handleAuthenticationChange}
                onTokenChange={this.handleTokenChange}
              />
            }
          />
          <Route
            exact
            path='/register'
            element={<Register isAuthenticated={this.state.isAuthenticated} />}
          />
          <Route exact path='/course'>
            <Route
              path=':id'
              element={<Courses isAuthenticated={this.state.isAuthenticated} />}
            />
            <Route
              path=''
              element={<Courses isAuthenticated={this.state.isAuthenticated} />}
            />
          </Route>
          <Route
            exact
            path='/list-courses'
            element={
              <ListCourses isAuthenticated={this.state.isAuthenticated} />
            }
          />
          <Route
            exact
            path='/list-attendees/:id'
            element={
              <ListAttendees isAuthenticated={this.state.isAuthenticated} />
            }
          />
          <Route
            exact
            path='/list-students'
            element={
              <ListStudents isAuthenticated={this.state.isAuthenticated} />
            }
          />
        </Routes>
      </Router>
    );
  }
}
