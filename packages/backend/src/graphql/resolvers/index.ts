import {GraphQLUpload} from "graphql-upload";
import {reviewResolver} from './reviewResolver.js';
import {userResolver} from './userResolver.js';
import {authResolver} from "./authResolver.js";
import {mergeResolvers} from "@graphql-tools/merge";
import {buildingResolver} from "./buildingResolver.js";

export const resolvers = mergeResolvers([
    {
        Upload: GraphQLUpload
    },
    reviewResolver,
    userResolver,
    authResolver,
    buildingResolver
]);
// export default [userResolver, reviewResolver];
