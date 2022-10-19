import {GraphQLUpload} from "graphql-upload";
import {userResolver} from './userResolver.js';
import {mergeResolvers} from "@graphql-tools/merge";

export const resolvers = mergeResolvers([
    {
        Upload: GraphQLUpload
    },
    userResolver
]);
// export default [userResolver, reviewResolver];
