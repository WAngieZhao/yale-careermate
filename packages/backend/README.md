# Apartmate Backend Development

## FAQ

#### .js extension

For all Typescript imports, you MUST include the .js file extension. Otherwise, the code will fail to link when you run it. 

E.g. you have to type `import {config} from "./config.js";`. You cannot type `import {config} from "./config";` without the .JS extension.

## Setup

- Create a `.env` file under `/backend` directory, fill it with your environment variables
- An example is like this:
```
PORT=3001
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/apartmate
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=potato123
GOOGLE_CLIENT_ID=<Our Google ID>
S3_BUCKET=cs3891-apartmate
S3_KEY=AKIAT6DX7YSMBJF6AZUY
S3_SECRET=<Our S3 Secret>
```

(Note that the MongoDB connection string MUST have the port 27017)

## MongoDB

- Create and start a local mongodb database. The installation steps are found [here](https://docs.mongodb.com/manual/installation/). The MongoDB server can be running in the background of your computer; you don't have to turn it on and off every time.

## Start the server

### Step 1

- run `yarn install` from the root directory

### Step 2
- run `yarn dev` from the root directory
- The backend and frontend will both automatically reload with changes in your code.

### Step 4

- You can now go to [this endpoint](http://localhost:8080/graphql) to try some graphql!
