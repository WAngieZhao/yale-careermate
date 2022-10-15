import {GoogleAuth, OAuth2Client} from "google-auth-library";
import cors from "cors";
import {config} from "../config.js"
import {authModel} from "../graphql/models/authModel.js";
import mongoose from 'mongoose';


const corsOptions = {
    origin: '*',
    methods: ['POST'],
    optionsSuccessStatus: 204
}


export const googleAuthRouter = (app) => {
    const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

    // app.post("/auth/google", async (req, res, next) => {
    //     const {token} = req.body;
    //
    //     try {
    //         const ticket = await client.verifyIdToken({
    //             idToken: token,
    //             audience: config.GOOGLE_CLIENT_ID
    //         });
    //
    //         // console.log(ticket.getPayload());
    //
    //         const {given_name, family_name, email} = ticket.getPayload();
    //
    //         // TO DO: Get current user and store the auth to the user profile
    //         // TO DO: Check if user exists
    //
    //         // store user information in the database
    //         const auth = new authModel({
    //             type: "google",
    //             first_name: given_name,
    //             last_name: family_name,
    //             email: email,
    //         });
    //         await auth.save();
    //
    //         // prepare information to send to the frontend
    //         const info = {
    //             given_name, family_name, email,
    //         };
    //
    //         // console.log(info)
    //         res.status(201)
    //
    //         // send user information
    //         res.json(info);
    //     } catch (e) {
    //         console.log(e);
    //         return next(e);
    //     }
    // });
};
