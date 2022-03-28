const { gql } = require('apollo-server-express');

const course = gql`
  type Mutation {
    login(email: String!, password: String!): String!
  }
`;

module.exports = course;
