import React, {useState} from 'react';
import CoreLayout from "../components/coreLayout";
import NavBar from "../shared-components/NavBar";
import {useRouter} from 'next/router';

// Chakra
import {Button, Input, Box, Heading, Container} from '@chakra-ui/react';
import GetUsers from "../search-components/GetUsers";

export default function Search() {
    const [searchQuery, changeQuery] = useState("")
    const {query} = useRouter();

    return (
        <CoreLayout>
            <Container maxW={"container.lg"}>
                <GetUsers props={query}/>
            </Container>
        </CoreLayout>
    );
}
