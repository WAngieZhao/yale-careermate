import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import Link from 'next/link';
import {Container, Button, FormControl, FormLabel, Box, Input, Text, HStack, Tag} from "@chakra-ui/react";

type Props = {
    children: string | JSX.Element | JSX.Element[],
    scheme: string
}

export default function FeatureTag({children, scheme}: Props) {


    return (
        <Tag px={3} mx={1} my={0.5} colorScheme={scheme} borderRadius={'full'}><Text fontSize={'sm'}>{children}</Text></Tag>
    )
}
