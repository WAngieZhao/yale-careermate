import React, {useState} from 'react';
import {GoogleLoginButton} from "./GoogleAuth";
import {FacebookLoginButton} from "./FacebookAuth";
import {LogoutButton} from "./LogoutButton";

import { VStack } from '@chakra-ui/react';

export const OauthBar = () => {

    // let [loggedIn, changeLoginStatus] = useState(false);
    //
    // const logIn = () => {
    //     changeLoginStatus(true);
    // }
    //
    // const logOut = () => {
    //     changeLoginStatus(false);
    // }

    return <div>
        <GoogleLoginButton/>
        <LogoutButton/>
    </div>;
}
