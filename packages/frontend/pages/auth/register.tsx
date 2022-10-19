import {gql, useMutation, useQuery} from '@apollo/client';

import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	VStack,
	Image,
	useToast
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import logo from '../../assets/apartmate_full_logo.png';
import useUser from "../../components/useUser";
import styles from '../../styles/Home.module.css'
import CareermateLogo from "../../components/careermateLogo";

interface SubmitValues {
	email: string
	password: string
}

export default function RegisterPage() {
	const router = useRouter();
	const toaster = useToast();

	const {user, userLoading, userError} = useUser();

	const {register, handleSubmit, formState: {isValid}} = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: ""
		}
	});

	useEffect(() => {
		if (user) {
			router.push('/account');
		}
	}, [user]);

	const [registerUser, {data, loading, error}] = useMutation(gql`
        mutation RegisterUser($email: String!, $password: String!) {
            registerUser(email: $email, password: $password) {
                id
            }
        }
    `, {
		onError: error => {
			toaster({
				title: "Error Registering",
				description: error.message
			})
		}
	});

	function submit(values: SubmitValues) {
		registerUser({
			variables: {
				email: values.email,
				password: values.password
			}
		}).then(() => {
			console.log('Successfully registered user. Pushing to user page.');
			router.push('/account');
		}).catch((err) => {
			console.log(err)
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
			<VStack w={"100%"} alignItems={"stretch"} justifyContent={"flex-start"} spacing={5}>
				<Box bg={"brand.500"} py={5}>
					<Container maxW={"container.xs"}>
						<Link href={"/"}>
							<CareermateLogo fill={"brand.50"}/>
						</Link>
					</Container>
				</Box>
				<Box>
					<Container maxW={"container.xs"}>
						<Heading size={"lg"}>Register</Heading>
					</Container>
				</Box>
				<Box>
					<Container maxW={"container.xs"}>
						<form onSubmit={handleSubmit(submit)}>

							<VStack>
								<Input
									type="text"
									placeholder="Email"
									{...register("email", {
										required: true
									})}
								/>
								<InputGroup size='md'>
									<Input
										pr='4.5rem'
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter password'
										{...register("password", {
											required: true
										})}
									/>
									<InputRightElement width='4.5rem'>
										<Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? 'Hide' : 'Show'}
										</Button>
									</InputRightElement>
								</InputGroup>

								<p>
									By clicking Agree &amp; Join, you agree to the
									<NextLink href='userAgreement' passHref>
										<Link color='brand.400'> ApartMate User Agreement</Link>
									</NextLink>,

									<NextLink href='privacyPolicy' passHref>
										<Link color='brand.400'> Privacy Policy</Link>
									</NextLink>, and

									<NextLink href='cookiePolicy' passHref>
										<Link color='brand.400'> Cookie Policy</Link>
									</NextLink>.
								</p>
								<Button colorScheme={"brand"} isDisabled={!isValid} isLoading={loading} type={"submit"}>Agree &amp; join </Button>
								<Button colorScheme="brand" variant='ghost'>Back</Button>
							</VStack>

							<p>Already on ApartMate?
								<b> <Link href="/auth/login" color='brand.400'>Login</Link></b>
							</p>
						</form>
					</Container>
				</Box>
			</VStack>
		</Box>
	</>
}
