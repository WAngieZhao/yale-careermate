import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Input, Spacer,
    Spinner,
    Text,
    Textarea
} from "@chakra-ui/react";
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import {Box} from '@chakra-ui/react'
import SingleReview from "./SingleReview";
import BuildingPage from "../building-components/BuildingPage";
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import ReviewListPage from "./ReviewListPage";
import Link from "next/link";


type BuildingID = {
    buildingId : string
    buildingName : string
}

export default function ReviewList( {buildingId, buildingName}: BuildingID ) {
    // for pagination
    const [items, setReviewList] = useState<Array<Object>>([]);
    const LIMIT = 8;
    const [pagesQuantity, setPagesQuantity] = useState<any>(0);
    const [currPage, setCurrPage] = useState(1);


    // const [userID, setID] = useState('6210754739460b555e183818');
    // const [buildingID, setBuildingID] = useState('621ee75b824c6209b2c2e33d');

    const GET_REVIEW_QUERY = gql`
        query GetReview($buildingID : ID!)  {
            review_byBuilding(building: $buildingID) {
                building{
                  buildingName
                }
                author{
                  id
                }
                bedNum
                bathNum
                comment
                upVotes
                downVotes
                totalScore
                envScore
                secScore
    
            }
        }`

    const [getReviews, {error, data, loading}] = useLazyQuery(GET_REVIEW_QUERY);

    useEffect(() => {
        // console.log("yes")
        // console.log(buildingId)
        if (!buildingId) {
            console.log("no building");
            return ;
        }

        getReviews({
            variables: {
                buildingID: buildingId,
            }
        }).then((result) => {
            // console.log(result.data.review_byBuilding)
            setReviewList(result.data.review_byBuilding);
            const pagesTotal = Math.ceil(result.data.review_byBuilding.length / LIMIT);
            setPagesQuantity(pagesTotal);
            setCurrPage(1);
        })
            .catch(e => {
                console.log(buildingId)
                console.log(e.message)
            });

    }, [buildingId, getReviews])


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

    const formatReview = (reviews : any) => {
        console.log(data);
        return reviews.map ((review : any, index : number) => {
            return <SingleReview review={review} key={index}/>
            // <Box p={5} key={index}>
            //     <Text> {`comments: ${review.comment}`}</Text>
            //     <Text> {`author: ${review.author.userName}`}</Text>
            // </Box>
        })
    }

    return (
        <Box>
            {/*{data && formatReview(data.review_byBuilding)}*/}
            {/*{error ? <Text>{error.message} </Text> : null}*/}
            {loading ?
                <Center> <Spinner size='xl'
                                  thickness='3px'
                                  speed='0.3s'
                                  emptyColor='gray.200'
                                  color='brand.500'
                /></Center>
                : null}
            {/*building list*/}
            {items.length === 0 && <Box>
                <Text fontSize={"sm"} pt='5%'>No comments found. <Link href={{
                    pathname: "/reviewForm",
                    query: {
                        building: buildingId,
                        buildingName: buildingName
                    },
                }} passHref={true}>
                    <Button colorScheme='brand' variant='link'>Leave a review</Button>
                </Link></Text>
            </Box>}
            <ReviewListPage items={items} currPage={currPage - 1} itemLimit={LIMIT}/>
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
                        <Button bg="white" onClick={() => adjustPage(currPage + 1)} disabled={currPage === pagesQuantity}>
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
    );
}
