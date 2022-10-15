/**
 * Created by brandon-lai (Brandon Lai) on 2/19/22.
 */

 import React, { useState } from 'react';
 import { useMutation, gql } from '@apollo/client';
 import { useForm, SubmitHandler } from 'react-hook-form';
 import Router from 'next/router';

 import { 
     Button, Input, FormLabel, FormControl, Checkbox, HStack, Heading,
     Grid, GridItem, 
} from '@chakra-ui/react';

 
//  secFeature?: [string]
//  parkingFeature?: [string]
//  mngFeature?: [string]
//  unitFeature?: [string]
//  amenities?: [string]

 export default function ReviewPage3({ props } : {props:any}) {
    
     return (
         <div>
            <Heading>Page 3: The Features</Heading><br/>
            <FormLabel>Community Amentities:</FormLabel>
            {/*gym, pool, elevator, lounge, mailRoom, dogPark, gatedCommunity*/}
            <Grid m='1%' templateColumns='repeat(2, 1fr)' gap={1}>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.gym} colorScheme='brand'
                                onChange={(e) => props.updateData('gym', e.target.checked)}>gym</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.pool} colorScheme='brand'
                                onChange={(e) => props.updateData('pool', e.target.checked)}>pool</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.elevator} colorScheme='brand'
                                onChange={(e) => props.updateData('elevator', e.target.checked)}>elevator</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.lounge} colorScheme='brand'
                                onChange={(e) => props.updateData('lounge', e.target.checked)}>lounge</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.mailRoom} colorScheme='brand'
                                onChange={(e) => props.updateData('mailRoom', e.target.checked)}>mailroom</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.dogPark} colorScheme='brand'
                                onChange={(e) => props.updateData('dogPark', e.target.checked)}>dog park</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.gatedCommunity} colorScheme='brand'
                                onChange={(e) => props.updateData('gatedCommunity', e.target.checked)}>gated
                        community</Checkbox>
                </GridItem>
            </Grid>

            <FormLabel>Indoor Features: </FormLabel>
            {/*microwave, stove, dishwasher, fridge, washer, dryer, AC, cableInstalled, wifiInstalled, walkInCloset, balcony*/}
            <Grid m='1%' templateColumns='repeat(2, 1fr)' gap={1}>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.microwave} colorScheme='brand'
                                onChange={(e) => props.updateData('microwave', e.target.checked)}>microwave</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.stove} colorScheme='brand'
                                onChange={(e) => props.updateData('stove', e.target.checked)}>stove</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.dishwasher} colorScheme='brand'
                                onChange={(e) => props.updateData('dishwasher', e.target.checked)}>dishwasher</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.fridge} colorScheme='brand'
                                onChange={(e) => props.updateData('fridge', e.target.checked)}>fridge</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.washer} colorScheme='brand'
                                onChange={(e) => props.updateData('washer', e.target.checked)}>washer</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.dryer} colorScheme='brand'
                                onChange={(e) => props.updateData('dryer', e.target.checked)}>dryer</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.AC} colorScheme='brand'
                                onChange={(e) => props.updateData('AC', e.target.checked)}>AC</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.cableInstalled} colorScheme='brand'
                                onChange={(e) => props.updateData('cableInstalled', e.target.checked)}>cable</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.wifiInstalled} colorScheme='brand'
                                onChange={(e) => props.updateData('wifiInstalled', e.target.checked)}>wifi</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.walkInCloset} colorScheme='brand'
                                onChange={(e) => props.updateData('walkInCloset', e.target.checked)}>walk-in
                        closet</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.balcony} colorScheme='brand'
                                onChange={(e) => props.updateData('balcony', e.target.checked)}>balcony</Checkbox>
                </GridItem>
            </Grid>

            <FormLabel>Parking:</FormLabel>
            {/*EVCharging, guestParking, coveredParking, reservedSpot, freeParking*/}
            <Grid m='1%' templateColumns='repeat(2, 1fr)' gap={1}>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.EVCharging} colorScheme='brand'
                                onChange={(e) => props.updateData('EVCharging', e.target.checked)}>EV
                        charging</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.guestParking} colorScheme='brand'
                                onChange={(e) => props.updateData('guestParking', e.target.checked)}>guest
                        parking</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.coveredParking} colorScheme='brand'
                                onChange={(e) => props.updateData('coveredParking', e.target.checked)}>covered
                        parking</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.reservedSpot} colorScheme='brand'
                                onChange={(e) => props.updateData('reservedSpot', e.target.checked)}>reserved
                        spot</Checkbox>
                </GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.freeParking} colorScheme='brand'
                                onChange={(e) => props.updateData('freeParking', e.target.checked)}>free
                        parking</Checkbox>
                </GridItem>
            </Grid>

            <FormLabel>Policies & Services: </FormLabel>
            {/*concierge, frontdesk, isDisFrd, cleaningService, quietHours, trashPickUp, staffOnDuty, maintenanceTeam,*/}
            {/*petNumMax, onlyCatDog*/}
            <Grid m='1%' templateColumns='repeat(2, 1fr)' gap={1}>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.concierge} colorScheme='brand'
                                onChange={(e) => props.updateData('concierge', e.target.checked)}>concierge</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.frontdesk} colorScheme='brand'
                                onChange={(e) => props.updateData('frontdesk', e.target.checked)}>front-desk</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.cleaningService} colorScheme='brand'
                                onChange={(e) => props.updateData('cleaningService', e.target.checked)}>cleaning
                    service</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.quietHours} colorScheme='brand'
                                onChange={(e) => props.updateData('quietHours', e.target.checked)}>quiet
                    hours</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.trashPickUp} colorScheme='brand'
                                onChange={(e) => props.updateData('trashPickUp', e.target.checked)}>trash
                    pick-up</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.staffOnDuty} colorScheme='brand'
                                onChange={(e) => props.updateData('staffOnDuty', e.target.checked)}>staff on duty</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.maintenanceTeam} colorScheme='brand'
                                onChange={(e) => props.updateData('maintenanceTeam', e.target.checked)}>maintenance
                    team</Checkbox></GridItem>
                <GridItem mx={3} my={1} w='100%'>
                    <Checkbox isChecked={props.formState.onlyCatDog} colorScheme='brand'
                                onChange={(e) => props.updateData('onlyCatDog', e.target.checked)}>only
                    cat/dog</Checkbox></GridItem>
            </Grid>

            <HStack mb='4' mt='4'>
                <Button colorScheme='brand' variant='outline' onClick={props.backButton}>Back</Button>
                <Button colorScheme='brand' onClick={props.nextButton}>Next</Button>
            </HStack>
         </div>
     );
 }