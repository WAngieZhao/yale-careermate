import * as dotenv from 'dotenv';

dotenv.config();

// Provides a standardized way for us to keep track of environmental variables
// and also for us to keep track of what variables we need to remember for deployment
export const config = {

    PRODUCTION: process.env['NODE_ENV'] === 'production',
    DEVELOPMENT: process.env['NODE_ENV'] !== 'production',

    SESSION_SECRET: <string>process.env['SESSION_SECRET'], // Express session cookie server
    SESSION_COOKIE_DOMAIN: <string>process.env['SESSION_COOKIE_DOMAIN'], // Domain to set cookies to in production

    PORT: <string>process.env['PORT'], // Port we're deploying the backend on

    MONGODB_URL: <string>process.env['MONGODB_URL'], // URI for connecting to our Mongo instance

    FRONTEND_URL: <string>process.env['FRONTEND_URL'], // URL where our frontend will be deployed

    GOOGLE_CLIENT_ID: <string>process.env['GOOGLE_CLIENT_ID'],

    S3_KEY: <string>process.env['S3_KEY'],
    S3_SECRET: <string>process.env['S3_SECRET'],
    S3_BUCKET: <string>process.env['S3_BUCKET']

};
