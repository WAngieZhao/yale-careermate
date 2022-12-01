import {AuthenticationError, ValidationError} from "apollo-server-express";
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
        currentUser: async (parent, _, {user}) => {
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
        advancedUserFuzzySearch: async (parent, {searchTerm}, {models: {userModel}}, info) => {
            return await userModel.fuzzySearch(searchTerm).exec();
        },
    },
    Mutation: {
        createUser: async (parent, {email, name}, {models: {userModel}}, info) => {
            const user = await userModel.create({email, name, contact_email: email});
            return user;
        },
        updateUserProfile: async (parent, {id, name, contact_email, company, status}, {session}) => {
            console.log("the session is ",session)
            // validate user: a user can only edit his/her own profile
            if (!session.user || (session.user && id != session.user._id)){
                console.log("Not Authorzied")
                throw new AuthenticationError('You can only edit your profile.')
            }          
            console.log("Authorzied!")
            
            // validate new contact email
            const new_email = contact_email
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!re.test(new_email)) {
                throw new ValidationError('Your new contact email should be a valid email address.')
            }

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
            const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();

            let user = await userModel.findOne({email: payload.email}).exec();
            if (user == null) {
                const email = payload.email
                if (email.endsWith('@yale.edu')) {
                    user = await userModel.create({
                        email: payload.email,
                        name: payload.name,
                        contact_email: payload.email,
                        picture: payload.picture
                    });
                    // console.log('created profile for ' + user.email)
                } else {
                    throw new ValidationError('Please login with yale.edu email.')
                }
            }

            // Create the Google login
            // @ts-ignore
            session.user = user;
            return user
        },
        googleLogout: async (parent, _, {user, session}) => {
            session.user = undefined;
            return user;
        }
    },
    User: {
        id: (parent) => {
            return parent._id;
        },
    },
};
