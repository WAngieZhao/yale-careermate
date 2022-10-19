import NextLink from "next/link";
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import CoreLayout from "../../components/coreLayout";
import NavBar from '../../shared-components/NavBar';
import {Heading, Button, Text, HStack, Spacer, Divider, Container, useToast} from '@chakra-ui/react';
import {Box} from "@chakra-ui/react"


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

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>There was an error loading the building data :( ${error.message}</p>;
    if (error) router.push('/search')
    // if (!data) return <p></p>
    console.log(data)
    // const user = data.user;

    return (
        <CoreLayout>
            <Container maxW={"container.lg"}>
                {/*<a onClick={() => router.back()}>&#8592; Back to search results</a>*/}
                {/*TODO: design user profile layout*/}
                {!loading && !error && data && <><Box>{data.user.email}</Box>
                    <Box>{data.user.name}</Box></>}

                {/*<HStack wrap={"wrap"}>*/}
                {/*    <Heading my={3} as='h1' size='3xl'>{building.buildingName}</Heading> <Spacer/>*/}
                {/*    <Link href={{*/}
                {/*        pathname: "/reviewForm",*/}
                {/*        query: {*/}
                {/*            building: building.id,*/}
                {/*            buildingName: building.buildingName*/}
                {/*        },*/}
                {/*    }} passHref={true}>*/}
                {/*        <Button colorScheme='brand'>Leave a review</Button>*/}
                {/*    </Link>*/}
                {/*</HStack>*/}

                {/*<Heading mt={2} as='h2' size='xl'>{building.buildingAddress}</Heading>*/}
                {/*<Box m={3}>*/}
                {/*    <ScoreTags total={building.totalScore} secure={building.secScore} environment={building.envScore}/>*/}
                {/*</Box>*/}


                {/*<Heading mt={5} as='h2' size='lg' color={"gray.500"}>Comments</Heading>*/}
                {/*<Divider p={1} mb={5}/>*/}
            </Container>
        </CoreLayout>
    )
}

// function renderFeatureList(featureList: string[]) {
//     return <ul>{renderFeatureListItems(featureList)}</ul>
// }
//
// function renderFeatureListItems(featureList: string[]) {
//     return featureList.map((feature: string, index: number) => (
//         <li key={index}>
//             {feature}
//         </li>
//     ))
// }
