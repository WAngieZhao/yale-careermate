import {gql, useMutation} from "@apollo/client";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from 'react';
import {GoogleLogin} from 'react-google-login';

type LoginProps = {
    // logIn : Function;
}

// reference: https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
export const GoogleSSO = (props: LoginProps) => {
    const router = useRouter();
    const toast = useToast();

    const [loginWithGoogle, {loading: loginLoading}] = useMutation(gql`
        mutation googleLogin($token: String!) {
            googleLogin(token: $token) {
                id
                email
            }
        }
    `, {
        onError: err => {
            toast({
                title: "Failed to login.",
                description: err.message,
                status: "error"
            });
        }
    })

    return (
        <span className="authButton">
            <GoogleLogin
                clientId={(String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID))}
                // render={renderProps => (
                //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                //         Login with Google
                //     </button>)}
                onSuccess={(res: any) => {
                    console.log(res)
                    loginWithGoogle({
                        variables: {
                            token: res.tokenObj.id_token
                        }
                    }).then((res) => {
                        console.log(res.data.googleLogin)
                        console.log('Logged in—pushing to login');
                        // router.push(`/user/${res.data.googleLogin.id}`);
                        router.push('/search')
                    }).catch(err => {
                        console.log(err);
                    });
                }}
                onFailure={(err) => {
                    console.log(err);
                }}
                // cookiePolicy={'single_host_origin'}
                autoLoad={false}
            />
        </span>);
};







