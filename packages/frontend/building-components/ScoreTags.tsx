import React from 'react';

import {Box, Input, Text, HStack, Tag} from "@chakra-ui/react";
import {CheckCircleIcon, StarIcon, UnlockIcon} from "@chakra-ui/icons";

type Props = {
    total: number,
    secure: number,
    environment: number
}

export default function ScoreTags({total, secure, environment}: Props) {


    return (
        <HStack spacing={3} flexWrap={"wrap"}>
            {/*total score*/}
            <HStack ml={1}>
                <Box ml={2} as={StarIcon} w={6} h={6} color="brand.500"/>
                <Text ml={1} fontSize="2xl">
                    <b>{total}</b>
                </Text>
                <Text ml={1} mr={5} fontSize="xl">
                    Overall
                </Text>
            </HStack>
            {/*security score*/}
            <HStack>
                <Box as={UnlockIcon} w={6} h={6} color="brand.500"/>
                <Text ml={1} fontSize="2xl">
                    <b>{secure}</b>
                </Text>
                <Text ml={1} fontSize="xl">
                    Security
                </Text>
            </HStack>
            {/*environment score*/}
            <HStack>
                <Box as={CheckCircleIcon} w={6} h={6} color="brand.500"/>
                <Text ml={1} fontSize="2xl">
                    <b>{environment}</b>
                </Text>
                <Text ml={1} fontSize="xl">
                    Environment
                </Text>
            </HStack>
        </HStack>
    )
}
