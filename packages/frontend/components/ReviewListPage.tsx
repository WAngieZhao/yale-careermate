import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import Link from 'next/link';
import {Container, Button, FormControl, FormLabel, Box, Input, Text, HStack} from "@chakra-ui/react";
import SingleReview from "./SingleReview";

type pageProps = {
    items: Array<Object>,
    currPage: number,
    itemLimit: number
}

export default function ReviewListPage({items, currPage, itemLimit}: pageProps) {
    const [reviews, setCurItems] = useState<Array<Object>>([]);

    useEffect(() => {
        const offset = currPage * itemLimit;
        const getList = (curr: number, limit: number) => {
            setCurItems(items.slice(offset, offset + limit));
        };

        getList(currPage, itemLimit);
    }, [currPage, itemLimit, items]);


    return (
        <Box w={"full"}>
            {reviews.map((review: any, index: number) => {
                // single review here
                return <SingleReview review={review} key={index}/>;
            })}
        </Box>
    )
}
