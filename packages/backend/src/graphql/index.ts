// import {mergeResolvers, mergeTypeDefs} from "@graphql-tools/merge";
// import {UserResolvers, UserTypeDefs} from "./definitions/user.js";
import {RestHandler} from "express-server-boilerplate";
import {ApolloServer} from "apollo-server-express";
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import {config} from "../config.js";
import mongoose from 'mongoose';
import {userModel} from './models/userModel.js';
import {schemas} from './schemas/index.js';
import {resolvers} from './resolvers/index.js';
import {graphqlUploadExpress} from "graphql-upload";

export const graphqlHandler: RestHandler = async app => {

    // // Import type definitions
    // const typeDefs = mergeTypeDefs([
    //     UserTypeDefs,
    //     // ... Our actual type defs
    // ]);
    //
    // const resolvers = mergeResolvers([
    //     UserResolvers,
    //     // ... Our actual resolvers
    // ]);

    app.use(graphqlUploadExpress());

    // Configure the server
    const server = new ApolloServer({
        // typeDefs: typeDefs,
        typeDefs: schemas,
        resolvers: resolvers,
        // dataSources: () => ({
        //
        // }),
        context: async ({req}) => {
            return {
                user: req.session.user,
                session: req.session,
                models: {
                    userModel
                },
            };
        },
        plugins: [
            // Enable the GraphQL playground on development but disable it on production
            config.PRODUCTION
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        debug: config.DEVELOPMENT
    });

    // Enable the server
    await server.start();
    // add middleware
    server.applyMiddleware({
        app,
        cors: false, // we'll handle the CORS using our own plugin
        path: '/graphql'
    });

    await mongoose.connect(config.MONGODB_URL);
    // app.listen(5000, () => {
    //     // mongoose.connect('mongodb://localhost:8081/GraphQL');
    //     mongoose.connect(config.MONGODB_URL);
    // });
};
