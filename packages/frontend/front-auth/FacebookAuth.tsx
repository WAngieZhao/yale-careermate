import axios from "axios";
import React from 'react';

import FacebookLogin from 'react-facebook-login';


type LoginProps = {
    logIn: Function;
}


// reference: https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
// export const FacebookLoginButton = (props: LoginProps) => {
export const FacebookLoginButton = (props: LoginProps) => {

    const responseFacebook = async (facebookData: any) => {
        // console.log(facebookData);

        const res = await axios.post('/auth/facebook', {
            token: facebookData.accessToken
        }, {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
        });

        // const res = await fetch("http://localhost:8080/api/v1/auth/facebook", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         token: facebookData.accessToken
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // const data = await res.json();
        props.logIn();
        // props.logIn();
        console.log(res.data);
        // store returned user somehow
    }
    return (
        <span className="authButton">
            <FacebookLogin
                appId="5235568913142131"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends,email"
                callback={responseFacebook}
                icon="fa-facebook"
                textButton='Sign in with Facebook'
            />
        </span>);
};

