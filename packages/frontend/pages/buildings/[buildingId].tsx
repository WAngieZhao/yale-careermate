import NextLink from "next/link";
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import CoreLayout from "../../components/coreLayout";
import NavBar from '../../shared-components/NavBar';
import {Heading, Button, Text, HStack, Spacer, Divider, Container} from '@chakra-ui/react';
import ReviewList from "../../components/ReviewList";
import {Box} from "@chakra-ui/react"
import ScoreTags from "../../building-components/ScoreTags";
import FeatureTag from "../../building-components/FeatureTag";

// const url = 'http://localhost:3000/buildings/'

export default function DisplayBuilding() {
	const router = useRouter()
	const {buildingId} = router.query

    const GET_BUILDING = gql`
        query GetBuilding($buildingId: ID!) {
            buildingID(id: $buildingId) {
                id
                buildingName
                buildingAddress
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

	const {data, loading, error} = useQuery(GET_BUILDING, {
		variables: {buildingId},
		skip: !router.isReady,
		nextFetchPolicy: "network-only"
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>There was an error loading the building data :( ${error.message}</p>;
	if (!data) return <p></p>

	const building = data.buildingID;
	const {
		id, buildingName, buildingAddress, totalScore, envScore, secScore,
		gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity,
		hasParking, EVCharging, guestParking, coveredParking, reservedSpot, freeParking,
		microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony,
		concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,
		petNumMax, onlyCatDog
	} = building;

	return (
		<CoreLayout>
			<Container maxW={"container.lg"}>
				<a onClick={() => router.back()}>&#8592; Back to search results</a>
				<HStack wrap={"wrap"}>
					<Heading my={3}  as='h1' size='3xl'>{building.buildingName}</Heading> <Spacer/>
					<Link href={{
						pathname: "/reviewForm",
						query: {
							building: building.id,
							buildingName: building.buildingName
						},
					}} passHref={true}>
						<Button colorScheme='brand'>Leave a review</Button>
					</Link>
				</HStack>

				<Heading mt={2} as='h2' size='xl'>{building.buildingAddress}</Heading>
				<Box m={3}>
					<ScoreTags total={building.totalScore} secure={building.secScore} environment={building.envScore}/>
				</Box>
				<Box mb={3}>
					{/*community amenities*/}
					{/*gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity*/}
					{(gym || pool || elevator || lounge || mailRoom || dogPark || gatedCommunity) ?
						<Box>
							<Text fontSize={'sm'}>Community Amenities: </Text>
							{gym ? <FeatureTag scheme="green">gym</FeatureTag> : null}
							{pool ? <FeatureTag scheme="green">pool</FeatureTag> : null}
							{elevator ? <FeatureTag scheme="green">elevator</FeatureTag> : null}
							{lounge ? <FeatureTag scheme="green">lounge</FeatureTag> : null}
							{mailRoom ? <FeatureTag scheme="green">mail room</FeatureTag> : null}
							{dogPark ? <FeatureTag scheme="green">dog park</FeatureTag> : null}
							{gatedCommunity ? <FeatureTag scheme="green">gated community</FeatureTag> : null}
						</Box> : null}
					{/*indoor features*/}
					{/*microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony*/}
					{(microwave || stove || dishwasher || fridge || washer || dryer || AC || cableInstalled || wifiInstalled || walkInCloset || balcony) ?
						<Box>
							<Text fontSize={'sm'}>Indoor Features: </Text>
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
						</Box> : null}

					{/*parking*/}
					{/*hasParking, EVCharging, guestParking, coveredParking, reservedSpot, freeParking*/}
					{(hasParking || EVCharging || guestParking || coveredParking || reservedSpot || freeParking) ?
						<Box>
							<Text fontSize={'sm'}>Parking: </Text>
							{hasParking ? <FeatureTag scheme="blue">parking</FeatureTag> : null}
							{EVCharging ? <FeatureTag scheme="blue">EV charging</FeatureTag> : null}
							{guestParking ? <FeatureTag scheme="blue">guest parking</FeatureTag> : null}
							{coveredParking ? <FeatureTag scheme="blue">covered parking</FeatureTag> : null}
							{reservedSpot ? <FeatureTag scheme="blue">reserved spot</FeatureTag> : null}
							{freeParking ? <FeatureTag scheme="blue">free parking</FeatureTag> : null}
						</Box> : null}
					{/*policies and services*/}
					{/*concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,*/}
					{/*petNumMax, onlyCatDog*/}
					{(concierge || frontdesk || isDisFrd || cleaningService || quietHours || trashPickUp || staffOnDuty || maintenanceTeam
						|| petNumMax > 0 || onlyCatDog) ?
						<Box>
							<Text fontSize={'sm'}> Policies & Services: </Text>
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
						</Box> : null}

				</Box>
				<Heading mt={5} as='h2' size='lg' color={"gray.500"}>Comments</Heading>
				<Divider p={1} mb={5}/>
				{/*<Link href="/reviewForm" passHref={true}>*/}
				{/*    <Button colorScheme='brand'>Leave a review</Button>*/}
				{/*</Link>*/}
				<ReviewList buildingId={id}  buildingName={buildingName}/>
			</Container>
		</CoreLayout>
	)
}

function renderFeatureList(featureList: string[]) {
	return <ul>{renderFeatureListItems(featureList)}</ul>
}

function renderFeatureListItems(featureList: string[]) {
	return featureList.map((feature: string, index: number) => (
		<li key={index}>
			{feature}
		</li>
	))
}
