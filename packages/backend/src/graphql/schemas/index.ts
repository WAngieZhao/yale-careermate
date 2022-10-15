import {userSchema} from './userSchema.js';
import {reviewSchema} from './reviewSchema.js';
import {authSchema} from './authSchema.js';
import { gql } from 'apollo-server';
import {mergeTypeDefs} from "@graphql-tools/merge";
import {buildingSchema} from "./buildingSchema.js";

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
    userSchema,
    reviewSchema,
    authSchema,
    buildingSchema
]);
// export default [linkSchema, userSchema, reviewSchema];
