import {gql, useMutation, useQuery} from "@apollo/client";
// Chakra
import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    useToast,
    Image,
    VStack, Center, Container
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {useRouter} from "next/router";
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import logo from '../../assets/apartmate_full_logo.png';
import ApartmateLogo from "../../components/apartmateLogo";
import useUser from "../../components/useUser";
import {OauthBar} from '../../front-auth/OauthBar';
import PasswordInput from '../../shared-components/PasswordInput';
import styles from '../../styles/Home.module.css'
import hero from "../../assets/graphic_discussion.png";

interface ILoginValues {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const toast = useToast();

    const {user, userLoading, userError} = useUser();

    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        if (!userLoading && (!!user)) {
            router.push('/account');
        }
    }, [user, userLoading]);


    const [login, {loading}] = useMutation(gql`
        mutation LoginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
                email
            }
        }
    `, {
        fetchPolicy: "network-only"
    })

    function doLogin(values: ILoginValues) {
        login({
            variables: {
                email: values.email,
                password: values.password
            }
        }).then(() => {
            console.log('Logged in user.');
            router.push('/account');
        }).catch(err => {
            console.log(err);
            toast({
                title: "Login Error",
                description: err.toString(),
                status: "error"
            })
        })
    }

    const [showPassword, setShowPassword] = useState(false);

    return <>
        <Box
            key={"background imagae"}
            position={"absolute"}
            zIndex={-1}
            left={0}
            top={0}
            w={"100%"}
            h={"100vh"}
        >
            <Image
                w={"100%"}
                h={"100%"}
                src={"/assets/apartments.webp"}
                objectFit={"cover"}
                objectPosition={"center"}
                alt={"apartments"}
            />
        </Box>
        <Box
            bg={"gray.50"}
            w={["100%", 600, 500]}
            h={"100vh"}
        >
            <form onSubmit={handleSubmit(doLogin)}>
                <VStack w={"100%"} alignItems={"stretch"} justifyContent={"flex-start"} spacing={5}>
                    <Box bg={"brand.500"} py={5}>
                        <Container maxW={"container.xs"}>
                            <Link href={"/"}>
                                <ApartmateLogo fill={"brand.50"}/>
                            </Link>
                        </Container>
                    </Box>
                    <Box>
                        <Container maxW={"container.xs"}>
                            <Heading size={"lg"}>Login</Heading>
                        </Container>
                    </Box>
                    <Box>
                        <Container maxW={"container.xs"}>
                            <Input
                                type="text"
                                placeholder="Email"
                                {...register('email', {
                                    required: true
                                })}
                            />

                            {/*TODO: Put this back into its own component*/}
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Button colorScheme="brand" type={"submit"} isDisabled={!isValid} isLoading={loading}>Sign in</Button>

                            <NextLink href="forgotPassword" passHref>
                                <Link color='brand.400'>Forgot password?</Link>
                            </NextLink>

                            <OauthBar/>
                            <p>New to ApartMate?
                                <b> <Link href="/auth/register" color='brand.400'>Sign up</Link></b>
                            </p>
                        </Container>
                    </Box>
                </VStack>

            </form>
        </Box>
    </>
}
