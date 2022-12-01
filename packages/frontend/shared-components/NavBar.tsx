import {Box, Button, HStack, useToast} from '@chakra-ui/react';
import Image from "next/image";
import Link from "next/link";
import icon from '../assets/cm_logo.png';
import {GoogleSSO} from "../login-components/GoogleSSO";
import useUser from "../components/useUser";
import {GoogleSSOLogout} from "../login-components/GoogleSSOLogout";

export default function NavBar() {
    const {user, userError, userLoading, logout} = useUser();

    return (
        <HStack w={"100%"} p={5}>
            <Box pt={'20px'} pr={'10px'}>
                <Link href="/" passHref={true}>
                    <Box w='50px' h='10'>
                        <button>
                            <Image src={icon} alt="careermate icon logo"/>
                        </button>
                    </Box>
                </Link>
            </Box>
            {(!userLoading && !userError && !user) && <GoogleSSO/>}
            {user && <Box pt={'20px'} pl={'20px'}><GoogleSSOLogout logout={logout}/></Box>}

        </HStack>
    );
}
