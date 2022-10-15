// /**
//  * Created by jovialis (Dylan Hanson) on 1/30/22.
//  */
//
// import {ServerBoilerplate} from "express-server-boilerplate";
// import {ApolloServer} from "apollo-server";
// import {config} from "./config.js";
// import {graphqlHandler} from "./graphql/index.js";
//
// (async function () {
//
//     // Use a server builder so we don't have to worry about all the annoying middleware.
//     const server = new ServerBoilerplate();
//
//     // Base handler
//     server.handler(app => {
//         app.get('/', (req, res, next) => {
//             res.json({
//                 hello: 'world'
//             });
//         })
//     });
//
//     // GraphQL handler
//     server.handler(graphqlHandler);
//
//     // Start the server
//     server.start(config.PORT).then(() => {
//         console.log('Up and running on port ' + config.PORT);
//     });
//
// })();
//


/**
 * Created by jovialis (Dylan Hanson) on 1/30/22.
 */

import {ServerBoilerplate} from "express-server-boilerplate";
import {ApolloServer} from "apollo-server";
import {config} from "./config.js";
import {graphqlHandler} from "./graphql/index.js";
import {googleAuthRouter} from "./oauth/googleAuthRouter.js";
import {facebookAuthRouter} from "./oauth/facebookAuthRouter.js";
import MongoStore from "connect-mongo";
import session from "express-session";

(async function () {

    // Use a server builder so we don't have to worry about all the annoying middleware.
    const server = new ServerBoilerplate();

    server.cors({
        credentials: true,
        origin: [config.FRONTEND_URL]
    });

    // Express session handler
    ///////// NOTE: Adds a req.session object that persists across user requests.
    /////////       e.g. you can set req.session.user = {dylan: true} and it'll persist.
    server.handler(app => {
        app.use(session({
            secret: config.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: config.PRODUCTION,
                httpOnly: config.PRODUCTION,
                domain: config.PRODUCTION && config.SESSION_COOKIE_DOMAIN
            },
            store: MongoStore.create({
                mongoUrl: config.MONGODB_URL
            })
        }));
    });

    server.handler(googleAuthRouter);

    server.handler(facebookAuthRouter);

    // Base handler
    server.handler(app => {
        app.get('/', (req, res, next) => {
            res.json({
                hello: 'world'
            });
        })
    });

    // GraphQL handler
    server.handler(graphqlHandler);

    // Start the server
    server.start(config.PORT).then(() => {
        console.log('Up and running on port ' + config.PORT);
    });
})();

