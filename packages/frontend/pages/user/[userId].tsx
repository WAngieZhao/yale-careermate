import NextLink from "next/link";
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import CoreLayout from "../../components/coreLayout";
import NavBar from '../../shared-components/NavBar';
import {Heading, Button, Text, HStack, Spacer, Divider, Container, useToast} from '@chakra-ui/react';
import {Box} from "@chakra-ui/react"
import {Image, Avatar, Center, Flex, Badge} from "@chakra-ui/react"

export default function DisplayUser() {
    const router = useRouter()
    const {userId} = router.query
    const GET_USER = gql`
        query GetUser($userId: ID!) {
            user(id: $userId) {
                id
                email
                name
                contact_email
                status
                company
                picture
            }
        }
	`;

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {userId},
        skip: !router.isReady,
        nextFetchPolicy: "network-only"
    });

    
    function validateStatus(status: string) {
        let curr_status
        if (status == "true") {
            curr_status = "Student"
        } else{
            curr_status = "Graduated"
        }
        return curr_status
    }

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>There was an error loading the building data :( ${error.message}</p>;
    if (error) router.push('/search')

    return (
        <CoreLayout>
            <Container maxW={"container.lg"}>
                {!loading && !error && data && <>
                    <Center h = "50vh" w='1000px'>
                    <Flex>
                    <Avatar size= '2xl' src= {data.user.picture} />
                    <Box ml='10'>
                        <Text fontSize='2xl' fontWeight='bold'>
                            {data.user.name}
                            <Badge ml='1' colorScheme='green'>
                                {validateStatus(data.user.status)}
                            </Badge>
                        </Text>
                        <br />
                        <Text fontSize='l'> <Text as='b'>Email : </Text>{data.user.email}</Text>
                        <br />
                        <Text fontSize='l'><Text as='b'>Contact Email : </Text>{data.user.contact_email}</Text>
                        <br />
                        
                            {data.user.company === "" ? <></> : <Text fontSize='l'> <Text as='b'>Company : </Text>{data.user.company}</Text>}
                        
                    </Box>
                    </Flex>
                    </Center>


                </>}

            </Container>
        </CoreLayout>
    )
}

