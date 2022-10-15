/**
 * Created by yuzheww (Yuzhe Wang) on 2/28/22.
 */
import Image from 'next/image'
import {Text, Box, HStack, Container, Button, Image as ChakraImage} from "@chakra-ui/react"
import Link from "next/link";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import image from "../assets/building_image.png";
import React from 'react';
import FeatureTag from "./FeatureTag";
import ScoreTags from "./ScoreTags";

type BuildingBasicProps = {
    id: string,

    // general
    buildingName: string
    buildingAddress: string
    buildingCity: string
    buildingState: string
    photos: Array<string>
    totalScore: number
    envScore: number
    secScore: number

    // amenities
    gym: boolean
    pool: boolean
    elevator: boolean
    lounge: boolean
    mailRoom: boolean
    dogPark: boolean
    gatedCommunity: boolean


    //parking
    hasParking: boolean
    EVCharging: boolean
    guestParking: boolean
    coveredParking: boolean
    reservedSpot: boolean
    freeParking: boolean

    // indoor features
    microwave: boolean
    stove: boolean
    dishwasher: boolean
    fridge: boolean
    washer: boolean
    dryer: boolean
    AC: boolean
    cableInstalled: boolean
    wifiInstalled: boolean
    walkInCloset: boolean
    balcony: boolean

    // policies and services
    concierge: boolean
    frontdesk: boolean
    isDisFrd: boolean
    cleaningService: boolean
    quietHours: boolean
    trashPickUp: boolean
    staffOnDuty: boolean
    maintenanceTeam: boolean
    petNumMax: number
    onlyCatDog: boolean


}


export default function BuildingBasicForm(props: BuildingBasicProps) {
    let {
        id, buildingName, buildingAddress, buildingCity, buildingState, photos, totalScore, envScore, secScore,
        gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity,
        hasParking, EVCharging, guestParking, coveredParking, reservedSpot, freeParking,
        microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony,
        concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,
        petNumMax, onlyCatDog
    } = props;

    return (
        <Box p={2} borderWidth={'3px'} borderRadius={6} m={4} _hover={{bg: "gray.50"}}>
            <HStack alignItems={"flex-start"} wrap={"wrap"}>
                <Box p={2} w={"60%"}>
                    <Box>
                        <Text fontSize={"3xl"} textTransform="uppercase">{props.buildingName}</Text>
                        <Text fontSize={"2xl"}>{`${buildingAddress}, ${buildingCity}, ${buildingState}`}</Text>
                    </Box>
                    <ScoreTags total={totalScore} secure={secScore} environment={envScore}/>
                    <Box pt={2}>
                        {/*community amenities*/}
                        {/*gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity*/}
                        {gym ? <FeatureTag scheme="green">gym</FeatureTag> : null}
                        {pool ? <FeatureTag scheme="green">pool</FeatureTag> : null}
                        {elevator ? <FeatureTag scheme="green">elevator</FeatureTag> : null}
                        {lounge ? <FeatureTag scheme="green">lounge</FeatureTag> : null}
                        {mailRoom ? <FeatureTag scheme="green">mail room</FeatureTag> : null}
                        {dogPark ? <FeatureTag scheme="green">dog park</FeatureTag> : null}
                        {gatedCommunity ? <FeatureTag scheme="green">gated community</FeatureTag> : null}

                        {/*indoor features*/}
                        {/*microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony*/}
                        {microwave ? <FeatureTag scheme="teal">microwave</FeatureTag> : null}
                        {stove ? <FeatureTag scheme="teal">stove</FeatureTag> : null}
                        {dishwasher ? <FeatureTag scheme="teal">dishwasher</FeatureTag> : null}
                        {fridge ? <FeatureTag scheme="teal">fridge</FeatureTag> : null}
                        {washer ? <FeatureTag scheme="teal">washer</FeatureTag> : null}
                        {dryer ? <FeatureTag scheme="teal">dryer</FeatureTag> : null}
                        {AC ? <FeatureTag scheme="teal">AC</FeatureTag> : null}
                        {cableInstalled ? <FeatureTag scheme="teal">cable</FeatureTag> : null}
                        {wifiInstalled ? <FeatureTag scheme="teal">wifi</FeatureTag> : null}
                        {walkInCloset ? <FeatureTag scheme="teal">walk-in closet</FeatureTag> : null}
                        {balcony ? <FeatureTag scheme="teal">balcony</FeatureTag> : null}

                        {/*parking*/}
                        {/*hasParking, EVCharging, guestParking, coveredParking, reservedSpot, freeParking*/}
                        {hasParking ? <FeatureTag scheme="blue">parking</FeatureTag> : null}
                        {EVCharging ? <FeatureTag scheme="blue">EV charging</FeatureTag> : null}
                        {guestParking ? <FeatureTag scheme="blue">guest parking</FeatureTag> : null}
                        {coveredParking ? <FeatureTag scheme="blue">covered parking</FeatureTag> : null}
                        {reservedSpot ? <FeatureTag scheme="blue">reserved spot</FeatureTag> : null}
                        {freeParking ? <FeatureTag scheme="blue">free parking</FeatureTag> : null}

                        {/*policies and services*/}
                        {/*concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,*/}
                        {/*petNumMax, onlyCatDog*/}
                        {concierge ? <FeatureTag scheme="purple">concierge</FeatureTag> : null}
                        {frontdesk ? <FeatureTag scheme="purple">front-desk</FeatureTag> : null}
                        {isDisFrd ? <FeatureTag scheme="purple">disability friendly</FeatureTag> : null}
                        {cleaningService ? <FeatureTag scheme="purple">cleaning service</FeatureTag> : null}
                        {trashPickUp ? <FeatureTag scheme="purple">trash pick-up</FeatureTag> : null}
                        {staffOnDuty ? <FeatureTag scheme="purple">staff on duty</FeatureTag> : null}
                        {maintenanceTeam ? <FeatureTag scheme="purple">maintenance team</FeatureTag> : null}
                        {onlyCatDog ? <FeatureTag scheme="purple">only cat/dog</FeatureTag> : null}
                        {petNumMax > 0 ?
                            <FeatureTag scheme="purple">{`max pet ${petNumMax}`}</FeatureTag> : null}
                        {quietHours ? <FeatureTag scheme="purple">quiet hours</FeatureTag> : null}

                    </Box>
                    <Box mt={3} ml={2}> <Link href={`/buildings/${props.id}`} passHref={true}><Button
                        variant='link' rightIcon={<ArrowForwardIcon/>}>Read more</Button></Link></Box>
                </Box>
                <Box w={350} py={3}>
                    {photos.length > 0 ?
                        <ChakraImage width={350} height={"100%"} src={photos[0]} alt={"building image"}/>:
                        <Image layout="responsive" src={image} alt={"building image"}/>}
                </Box>
            </HStack>
        </Box>
    );
}
