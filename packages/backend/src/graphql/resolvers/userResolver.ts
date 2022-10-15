import {ApolloError, AuthenticationError} from "apollo-server-express";
import uploadS3File from "../../utils/uploadS3File.js";
import {authModel} from "../models/authModel.js";
import {finished} from 'stream/promises';
import AWS from "aws-sdk"
import {nanoid} from "nanoid";
import * as stream from "stream";
import {userModel} from "../models/userModel.js";

export const userResolver = {
    Query: {
        user: async (parent, {id}, {models: {userModel}}, info) => {
            const user = await userModel.findById({_id: id}).exec();
            return user;
        },
        users: async (parent, args, {models: {userModel}}, info) => {
            const users = await userModel.find({}).exec();
            return users;
        },
        advancedUserSearch: async (parent, {searchTerm}, {models: {userModel}}, info) => {
            console.log(searchTerm)
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
            const empty = ''
            const user = await userModel.create({email, name, 'company': "test"});
            return user;
        },
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
