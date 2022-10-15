import { gql } from 'apollo-server';

export const authSchema = `
  type Auth {
    id: ID!
    authType: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    # createAuth(type: String!, first_name: String, last_name: String, email: String!): Auth!
    
    linkGoogle(token: String!): User!
    registerUser(email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    logout: User
    loginWithGoogle(token: String!): User!
  }
`;
