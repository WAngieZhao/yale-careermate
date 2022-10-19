import {GoogleLogout} from 'react-google-login';
import {useRouter} from "next/router";
import {useToast} from "@chakra-ui/react";


type LogoutProps = {
    logout: Function
}
export const GoogleSSOLogout = ({logout}: LogoutProps) => {
    const router = useRouter();
    const toaster = useToast();


    return (
        <span>
            <GoogleLogout
                clientId={(String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID))}
                buttonText="Logout"
                onLogoutSuccess={() => {
                    logout().then(() => {
                        router.reload()
                    }).catch((err: any) => {
                        console.log(err);
                        toaster({
                            title: "Error logging out",
                            description: "Something went wrong when logging you out.",
                        })
                    })
                }}
            />
        </span>);
};
