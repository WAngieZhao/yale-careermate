import NextLink from "next/link";
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery, gql, useMutation} from '@apollo/client';
import Link from 'next/link';
import CoreLayout from "../../components/coreLayout";
import NavBar from '../../shared-components/NavBar';
import {Heading, Button, Text, HStack, Spacer, Divider, Container, useToast, FormControl, RadioGroup, FormHelperText, FormLabel, Radio, Input, FormErrorMessage, Stack} from '@chakra-ui/react';
import {Box} from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form";

export default function DisplayUser() {
    const router = useRouter()
    const {userId} = router.query
    // TODO: use toast to notify users that they cannot edit someone else's profile
    const toast = useToast();


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
    const UPDATE_USER = gql`
    mutation updateUserProfile($id: ID!, $name: String!, $contact_email: String!, $company: String!, $status: String!) {
        updateUserProfile(id: $id, name: $name, contact_email: $contact_email, company: $company, status: $status) {
            id
            email
            name
            contact_email
            status
            company
        }
    }
`;

    // TODO: use this to update profile
    const [updateProfile] = useMutation(UPDATE_USER);

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {userId},
        skip: !router.isReady,
        nextFetchPolicy: "network-only"
    });


    // if (loading) return <p></p>;
    // if (error) return <p>There was an error loading the building data :( ${error.message}</p>;
    if (error) router.push('/search')
    // if (!data) return <p></p>
    console.log(data)
    //const user = data.user;



    const ADVANCED_USER_QUERY = gql`
        query advancedUserSearch($searchTerm: String!) {
            advancedUserSearch(searchTerm: $searchTerm) {
                id
                email
                name
                contact_email
                status
                company
            }
        }
    `;
    
    type FormData = {
        name: string;
        email: string;
        contactEmail: string;
        company: string;
        status: string
    }

    const {register, handleSubmit, formState: {errors},control} = useForm<FormData>();


    const onSubmit = handleSubmit((data:FormData) => {
        console.log(data)
         updateProfile({
             variables: {
                 id: userId,
                 name: data.name,
                 contact_email: data.contactEmail,
                 company: data.company,
                 status: data.status
             }
         }).then((data) => {
             toast({
                 title: "Edit successful",
                 status: "success"
             });
         }).catch((e) => {
             console.log("error exists:", e.message);
             toast({
                 title: "Failed to edit.",
                 description: e.message,
                 status: "error"
             });
         })
     });

    return (
        <CoreLayout>
            <Container maxW={"container.lg"}>
                {/*<a onClick={() => router.back()}>&#8592; Back to search results</a>*/}
                {/*TODO: design edit profile form, MUST add code inside the following {}*/}
                {!loading && !error && data && <>
                    <form onSubmit={onSubmit}>
                        
                            <FormLabel as='legend'>User Edit Form</FormLabel>
                            
                            <FormControl as='fieldset'>
                                <FormLabel>Name</FormLabel>
                                <Input defaultValue={data.user.name} type='text'
                                       {...register("name", { required: "Please enter your name." })} />
                            </FormControl>  
                            
                            <FormControl as='fieldset'>
                                <FormLabel>Email <FormHelperText>not editable</FormHelperText></FormLabel>
                                <Input defaultValue={data.user.email} type='email'
                                       {...register("email")} readOnly/>
                            </FormControl>
                            
                            <FormControl as='fieldset'>
                                <FormLabel>Contact Email</FormLabel>
                                <Input defaultValue={data.user.contact_email} type='email'
                                {...register("contactEmail")} />
                            </FormControl>

                            <FormControl as='fieldset'>
                                <FormLabel>Company</FormLabel>
                                <Input defaultValue={data.user.company} type='text'
                                {...register("company")} />
                            </FormControl>

                            
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={data.user.status}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl as='fieldset'>
                                        <FormLabel>Status</FormLabel>
                                        <RadioGroup  onChange={onChange} value={value}>
                                            <HStack spacing='24px'>
                                                <Radio value="true" >Student</Radio>
                                                <Radio value="false" >Graduated</Radio>
                                            </HStack>
                                        </RadioGroup>
                                    </FormControl>
                                )}
                                />

                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                            >
                                Submit
                            </Button>
                          
                    </form>
                    
                </>}



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
