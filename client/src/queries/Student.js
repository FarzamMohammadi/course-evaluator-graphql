import { gql } from 'apollo-boost';

export const REGISTER_STUDENT = gql`
  mutation CreateStudent(
    $studentNumber: String!
    $password: String!
    $fname: String
    $lname: String
    $address: String
    $city: String
    $email: String!
    $program: String
    $phoneNumber: String
  ) {
    createStudent(
      studentNumber: $studentNumber
      password: $password
      fname: $fname
      lname: $lname
      address: $address
      city: $city
      email: $email
      program: $program
      phoneNumber: $phoneNumber
    )
  }
`;
