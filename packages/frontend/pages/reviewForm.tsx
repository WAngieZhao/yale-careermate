import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useMutation, gql } from '@apollo/client'
import CoreLayout from "../components/coreLayout";
import ReviewPage1 from '../components/reviewPage1'
import ReviewPage2 from '../components/reviewPage2'
import ReviewPage3 from '../components/reviewPage3'

import {Heading, Button, Progress, HStack, Box, Container} from '@chakra-ui/react';
import { type } from 'os';

import useUser from "../components/useUser";
type formState = {
    // Page 1
    photos?: File[] // Photos to upload

    authorID: any
    authorEmail: any
    buildingID: any
    buildingName: any
    comment?: string
    upVotes?: number,
    downVotes?: number,
    bedNum?: number
    bathNum?: number
    leaseLength?: number
    rent?: number
    colease?: boolean,
    sublease?: boolean,


    // Page 2
    totalScore: number
    envScore: number
    secScore: number
    isDisFrd?: boolean
    hasParking?: boolean

    // Page 3
    frontdesk?: boolean,
    concierge?: boolean,
    gatedCommunity?: boolean,
    EVCharging?: boolean,
    guestParking?: boolean,
    coveredParking?: boolean,
    reservedSpot?: boolean,
    freeParking?: boolean,
    cleaningService?: boolean,
    quietHours?: boolean,
    trashPickUp?: boolean,
    staffOnDuty?: boolean,
    maintenanceTeam?: boolean,
    microwave?: boolean,
    stove?: boolean,
    dishwasher?: boolean,
    fridge?: boolean,
    washer?: boolean,
    dryer?: boolean,
    AC?: boolean,
    cableInstalled?: boolean,
    wifiInstalled?: boolean,
    walkInCloset?: boolean,
    balcony?: boolean,
    gym?: boolean,
    pool?: boolean,
    elevator?: boolean,
    lounge?: boolean,
    mailRoom?: boolean,
    dogPark?: boolean,
    petNumMax?: number,
    onlyCatDog?: boolean,
}

export default function ReviewForm () {

    const {user, userLoading} = useUser();

    // Form data
    const [formState, setFormState] = useState<formState>({
        photos: [],
        authorID: 'Author ID',
        authorEmail: 'Author Email',
        buildingID: 'Building ID',
        buildingName: 'Building Name',
        comment: '',
        upVotes: 0,
        downVotes: 0,
        bedNum: 0,
        bathNum: 0,
        leaseLength: 0,
        rent: 0,
        colease: false,
        sublease: false,
        totalScore: 0,
        envScore: 0,
        secScore: 0,
        isDisFrd: false,
        hasParking: false,
        frontdesk: false,
        concierge: false,
        gatedCommunity: false,
        EVCharging: false,
        guestParking: false,
        coveredParking: false,
        reservedSpot: false,
        freeParking: false,
        cleaningService: false,
        quietHours: false,
        trashPickUp: false,
        staffOnDuty: false,
        maintenanceTeam: false,
        microwave: false,
        stove: false,
        dishwasher: false,
        fridge: false,
        washer: false,
        dryer: false,
        AC: false,
        cableInstalled: false,
        wifiInstalled: false,
        walkInCloset: false,
        balcony: false,
        gym: false,
        pool: false,
        elevator: false,
        lounge: false,
        mailRoom: false,
        dogPark: false,
        petNumMax: 0,
        onlyCatDog: false,
    });
    
    const router = useRouter();

    useEffect(() => {
        if (router && router.isReady && !userLoading) {
            setFormState(state => ({
                ...state, 
                authorID: user?.id,
                authorEmail: user?.email,
                buildingID: router.query.building,
                buildingName: router.query.buildingName
            }))
            // console.log(formState.authorID);
        }
    }, [router, user, userLoading])
   
    // Maintain form state
    const [pageState, setPageState] = useState(1);
    
    const nextButton = () => {
        setPageState(pageState + 1);
    }

    const backButton = () => {
        if (pageState !== 1) {
            setPageState(pageState - 1);
        }
    }

    // Review graphql mutation
    const ADD_REVIEW_QUERY = gql`
        mutation createReview($photos: Upload!, $author: ID!, $building: ID!, $comment: String, $upVotes: Int, $downVotes: Int, $bedNum: Int, $bathNum: Int, $leaseLen: Int, $rent: Int, $colease: Boolean, $sublease: Boolean, $totalScore: Int, $envScore: Int, $secScore: Int, $isDisFrd: Boolean, $hasParking: Boolean, $frontdesk: Boolean, $concierge: Boolean, $gatedCommunity: Boolean, $EVCharging: Boolean, $guestParking: Boolean, $coveredParking: Boolean, $reservedSpot: Boolean, $freeParking: Boolean, $cleaningService: Boolean, $quietHours: Boolean, $trashPickUp: Boolean, $staffOnDuty: Boolean, $maintenanceTeam: Boolean, $microwave: Boolean, $stove: Boolean, $dishwasher: Boolean, $fridge: Boolean, $washer: Boolean, $dryer: Boolean, $AC: Boolean, $cableInstalled: Boolean, $wifiInstalled: Boolean, $walkInCloset: Boolean, $balcony: Boolean, $gym: Boolean, $pool: Boolean, $elevator: Boolean, $lounge: Boolean, $mailRoom: Boolean, $dogPark: Boolean, $petNumMax: Int, $onlyCatDog: Boolean) { 
            createReview(photos: $photos, author: $author, building: $building, comment: $comment, upVotes: $upVotes, downVotes: $downVotes, bedNum: $bedNum, bathNum: $bathNum, leaseLen: $leaseLen, rent: $rent, colease: $colease, sublease: $sublease, totalScore: $totalScore, envScore: $envScore, secScore: $secScore, isDisFrd: $isDisFrd, hasParking: $hasParking, frontdesk: $frontdesk, concierge: $concierge, gatedCommunity: $gatedCommunity, EVCharging: $EVCharging, guestParking: $guestParking, coveredParking: $coveredParking, reservedSpot: $reservedSpot, freeParking: $freeParking, cleaningService: $cleaningService, quietHours: $quietHours, trashPickUp: $trashPickUp, staffOnDuty: $staffOnDuty, maintenanceTeam: $maintenanceTeam, microwave: $microwave, stove: $stove, dishwasher: $dishwasher, fridge: $fridge, washer: $washer, dryer: $dryer, AC: $AC, cableInstalled: $cableInstalled, wifiInstalled: $wifiInstalled, walkInCloset: $walkInCloset, balcony: $balcony, gym: $gym, pool: $pool, elevator: $elevator, lounge: $lounge, mailRoom: $mailRoom, dogPark: $dogPark, petNumMax: $petNumMax, onlyCatDog: $onlyCatDog) {
                photos
                id
                author {
                    id
                }
                building {
                    id
                }
                comment
                upVotes
                downVotes
                bedNum
                bathNum
                leaseLen
                rent
                colease
                sublease
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
                petNumMax
                onlyCatDog
            }
        }
    `;
 
    const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW_QUERY);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("starting submission");
        e.preventDefault();
        addReview({
            variables: {
                photos: formState.photos,
                author: formState.authorID,
                building: formState.buildingID,
                upVotes: formState.upVotes,
                downVotes: formState.downVotes,
                comment: formState.comment,
                bedNum: Number(formState.bedNum),
                bathNum: Number(formState.bathNum),
                leaseLen: Number(formState.leaseLength),
                rent: Number(formState.rent),
                colease: formState.colease,
                sublease: formState.sublease,
                totalScore: Number(formState.totalScore),
                envScore: Number(formState.envScore),
                secScore: Number(formState.secScore),
                isDisFrd: formState.isDisFrd,
                hasParking: formState.hasParking,
                frontdesk: formState.frontdesk,
                concierge: formState.concierge,
                gatedCommunity: formState.gatedCommunity,
                EVCharging: formState.EVCharging,
                guestParking: formState.guestParking,
                coveredParking: formState.coveredParking,
                reservedSpot: formState.reservedSpot,
                freeParking: formState.freeParking,
                cleaningService: formState.cleaningService,
                quietHours: formState.quietHours,
                trashPickUp: formState.trashPickUp,
                staffOnDuty: formState.staffOnDuty,
                maintenanceTeam: formState.maintenanceTeam,
                microwave: formState.microwave,
                stove: formState.stove,
                dishwasher: formState.dishwasher,
                fridge: formState.fridge,
                washer: formState.washer,
                dryer: formState.dryer,
                AC: formState.AC,
                cableInstalled: formState.cableInstalled,
                wifiInstalled: formState.wifiInstalled,
                walkInCloset: formState.walkInCloset,
                balcony: formState.balcony,
                gym: formState.gym,
                pool: formState.pool,
                elevator: formState.elevator,
                lounge: formState.lounge,
                mailRoom: formState.mailRoom,
                dogPark: formState.dogPark,
                petNumMax: Number(formState.petNumMax),
                onlyCatDog: formState.onlyCatDog
            }
        });
        if (error) {
            console.log(error);
        }
        else {
            alert ("Review submitted!");
            Router.push('/');
        }
    };

    const updateData = (type:any, newData:any) => {
        if (newData === "on") {
            newData = true;
        }
        else if (newData === "off") {
            newData = false;
        }
        setFormState((data) => {
            return { ...data, [type]: newData };
        });
    }

    let props1 = {
        formState: formState,
        updateData: updateData,
        backButton: backButton,
        nextButton: nextButton
    }

    let props2 = {
        formState: formState,
        updateData: updateData,
        backButton: backButton,
        nextButton: nextButton
    }

    let props3 = {
        formState: formState,
        updateData: updateData,
        backButton: backButton,
        nextButton: nextButton
    }

    return (
        <CoreLayout>
            <Container maxW={"container.lg"}>
                <Heading>Review Form</Heading>
                {/* <h2>pageState: </h2>{pageState} */}

                {pageState === 1 && <ReviewPage1 props={props1}/>}
                {pageState === 2 && <ReviewPage2 props={props2}/>}
                {pageState === 3 && <ReviewPage3 props={props3}/>}

                {pageState === 4 && (
                    <div>
                        <Heading>Page 4: Confirm Your Review Data</Heading> <br/>
                        Author: {formState.authorEmail} <br/>
                        Building: {formState.buildingName} <br/>
                        Number of Beds: {formState.bedNum} <br/>
                        Number of Baths: {formState.bathNum} <br/>
                        Lease Length: {formState.leaseLength} <br/>
                        Rent: {formState.rent} <br/>
                        Comments: {formState.comment} <br/>
                        Colease: {formState.colease ? 'yes' : 'no'} <br/>
                        Sublease: {formState.sublease ? 'yes' : 'no'} <br/>
                        totalScore: {formState.totalScore} <br/>
                        envScore: {formState.envScore} <br/>
                        secScore: {formState.secScore} <br/>
                        isDisFrd: {formState.isDisFrd ? 'yes' : 'no'} <br/>
                        hasParking: {formState.hasParking ? 'yes' : 'no'} <br/>
                        frontdesk: {formState.frontdesk ? 'yes' : 'no'} <br/>
                        concierge: {formState.concierge ? 'yes' : 'no'} <br/>
                        gatedCommunity: {formState.gatedCommunity ? 'yes' : 'no'} <br/>
                        EVCharging: {formState.EVCharging ? 'yes' : 'no'} <br/>
                        guestParking: {formState.guestParking ? 'yes' : 'no'} <br/>
                        coveredParking: {formState.coveredParking ? 'yes' : 'no'} <br/>
                        reservedSpot: {formState.reservedSpot ? 'yes' : 'no'} <br/>
                        freeParking: {formState.freeParking ? 'yes' : 'no'} <br/>
                        cleaningService: {formState.cleaningService ? 'yes' : 'no'} <br/>
                        quietHours: {formState.quietHours ? 'yes' : 'no'} <br/>
                        trashPickUp: {formState.trashPickUp ? 'yes' : 'no'} <br/>
                        staffOnDuty: {formState.staffOnDuty ? 'yes' : 'no'} <br/>
                        maintenanceTeam: {formState.maintenanceTeam ? 'yes' : 'no'} <br/>
                        microwave: {formState.microwave ? 'yes' : 'no'} <br/>
                        stove: {formState.stove ? 'yes' : 'no'} <br/>
                        dishwasher: {formState.dishwasher ? 'yes' : 'no'} <br/>
                        fridge: {formState.fridge ? 'yes' : 'no'} <br/>
                        washer: {formState.washer ? 'yes' : 'no'} <br/>
                        dryer: {formState.dryer ? 'yes' : 'no'} <br/>
                        AC: {formState.AC ? 'yes' : 'no'} <br/>
                        cableInstalled: {formState.cableInstalled ? 'yes' : 'no'} <br/>
                        wifiInstalled: {formState.wifiInstalled ? 'yes' : 'no'} <br/>
                        walkInCloset: {formState.walkInCloset ? 'yes' : 'no'} <br/>
                        balcony: {formState.balcony ? 'yes' : 'no'} <br/>
                        gym: {formState.gym ? 'yes' : 'no'} <br/>
                        pool: {formState.pool ? 'yes' : 'no'} <br/>
                        elevator: {formState.elevator ? 'yes' : 'no'} <br/>
                        lounge: {formState.lounge ? 'yes' : 'no'} <br/>
                        mailRoom: {formState.mailRoom ? 'yes' : 'no'} <br/>
                        dogPark: {formState.dogPark ? 'yes' : 'no'} <br/>
                        {/* petNumMax: {formState.petNumMax} <br/> */}
                        onlyCatDog: {formState.onlyCatDog ? 'yes' : 'no'} <br/>

                        <HStack mb='4' mt='4'>
                            <Button colorScheme='brand' variant='outline' onClick={backButton}>Back</Button>
                            <form onSubmit={e => submitForm(e)}>
                                <Button colorScheme='brand' type="submit">Submit Review</Button>
                            </form>
                        </HStack>
                    </div>
                )}

                <Progress colorScheme='brand' value={pageState} max={4}></Progress>
            </Container>
        </CoreLayout>
    )
}

function renderFeatureList(featureList: string[]) {
    return <ul>{renderFeatureListItems(featureList)}</ul>
}

function renderFeatureListItems(featureList:string[]) {
    return featureList.map((feature:string, index:number) => (
        <li key={index}>
            {feature}
        </li>
    ))
}
