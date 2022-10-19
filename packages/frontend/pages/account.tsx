import {gql, useMutation, useQuery} from "@apollo/client";

import {
	Box,
	Button,
	Heading,
	Input,
	Link,
	Spinner,
	VStack,
	Text,
	Spacer,
	HStack,
	Container,
	VisuallyHiddenInput
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import logo from '../assets/apartmate_full_logo.png';
import PasswordInput from '../shared-components/PasswordInput';
import styles from '../styles/Home.module.css'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Avatar } from "@chakra-ui/react";
import { LockIcon, InfoOutlineIcon, EditIcon } from "@chakra-ui/icons";
import CoreLayout from "../components/coreLayout";
import useUser from "../components/useUser";
// import SingleReview from "../components/SingleReview";

export default function UserPage() {
	const router = useRouter();

	const {user, userLoading, userError, logout, refetchUser} = useUser();

	const hiddenFileInput = useRef(null);
	const [uploadThumbnail, {loading: thumbnailLoading}] = useMutation(gql`
        mutation($thumbnail: Upload!) {
        	updateThumbnail(thumbnail: $thumbnail) {
                filename
                mimetype
                encoding
            }
        }
	`, {
		onCompleted: () => {
			refetchUser();
		}
	});


	useEffect(() => {
		if (!userLoading && (!user || !user)) {
			router.push('/auth/login');
		}
	}, [user, userLoading, router]);

	return <>
		<CoreLayout>
			<Container maxW={"container.lg"}>
			<Box bg="gray.100" borderRadius="20" mb="5%" mt="5%" p="5%">
				{/*{userLoading && <Spinner/>}*/}
				{/*	{user && user.email && <>*/}
				{/*		<Avatar size="lg" name={user.email} src={user.thumbnail}/>*/}
				{/*		<Heading>Welcome, {user.email}</Heading>*/}
				{/*		/!* <Text>Current Residence: Elliston23</Text> *!/*/}
				{/*	</>}*/}
			</Box>
			<Heading>Account</Heading>
			<Text>Manage your account and settings here.</Text>
			<Tabs isFitted variant='enclosed' colorScheme='brand'>
				<TabList>
					<Tab><InfoOutlineIcon />&nbsp;Profile Information Settings</Tab>
					<Tab><EditIcon />&nbsp;Your reviews</Tab>
					<Tab><LockIcon />&nbsp;Login &#38; Security</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Heading>Personal Info</Heading>
						<Text>Manage your personal information here.</Text>
						<Heading>Personal Details</Heading>
						{userLoading && <Spinner/>}
						{user && <>
							<VStack alignItems={"flex-start"}>
                                <label>Update Thumbnail</label>
                                <Button onClick={(e) => {
	                                // @ts-ignore
	                                hiddenFileInput?.current?.click();
								}} isLoading={thumbnailLoading}>
	                                Select Thumbnail
								</Button>
                                <VisuallyHiddenInput
                                    type="file"
                                    accept={"image/png, image/jpeg"}
                                    ref={hiddenFileInput}
                                    onChange={(e) => {
										// @ts-ignore
										const files = Array.from(e.target?.files);

	                                    const fileUploaded = files[0];
										console.log(fileUploaded)
										uploadThumbnail({
											variables: {
												thumbnail: fileUploaded
											}
										})
										.catch(console.log);
                                    }}
                                    style={{display: 'none'}}
                                />
							</VStack>


							<label>Name</label>
							<Input value="Placeholder name" placeholder="Name" />
							<label>Email</label>
							<Input value={user.email} />
							<label>Current Residence</label>
							<Input value="Placeholder residence" placeholder="Current Residence" />
							<Button colorScheme="brand">Save Changes</Button>
						</>}
					</TabPanel>

					{/*<TabPanel>*/}
					{/*	<Heading>Your reviews</Heading>*/}
					{/*	<Text>Manage your posts here (deletion and editing coming soon).</Text>*/}
					{/*	{!user?.reviews && <Text>Looks like you havent created any posts yet!</Text>}*/}
					{/*	{user?.reviews &&*/}
					{/*		<Box>*/}
					{/*			<FormatReview reviews={user.reviews} />*/}
					{/*		</Box>*/}
					{/*	}*/}
					{/*</TabPanel>*/}

					<TabPanel>
						<Heading>Login &#38; Security</Heading>
						<Text> Manage your login and security settings here.</Text>
						<Heading>Password</Heading>
						<Text>Update your password here</Text>
						<label>Current Password</label>
						<Input />
						<label>New Password</label>
						<Input />
						<label>Confirm Password</label>
						<Input />

						{user && user.email && <>
							<Button colorScheme={"brand"} onClick={logout}>
								Logout
							</Button>
						</>}
						<Button>Delete account</Button>
					</TabPanel>
				</TabPanels>
			</Tabs>
			</Container>
		</CoreLayout>
	</>
}

const FormatReview = (reviews : any) => {
	return reviews.reviews.map ((review : any, index : number) => {
		return (
			<Box key={index}>
				{/*<SingleReview review={review} key={index}/>*/}
			</Box>
		)
	})
}
