import axios from "axios";
import {authModel} from "../graphql/models/authModel.js";

export const facebookAuthRouter = (app) => {

    app.post("/auth/facebook", async (req, res, next) => {
        const {token} = req.body;

        try {
            const {data} = await axios({
                url: 'https://graph.facebook.com/me',
                method: 'get',
                params: {
                    fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                    access_token: token,
                },
            });
            // console.log(data); // { id, first_name, last_name }


            // store user information in the database here if first time logging in

            // TO DO: Get current user and store the auth to the user profile
            // TO DO: Check if user exists

            // store user information in the database
            const auth = new authModel({
                type: "facebook",
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            });
            await auth.save();

            // get user information from database


            // prepare information to send to the frontend
            const {id, first_name, last_name} = data


            console.log(data)
            res.status(201)

            // send user information
            res.json(data);
        } catch (e) {
            console.log(e);
            return next(e);
        }
    });
};
