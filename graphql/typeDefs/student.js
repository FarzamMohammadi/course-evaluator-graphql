const { gql } = require('apollo-server-express');

const course = gql`
  type Student {
    _id: ID
    studentNumber: String!
    password: String!
    fname: String
    lname: String
    address: String
    city: String
    email: String!
    program: String
  }

  type Query {
    getAllStudents: [Student!]!
    getStudentById(id: ID!): Student!
  }

  type Mutation {
    createStudent(
      studentNumber: String!
      password: String!
      fname: String
      lname: String
      address: String
      city: String
      email: String!
      program: String
    ): Student!
  }
`;

module.exports = course;
