import React from 'react';
import { VStack, Heading, Box, HStack } from '@chakra-ui/react';
import Image from 'next/image'
import BuildingSearchBar from '../building-components/BuildingSearchBar'
import logo from "../assets/apartmate_full_logo.png";
import hero from "../assets/graphic_hero_green.png";

export default function Home () {
    return (
    <Box w={"100%"} p={5}>
        <VStack w="full" h="full">
                <HStack w="full" h="full" align="center" justify="center">
                    <Box w='400px' mt='30px'>
                        <Image src={logo} alt="Apartmate full logo"/>
                    </Box>
                    {/* <a href="">ApartMate!</a> */}
                    {/* <Link href="/reviewForm" passHref={true}>
                        <Button>Leave a review</Button>
                    </Link> */}
                </HStack>
                <HStack w="full">
                    <Box w="50%">
                        <Heading fontSize={'2xl'} pb="5%">Lets find your perfect apartment!   </Heading>
                        <BuildingSearchBar/>
                    </Box>
                    <Box w="50%">
                        <Image src={hero} alt="Apartmate hero image"/>
                        {/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
                    </Box>
                </HStack>
        </VStack>
    </Box>
    )}
