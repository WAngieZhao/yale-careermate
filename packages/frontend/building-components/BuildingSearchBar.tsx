/**
 * Created by yuzheww (Yuzhe Wang) on 2/28/22.
 */

import React, {useState} from 'react';
import Link from 'next/link';
import {
    Button,
    FormControl,
    Box,
    Text,
    HStack,
} from "@chakra-ui/react";
import {useRouter} from 'next/router';
import PopoverSearchOptions from "./PopoverSearchOptions";


interface singleOption {
    buildingName: string;
    buildingAddress: string;
}

export default function BuildingSearchBar() {
    const [buildingName, setBuildingName] = useState('');
    const [msg, setMsg] = useState('');

    const router = useRouter();

    // this is used to get a list of building information
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (buildingName === "") {
            setMsg("Please enter a building")
            return;
        }
        // console.log(buildingName)
        setMsg("");

        router.push(
            {
                pathname: '/search',
                query: {
                    searchTerm: buildingName,
                },
            }
        );
    };

    return (
        <Box w={"full"}>
            {msg ? <p>{msg}</p> : <p></p>}
            <form onSubmit={e => submitForm(e)}>
                <HStack>
                    <FormControl w={"80%"}>
                        <PopoverSearchOptions setBuildingName={setBuildingName}/>
                    </FormControl>
                    <Button colorScheme="brand" type="submit" w={"20%"}>Search</Button>
                </HStack>
            </form>
            <Text fontSize={"sm"} pt='1'>{"Didn't find the building you are looking for?"} <b><Link
                href="/building/add"><a> Add a building
                here! </a></Link></b></Text>
        </Box>
    );
}
