import {Box, Button, HStack} from '@chakra-ui/react';
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
            {/*<Link href="/auth/register" passHref={true}>*/}
            {/*    <Button colorScheme='brand'><a>Join now</a></Button>*/}
            {/*</Link>*/}
            {/*<Link href="/auth/login" passHref={true}>*/}
            {/*    <Button colorScheme='brand' variant="outline"><a>Login</a></Button>*/}
            {/*</Link>*/}
            {(!userLoading && !userError && !user) && <GoogleSSO/>}
            {user && <Box pt={'20px'} pl={'20px'}><GoogleSSOLogout logout={logout}/></Box>}

        </HStack>
    );
}
