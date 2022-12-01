import React from 'react';
import { VStack, Heading, Box, HStack } from '@chakra-ui/react';
import Image from 'next/image'
import UserSearchBar from '../search-components/userSearchBar'
import logo from "../assets/cm_full_logo.png";
import hero from "../assets/main_page.png";

export default function Home () {
    return (
    <Box w={"100%"} p={5}>
        <VStack w="full" h="full">
                <HStack w="full" h="full" align="center" justify="center">
                    <Box w='450px' mt='30px'>
                        <Image src={logo} alt="careermate full logo"/>
                    </Box>
                </HStack>
                <VStack w="full">
                    <Box w="50%" >
                        <Heading fontSize={'2xl'} pt="2%" pb="1%">Lets find your CareerMate!   </Heading>
                        <UserSearchBar/>
                    </Box>
                    <Box w="50%">
                        <Image src={hero} alt="careermate hero image"/>
                    </Box>
                </VStack>
        </VStack>
    </Box>
    )}
