import React from 'react';

import FacebookLogin from 'react-facebook-login';


type LogoutProps = {
    logOut: Function;
}


// reference: https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
// export const FacebookLoginButton = (props: LoginProps) => {
export const LogoutButton = (props : LogoutProps) => {
    const handleLogout = () => {
        props.logOut();
    }

    return (
        <p>
            <button onClick={handleLogout}> Logout </button>
        </p>);
};

