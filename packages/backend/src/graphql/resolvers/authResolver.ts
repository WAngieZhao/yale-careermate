import {AuthenticationError} from "apollo-server-express";
import {OAuth2Client} from "google-auth-library";
import {config} from "../../config.js";
import {authModel, googleAuthModel, passwordAuthModel} from "../models/authModel.js";
import bcrypt from "bcrypt";
import {userModel} from "../models/userModel.js";

export const authResolver = {
    Query: {
        async me(parent, _, {user}) {
            return user;
        }
    },
    Mutation: {
        // createAuth: async (parent, { type, first_name, last_name, email }, { models: { authModel } }, info) => {
        //     const auth = await authModel.create({ type, first_name, last_name, email });
        //     return auth;
        // },
        async registerUser(parent, {email, password}, {session}) {
            if (!password || password.length < 5) {
                throw new AuthenticationError("Password cannot be fewer than 5 characters.");
            }

            // Prevent duplicate emails
            if ((await userModel.exists({email}))) {
                throw new AuthenticationError("Email is already in use.");
            }

            // Hash and salt the password
            const salt = bcrypt.genSaltSync();
            const hashed = await bcrypt.hash(password, salt);

            // Create a user
            const user = await userModel.create({
                email
            });

            // Create a password auth method
            await passwordAuthModel.create({
                user,
                salt,
                hash: hashed
            });

            session.user = user;
            return user;
        },

        async loginUser(parent, {email, password}, {session}) {
            // Make sure the user exists
            if (!(await userModel.exists({
                email
            }))) {
                throw new AuthenticationError('User does not exist.');
            }

            // Validate the user
            const user = await userModel.findOne({email});
            const auth = await passwordAuthModel.findOne({
                user
            });

            if (!(await bcrypt.compare(password, auth.hash))) {
                throw new AuthenticationError('Invalid password.');
            }

            session.user = user;
            return user;
        },

        async loginWithGoogle(parent, {token}, {session}) {
            const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();

            console.log(payload);

            // Check if an authenticator exists
            if (!(await googleAuthModel.exists({
                googleId: payload.sub
            }))) {
                throw new AuthenticationError('Register an account first.');
            }

            // Find the login model
            const auth = await googleAuthModel.findOne({
                googleId: payload.sub
            });

            const user = await userModel.findById(auth.user);

            console.log(auth);
            console.log(user);

            // Create the Google login
            // @ts-ignore
            session.user = user;
            return user;
        },

        async linkGoogle(parent, {token}, {session}) {
            if (!session.user)
                throw new AuthenticationError('No user logged in');

            if (await googleAuthModel.exists({user: session.user}))
                throw new AuthenticationError('User already has their Google account linked.');

            const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();

            // Create the Google login
            await googleAuthModel.create({
                user: session.user,
                googleId: payload.sub,
                email: payload.email!,
                picture: payload.picture,
                name: payload.name
            });

            return session.user;
        },

        async logout(parent, _, {user, session}) {
            session.user = undefined;
            return user;
        }
    },
};
