import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import Link from 'next/link';
import {Container, Button, FormControl, FormLabel, Box, Input, Text, HStack} from "@chakra-ui/react";
import UserSearchResultRow from "./userSearchResultRow";

type pageProps = {
    items: Array<Object>,
    currPage: number,
    itemLimit: number
}

export default function UserSearchResultPage({items, currPage, itemLimit}: pageProps) {
    const [currItems, setCurItems] = useState<Array<Object>>([]);

    useEffect(() => {
        const offset = currPage * itemLimit;
        const getList = (curr: number, limit: number) => {
            setCurItems(items.slice(offset, offset + limit));
        };

        getList(currPage, itemLimit);
    }, [currPage, itemLimit, items]);

    // const getToTop = () => {
    //     window.scrollTo(0, 0);
    //     return <></>;
    // }

    return (
        <Box w={"full"}>
            {currItems.map((user: any, index: number) => {
                return <UserSearchResultRow key={index} {...user}/>;
            })}
        </Box>
    )
}
