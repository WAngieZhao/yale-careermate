/**
 * Created by yuzheww (Yuzhe Wang) on 03/08/22.
 */

import {Box, Button, HStack} from '@chakra-ui/react';
import Image from "next/image";
import Link from "next/link";
import icon from '../assets/apartmate_icon.png';

export default function NavBar() {


    return (
        <HStack w={"100%"} p={5}>
            <Link href="/" passHref={true}>
	            <Box w='50px' h='10'>
		            <button>
			            <Image src={icon} alt="Apartmate icon logo"/>
		            </button>
	            </Box>
            </Link>
	        <Link href="/auth/register" passHref={true}>
		        <Button colorScheme='brand'><a>Join now</a></Button>
	        </Link>
	        <Link href="/auth/login" passHref={true}>
		        <Button colorScheme='brand' variant="outline"><a>Login</a></Button>
	        </Link>
        </HStack>
    );
}
