import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

import {Box, Input, Button, Text, HStack, Spacer, ButtonGroup, Spinner, Center,} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';
import UserSearchResultPage from "./userSearchResultPage";

export default function GetUsers({props}: { props: any }) {
    const [items, setUserList] = useState<Array<Object>>([]);
    const LIMIT = 5;
    const [pagesQuantity, setPagesQuantity] = useState<any>(0);
    const [currPage, setCurrPage] = useState(1);
    const [foundNum, setFoundNum] = useState(-1);


    const ADVANCED_USER_QUERY = gql`
        query advancedUserFuzzySearch($searchTerm: String!) {
            advancedUserFuzzySearch(searchTerm: $searchTerm) {
                id
                email
                name
                contact_email
                status
                company
            }
        }
    `;

    const [advancedSearch, {error: error2, data: data2, loading}] = useLazyQuery(ADVANCED_USER_QUERY);

    useEffect(() => {
        // console.log("in the effect");
        if (Object.keys(props).length === 0) return;

        // console.log(props);
        advancedSearch({
            variables: {
                searchTerm: props.searchTerm ? props.searchTerm : ""
            }
        }).then((result) => {
            console.log(result.data)
            setUserList(result.data.advancedUserFuzzySearch);
            setFoundNum(result.data.advancedUserFuzzySearch.length);
            const pagesTotal = Math.ceil(result.data.advancedUserFuzzySearch.length / LIMIT);
            setPagesQuantity(pagesTotal);
            setCurrPage(1);
        })
            .catch(e => {
                console.log("there is an error")
                console.log(props.required)
                console.log(e.message)
            });

    }, [props]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currPage])

    const getPages = (page: number) => {
        let list = [];
        let bottom = Math.floor((page - 1) / 10) * 10;
        for (let i = bottom; i < bottom + 10 && i < pagesQuantity; i++) {
            list.push(i + 1);
        }
        return list;
    }

    const adjustPage = (page: number) => {
        setCurrPage(page);
    }

    const selectPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // console.log((e.target as HTMLElement).innerHTML)
        setCurrPage(parseInt((e.target as HTMLElement).innerHTML))
        // window.scrollTo(0, 0);
    }

    return (
        <Box>
            {foundNum > 0 ? <Text my={2}>{`Found: ${foundNum}`}</Text> : null}
            {loading ?
                <Center> <Spinner size='xl'
                                  thickness='3px'
                                  speed='0.3s'
                                  emptyColor='gray.200'
                                  color='brand.500'
                /></Center>
                : null}
            {/*user list*/}
            {foundNum === 0 && !loading ?
                <Box>
                    <Text fontSize={"sm"} pt='5%'>No results found.</Text>
                </Box> : null}
            <UserSearchResultPage items={items} currPage={currPage - 1} itemLimit={LIMIT}/>
            {/*page buttons*/}
            <Box>
                {items.length !== 0 ? <HStack mb={20}>
                    <Text w={"12%"} pl={3}>{`Page ${currPage}/${pagesQuantity}`}</Text>
                    <ButtonGroup w={"88%"}>
                        <Button bg="white" onClick={() => adjustPage(1)} disabled={currPage === 1}>
                            <ArrowLeftIcon/>
                        </Button>
                        <Button bg="white" onClick={() => adjustPage(currPage - 1)} disabled={currPage === 1}>
                            <ChevronLeftIcon/>
                        </Button>

                        {getPages(currPage).map((num) => {
                            return <Button
                                key={`page_num_${num}`}
                                // w={"10%"}
                                w={8}
                                onClick={e => selectPage(e)}
                                color={currPage === num ? "brand.600" : "brand.300"}
                                variant='link'>
                                {num}
                            </Button>
                        })}

                        <Spacer/>
                        <Button bg="white" onClick={() => adjustPage(currPage + 1)}
                                disabled={currPage === pagesQuantity}>
                            <ChevronRightIcon/>
                        </Button>
                        <Button bg="white" onClick={() => adjustPage(pagesQuantity)}
                                disabled={currPage === pagesQuantity}>
                            <ArrowRightIcon/>
                        </Button>
                    </ButtonGroup>
                </HStack> : null}
            </Box>
        </Box>
    )
}
