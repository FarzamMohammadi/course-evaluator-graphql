import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Courses from './components/courses/AddCourse';
import ListCourses from './components/courses/ListCourses';
import ListAttendees from './components/courses/ListAttendees';
import ListStudents from './components/students/ListStudents';
import setAuthToken from './utils/setAuthToken';

function setAuth() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
}

const client = new ApolloClient({
  // uri: "/graphql",
  uri: 'http://localhost:5000/graphql',
});

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
      <ApolloProvider client={client}>
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
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/course'>
              <Route path=':id' element={<Courses />} />
              <Route path='' element={<Courses />} />
            </Route>
            <Route exact path='/list-courses' element={<ListCourses />} />
            <Route
              exact
              path='/list-attendees/:id'
              element={<ListAttendees />}
            />
            <Route exact path='/list-students' element={<ListStudents />} />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }
}
