import React from 'react';

import {Box, Input, Text, HStack, Heading, Tag, Container} from "@chakra-ui/react";
import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'

type Props = {
    review: any
}

export default function SingleReview({review}: Props) {


    return (
        <Box borderWidth={'1px'} borderRadius={10} p={5} mx={5} my={8}>
            <Heading size="md">{`${review.building.buildingName} | ${review.bedNum} Bed / ${review.bathNum} Bath`}</Heading>
            <HStack spacing={8} color='brand'>
                <Text fontSize={"xl"} color='brand.400'>{`Overall: ${review.totalScore}`}</Text>
                <Text fontSize={"xl"} color='brand.400'>{`Security: ${review.secScore}`}</Text>
                <Text fontSize={"xl"} color='brand.400'>{`Environment: ${review.envScore} `}</Text>
            </HStack>
            <Text> {review.comment} </Text>
            <HStack spacing={6}>
                <Box>
                    <TriangleUpIcon/> {review.upVotes}
                </Box>
                <Box>
                    <TriangleDownIcon/> {review.downVotes}
                </Box>
            </HStack>

        </Box>
    )
}
