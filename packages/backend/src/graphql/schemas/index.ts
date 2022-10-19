import {userSchema} from './userSchema.js';
import { gql } from 'apollo-server';
import {mergeTypeDefs} from "@graphql-tools/merge";

const linkSchema = `
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export const schemas = mergeTypeDefs([
    linkSchema,
    userSchema
]);
// export default [linkSchema, userSchema, reviewSchema];
