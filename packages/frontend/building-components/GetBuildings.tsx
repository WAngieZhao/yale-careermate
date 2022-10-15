import React, {useState, useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

import {Box, Input, Button, Text, HStack, Spacer, ButtonGroup, Spinner, Center,} from "@chakra-ui/react";
import BuildingPage from "./BuildingPage";
import {ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';

export default function GetBuildings({props}: { props: any }) {
    const [items, setBuildingList] = useState<Array<Object>>([]);
    const LIMIT = 5;
    const [pagesQuantity, setPagesQuantity] = useState<any>(0);
    const [currPage, setCurrPage] = useState(1);
    const [foundNum, setFoundNum] = useState(-1);


    const ADVANCED_BUILDING_QUERY = gql`
        query advancedBuildingSearch($totalScore : Int!, $envScore : Int!, $secScore : Int!, $buildingName : String!, $buildingCity: String!, $buildingState : String!, $fields : [String!]!)  {
            advancedBuildingSearch(totalScore : $totalScore, envScore : $envScore, secScore : $secScore, buildingName: $buildingName, buildingCity: $buildingCity, buildingState: $buildingState, fields: $fields) {
                id
                buildingName
                buildingAddress
                buildingCity
                buildingState
                photos
                totalScore
                envScore
                secScore
                isDisFrd
                hasParking
                frontdesk
                concierge
                gatedCommunity
                EVCharging
                guestParking
                coveredParking
                reservedSpot
                freeParking
                cleaningService
                quietHours
                trashPickUp
                staffOnDuty
                maintenanceTeam
                microwave
                stove
                dishwasher
                fridge
                washer
                dryer
                AC
                cableInstalled
                wifiInstalled
                walkInCloset
                balcony
                gym
                pool
                elevator
                lounge
                mailRoom
                dogPark
            }
        }
    `;

    const [advancedSearch, {error: error2, data: data2, loading}] = useLazyQuery(ADVANCED_BUILDING_QUERY);

    useEffect(() => {
        // console.log("in the effect");
        if (Object.keys(props).length === 0) return;

        // console.log(props);
        advancedSearch({
            variables: {
                buildingName: props.searchTerm ? props.searchTerm : "",
                buildingCity: props.city ? props.city : "",
                buildingState: props.state ? props.state : "",
                fields: props.required ? props.required : [],
                totalScore: props.totalScore ? parseInt(props.totalScore) : 0,
                envScore: props.envScore ? parseInt(props.envScore) : 0,
                secScore: props.secScore ? parseInt(props.secScore) : 0
            }
        }).then((result) => {
            console.log(result.data)
            setBuildingList(result.data.advancedBuildingSearch);
            setFoundNum(result.data.advancedBuildingSearch.length);
            const pagesTotal = Math.ceil(result.data.advancedBuildingSearch.length / LIMIT);
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
            {/*building list*/}
            {foundNum === 0 && !loading ?
                <Box>
                    <Text fontSize={"sm"} pt='5%'>No results found.</Text>
                </Box> : null}
            <BuildingPage items={items} currPage={currPage - 1} itemLimit={LIMIT}/>
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
