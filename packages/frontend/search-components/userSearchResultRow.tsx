/**
 * Created by yuzheww (Yuzhe Wang) on 2/28/22.
 */
import Image from 'next/image'
import {Text, Box, HStack, Container, Button, Image as ChakraImage} from "@chakra-ui/react"
import Link from "next/link";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import image from "../assets/building_image.png";
import React from 'react';



type UserBasicProps = {
    id: string,
    email: string
    name: string
    contact_email: string
    status: string
    company: string
    picture: string
}


export default function UserSearchResultRow(props: UserBasicProps) {

    let {id, email, name, contact_email, status, company, picture} = props;
    return (
        <Box p={2} borderWidth={'3px'} borderRadius={6} m={4} _hover={{bg: "gray.50"}}>
            <HStack alignItems={"flex-start"} wrap={"wrap"}>
                <Box p={2} w={"60%"}>
                    <Box>
                        <Text fontSize={"3xl"} textTransform="uppercase">{name}</Text>
                        <Text fontSize={"2xl"}>{`${email}, ${contact_email}, ${company}`}</Text>
                    </Box>
                    <Box mt={3} ml={2}> <Link href={`/user/${id}`} passHref={true}><Button
                        variant='link' rightIcon={<ArrowForwardIcon/>}>Read more</Button></Link></Box>
                </Box>
                {/*<Box w={350} py={3}>*/}
                {/*    {photos.length > 0 ?*/}
                {/*        <ChakraImage width={350} height={"100%"} src={photos[0]} alt={"building image"}/> :*/}
                {/*        <Image layout="responsive" src={image} alt={"building image"}/>}*/}
                {/*</Box>*/}
            </HStack>
        </Box>
    );
}
