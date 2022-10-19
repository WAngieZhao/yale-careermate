import {ApolloError, AuthenticationError} from "apollo-server-express";
import uploadS3File from "../../utils/uploadS3File.js";
import {authModel, googleAuthModel} from "../models/authModel.js";
import {finished} from 'stream/promises';
import AWS from "aws-sdk"
import {nanoid} from "nanoid";
import * as stream from "stream";
import {userModel} from "../models/userModel.js";
import {OAuth2Client} from "google-auth-library";
import {config} from "../../config.js";


export const userResolver = {
    Query: {
        user: async (parent, {id}, {models: {userModel}}, info) => {
            const user = await userModel.findById({_id: id}).exec();
            return user;
        },
        userByEmail: async (parent, {email}, {models: {userModel}}, info) => {
            const user = await userModel.findOne({email: email}).exec();
            return user;
        },
        users: async (parent, args, {models: {userModel}}, info) => {
            const users = await userModel.find({}).exec();
            return users;
        },
        currentUser: async(parent, _, {user}) => {
            // console.log(session)
            return user;
        },
        advancedUserSearch: async (parent, {searchTerm}, {models: {userModel}}, info) => {
            const users = await userModel.aggregate([{
                $addFields: {
                    nameList: {
                        $concat: [
                            '$name',
                            ' ',
                            '$company'
                        ]
                    }
                }
            }, {
                $match: {
                    nameList: {
                        $regex: RegExp(searchTerm, 'i')
                    }
                }
            }]).exec();
            return users;
        },
    },
    Mutation: {
        createUser: async (parent, {email, name}, {models: {userModel}}, info) => {
            const user = await userModel.create({email, name, contact_email: email});
            return user;
        },
        updateUserProfile: async (parent, {id, name, contact_email, company, status}, {models: {userModel}}, info) => {
            // TODO: ValidationError for invalid email
            const user = await userModel.findByIdAndUpdate(id, {
                name: name,
                contact_email: contact_email,
                company: company,
                status: status
            });
            // returns unchanged user profile
            return user;
        },
        googleLogin: async (parent, {token}, {session}) => {
            // console.log(session)
            // console.log(token)
            // console.log(session)
            const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();

            // console.log(payload);


            let user = await userModel.findOne({email: payload.email}).exec();
            if (user == null) {
                user = await userModel.create({
                    email: payload.email,
                    name: payload.name,
                    contact_email: payload.email,
                    picture: payload.picture
                });
                console.log('created profile for '+ user.email)
            }


            // // Check if an authenticator exists
            // if (!(await googleAuthModel.exists({
            //     googleId: payload.sub
            // }))) {
            //     throw new AuthenticationError('Register an account first.');
            // }
            //
            // // Find the login model
            // const auth = await googleAuthModel.findOne({
            //     googleId: payload.sub
            // });
            //
            // const user = await userModel.findById(auth.user);
            //
            // console.log(auth);
            // console.log(user);

            // Create the Google login
            // @ts-ignore
            // session.user = user;
            // return user;
            session.user = user;
            // console.log(session)
            return user
        },
        googleLogout: async (parent, _, {user, session}) => {
            session.user = undefined;
            return user;
        }
        // updateThumbnail: async (parent, { thumbnail }, {session}) => {
        //     if (!session.user)
        //         throw new AuthenticationError('No user logged in');
        //
        //     const { createReadStream, filename, mimetype, encoding } = await thumbnail;
        //
        //     if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
        //         throw new ApolloError('Invalid file type.');
        //     }
        //
        //     const uploadRes = await uploadS3File(createReadStream, mimetype);
        //
        //     const location = uploadRes.Location;
        //
        //     session.user = await userModel.findOneAndUpdate({
        //         _id: session.user._id
        //     }, {
        //         thumbnail: location
        //     }, {
        //         new: true
        //     });
        //
        //     return { filename, mimetype, encoding };
        // },
    },
    User: {
        id: (parent) => {
            return parent._id;
        },
        // reviews: async ({ _id }, args, { models: { reviewModel } }, info) => {
        //     const reviews = await reviewModel.find({ author: _id }).exec();
        //     return reviews;
        // },
        // auths: async (parent, __, ctx, info) => {
        //     const auths = await authModel.find({ user: parent._id });
        //     return auths;
        // },
    },
};
