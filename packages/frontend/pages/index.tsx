import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BuildingSearchBar from '../building-components/BuildingSearchBar'
import NavBar from "../shared-components/NavBar";
import icon from "../assets/apartmate_icon.png";
import logo from "../assets/apartmate_logo.png";
import {VStack, Heading, Container} from "@chakra-ui/react";
import Homepage from "../components/Home";

import {Button, Box} from '@chakra-ui/react';

const Home: NextPage = () => {
    return (
        <Box w={"100%"} height={"100%"} pl='5%' pr='5%'>
            <Head>
                <title>CareerMate</title>
                <meta name="description" content="Yale CareerMate website"/>
                {/*<link rel="icon" href="/favicon.ico"/>*/}
                <link rel="icon" href="/cm_logo.ico"/>
            </Head>
            <NavBar/>
            <Homepage />
        </Box>
    )
}

export default Home
