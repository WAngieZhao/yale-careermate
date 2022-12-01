# Careermate Backend Development

## FAQ

#### .js extension

For all Typescript imports, you MUST include the .js file extension. Otherwise, the code will fail to link when you run it. 

E.g. you have to type `import {config} from "./config.js";`. You cannot type `import {config} from "./config";` without the .JS extension.

## Setup

- Create a `.env` file under `/backend` directory, fill it with your environment variables
- An example is like this:
```
PORT=8080
MONGO_USERNAME=admin
MONGO_PASSWORD=admin
NODE_ENV=development
MONGODB_URL=mongodb+srv://admin:admin@cluster0.duu9tqt.mongodb.net/?retryWrites=true&w=majority
REACT_APP_GOOGLE_CLIENT_ID=539193876-qgqjn7o8gkgui54a86c9sdpbmo2o2lnv.apps.googleusercontent.com
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=session-secret
S3_BUCKET=cs3891-careermate
S3_KEY=AKIAT6DX7YSMBJF6AZUY
S3_SECRET= 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

```


## Start the server

### Step 1

- run `yarn install` from the root directory

### Step 2
- run `yarn dev` from the root directory
- The backend and frontend will both automatically reload with changes in your code.

### Step 3

- You can now go to [this endpoint](http://localhost:8080/graphql) to try some graphql!
