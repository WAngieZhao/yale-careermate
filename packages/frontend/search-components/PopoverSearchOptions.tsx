
import React, {useState} from 'react';
import {
    Input,
    Text,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody, VStack, Divider, LinkBox, HStack, Avatar, Popover
} from "@chakra-ui/react";

import NextLink from "next/link";
import useUserAutocomplete from "../components/useUserAutocomplete";

type Props = {
    setUserName: Function
}


export default function PopoverSearchOptions({setUserName} : Props) {
    const {searchTerm, setSearchTerm, users} = useUserAutocomplete(3);
    const [searchFocused, setSearchFocused] = useState(false);


    const handleBuildingNameChange = (e: string) => {
        console.log(e)
        setSearchTerm(e);
        setUserName(e);
    }


    return (
        <Popover
            isOpen={searchFocused && users.length > 0}
            autoFocus={false}
            closeDelay={1000}
            matchWidth
        >
            <PopoverTrigger>
                <Input
                    size={"md"}
                    bg={"gray.50"}
                    placeholder={"Name"}
                    color={"black"}
                    value={searchTerm}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onChange={e => handleBuildingNameChange(e.target.value)}
                >
                </Input>
            </PopoverTrigger>
            <PopoverContent
                w={"100%"}
                bg={"gray.50"}
                boxShadow={"md"}
                borderRadius={0}
            >
                <PopoverHeader>
                    <Text fontWeight={"bold"}>
                        Search Suggestions
                    </Text>
                </PopoverHeader>
                <PopoverBody p={0}>
                    <VStack
                        spacing={0}
                        divider={<Divider/>}
                        justifyContent={"flex-start"} alignItems={"flex-start"}
                    >
                        {users.map((b, index) =>
                            <NextLink key={index} href={`/user/${b.id}`}>
                                <LinkBox
                                    w={"100%"}
                                    py={2}
                                    px={4}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                            bg: "gray.100"
                                        }
                                    }}
                                >
                                    <HStack spacing={5} w={"100%"} justifyItems={"stretch"}>
                                        <Avatar size={"xs"} name={b.name}/>
                                        <Text fontWeight={"bold"}>
                                            {b.name}
                                        </Text>
                                        <Text textAlign={"right"} flexGrow={1}>
                                            {b.company}
                                        </Text>
                                    </HStack>
                                </LinkBox>
                            </NextLink>
                        )}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
