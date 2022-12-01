# CareerMate

### Project Description
CareerMate is a website for Yale students to connect for career opportunities. Yale students will be able to use their school email to create their profiles and share their contact information on the website for public views. They will also be able to search for possible contacts to ask for referrals, etc. 

### Project Structure
#### Pages
- Main page
- Signup and login page
- User profile page
- Search result page

#### Basic function details
- Main page
  - Search bar
  - Navigation bar with login
- Signup and login page
  - Signup 
  - Login 
  - Using Google OAuth
- User profile page (editable if logged in)
  - Name
  - Email (contact email / yale email)
  - Status (current student/ alum)
  - Current company (optional)
  - Profile picture (tentative)
- Search result page
  - Display research result
  - Clickable search result to User profile page

### Tech Stack
We decided to use a complete new tech stack to increase the difficulty of our project since we are all grad students. Each one of us proposed a technology framework that the rest of the team has never worked with before so everyone of us get the chance to learn something new and implement with it. 
#### Backend:
- mongoDB (mongoose)
- GraphQL (Apollo)

#### Frondend:
- Next.js (React)
- Chakra UI
- Typescript

### Running project

#### Environmental Variables
1. CD to the `/packages/frontend/` directory.
Create a `.env.local` file in the `frontend` directory. Place the following values into it:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=539193876-qgqjn7o8gkgui54a86c9sdpbmo2o2lnv.apps.googleusercontent.com
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

2. CD to the `/packages/backend/` directory.
Create a `.env` file under `/backend` directory. Place the following values into it:
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

- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install).
- CD to the root directory, run `yarn dev`. This will start up a single process that continually watches the typescript in all three modules for changes, auto recompiles, and auto starts a development server.
