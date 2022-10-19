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
import {SearchIcon} from "@chakra-ui/icons";


export default function UserSearchBar() {
    const [userName, setUserName] = useState('');
    const [msg, setMsg] = useState('');

    const router = useRouter();

    // this is used to get a list of building information
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userName === "") {
            setMsg("Please enter a name")
            return;
        }
        // console.log(buildingName)
        setMsg("");

        router.push(
            {
                pathname: '/search',
                query: {
                    searchTerm: userName,
                },
            }
        );
    };

    return (
        <Box w={"full"}>
            <form onSubmit={e => submitForm(e)}>
                <HStack>
                    <FormControl w={"90%"}>
                        <PopoverSearchOptions setUserName={setUserName}/>
                    </FormControl>
                    <Button colorScheme="brand" type="submit" w={"10%"}><SearchIcon/></Button>
                </HStack>
            </form>
            {msg ? <p>{msg}</p> : <p></p>}
        </Box>
    );
}
