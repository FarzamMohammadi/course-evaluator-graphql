const { gql } = require('apollo-server-express');

const course = gql`
  type Course {
    _id: ID
    code: String!
    name: String!
    section: String
    semester: String
    attendees: [Student]
  }

  type Query {
    getAllCourses: [Course!]!
    getCourseById(id: ID!): Course!
  }

  type Mutation {
    createCourse(
      code: String!
      name: String!
      section: String
      semester: String
      studentId: ID!
    ): Course!
    editCourse(id: ID!, studentId: ID!): Course!
  }
`;

module.exports = course;
