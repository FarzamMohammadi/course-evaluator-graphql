const { gql } = require('apollo-server-express');

const course = gql`
  type Mutation {
    loginUser(email: String!, password: String!): String!
  }
`;

module.exports = course;
