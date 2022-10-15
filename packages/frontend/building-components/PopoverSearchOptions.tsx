
import React, {useState} from 'react';
import {
    Input,
    Text,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody, VStack, Divider, LinkBox, HStack, Avatar, Popover
} from "@chakra-ui/react";

import useBuildingAutocomplete from "../components/useBuildingAutocomplete";
import NextLink from "next/link";

type Props = {
    setBuildingName: Function
}


export default function PopoverSearchOptions({setBuildingName} : Props) {
    const {searchTerm, setSearchTerm, buildings} = useBuildingAutocomplete(3);
    const [searchFocused, setSearchFocused] = useState(false);


    const handleBuildingNameChange = (e: string) => {
        console.log(e)
        setSearchTerm(e);
        setBuildingName(e);
    }


    return (
        <Popover
            isOpen={searchFocused && buildings.length > 0}
            autoFocus={false}
            closeDelay={1000}
            matchWidth
        >
            <PopoverTrigger>
                <Input
                    size={"md"}
                    bg={"gray.50"}
                    placeholder={"Building Name"}
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
                        Building Suggestions
                    </Text>
                </PopoverHeader>
                <PopoverBody p={0}>
                    <VStack
                        spacing={0}
                        divider={<Divider/>}
                        justifyContent={"flex-start"} alignItems={"flex-start"}
                    >
                        {buildings.map((b, index) =>
                            <NextLink key={index} href={`/buildings/${b.id}`}>
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
                                        <Avatar size={"xs"}/>
                                        <Text fontWeight={"bold"}>
                                            {b.buildingName}
                                        </Text>
                                        <Text textAlign={"right"} flexGrow={1}>
                                            {b.buildingAddress}
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
