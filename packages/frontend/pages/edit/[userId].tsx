import React from 'react';
import {useRouter} from 'next/router';
import {useQuery, gql, useMutation} from '@apollo/client';
import CoreLayout from "../../components/coreLayout";
import {
    Button,
    HStack,
    Container,
    useToast,
    FormControl,
    RadioGroup,
    FormHelperText,
    FormLabel,
    Radio,
    Input,
} from '@chakra-ui/react';
import {Controller, useForm} from "react-hook-form";

export default function DisplayUser() {
    const router = useRouter()
    const {userId} = router.query
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

    const [updateProfile] = useMutation(UPDATE_USER);

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {userId},
        skip: !router.isReady,
        nextFetchPolicy: "network-only"
    });

    if (error) router.push('/search')
    console.log(data)


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

    const {register, handleSubmit, formState: {errors}, control} = useForm<FormData>();


    const onSubmit = handleSubmit((data: FormData) => {
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
                                   {...register("name", {required: "Please enter your name."})} />
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
                            render={({field: {onChange, value}}) => (
                                <FormControl as='fieldset'>
                                    <FormLabel>Status</FormLabel>
                                    <RadioGroup onChange={onChange} value={value}>
                                        <HStack spacing='24px'>
                                            <Radio value="true">Student</Radio>
                                            <Radio value="false">Graduated</Radio>
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
            </Container>
        </CoreLayout>
    )
}
