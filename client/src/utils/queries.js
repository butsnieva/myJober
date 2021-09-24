import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      
      jobs {
        _id
        title
        description
        price
        location
      }
    }
  }
`;

export const QUERY_JOBS = gql`
   {
    jobs {
      _id
      title
      description
      firstName
      lastName
      price
    }
  }
`;

export const QUERY_USER = gql`
   {
    User {
      _id
      firstName
      lastName
      email
      jobs {
        _id
        title
        description
        price
        location
      }
    }
  }
`;