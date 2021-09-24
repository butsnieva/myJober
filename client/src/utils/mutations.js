import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;


export const ADD_JOB = gql`
  mutation addJob(
    $title: String
    $price: String
    $description: String
    $location: String
  ) {
    addJob(
      title: $title
      price: $price
      description: $description
      location: $location
    ) {
      _id
      title
      price
      description
      location
      firstName
      lastName
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation updateJob(
    $jobId: ID!
    $title: String
    $price: String
    $description: String
    $location: String
  ) {
    updateJob(
      jobId: $jobId
      title: $title
      price: $price
      description: $description
      location: $location
    ) {
      _id
      title
      price
      description
      location
    }
  }
`;



export const REMOVE_JOB = gql`
  mutation removeJob($jobId: ID!) {
    removeJob(jobId: $jobId) {
      _id
      jobs {
        _id
        title
        description
        price
      }
    }
  }
`


