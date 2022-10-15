/**
 * Created by brandon-lai (Brandon Lai) on 2/19/22.
 */

 import React, { useState } from 'react';
 import { useMutation, gql } from '@apollo/client';
 import { useForm, SubmitHandler } from 'react-hook-form';
 import Router from 'next/router';
 
 import { 
     Button, Input, FormLabel, FormControl, Checkbox, HStack,
     Slider, SliderMark, SliderTrack, SliderThumb, SliderFilledTrack,
     Heading
 } from '@chakra-ui/react';

//  totalScore: number
//  envScore: number
//  secScore: number
//  isDisFrd?: boolean
//  hasParking?: boolean

 export default function ReviewPage2({ props } : {props:any}) {
    console.log(props);
    return (
        <div>
            <Heading>Page 2: The Essentials</Heading><br/>
            <FormLabel>Overall Rating: </FormLabel>
            <Slider colorScheme="brand" m={"3"} w={"98%"} defaultValue={props.formState.totalScore} min={0} max={4} step={1} onChange={(val) => props.updateData('totalScore', val)}>
                <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                    0
                </SliderMark>
                <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                    1
                </SliderMark>
                <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                    2
                </SliderMark>
                <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                    3
                </SliderMark>
                <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                    4
                </SliderMark>
                <SliderTrack>
                    {/*<Box position='relative' right={10} />*/}
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb boxSize={3}/>
            </Slider>
            <br/>

            <FormLabel>Environment Rating: </FormLabel>
            {/* <Input
                type="number"
                placeholder="Environment Rating" 
                name="envScore"
                onChange={(e) => props.updateData('envScore', e.target.value)}
            /> */}
            <Slider colorScheme="brand" m={"3"} w={"98%"} defaultValue={props.formState.envScore} min={0} max={4} step={1} onChange={(val) => props.updateData('envScore', val)}>
                <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                    0
                </SliderMark>
                <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                    1
                </SliderMark>
                <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                    2
                </SliderMark>
                <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                    3
                </SliderMark>
                <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                    4
                </SliderMark>
                <SliderTrack>
                    {/*<Box position='relative' right={10} />*/}
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb boxSize={3}/>
            </Slider>
            <br/>

            <FormLabel>Security Rating: </FormLabel>
            {/* <Input
                type="number"
                placeholder="Security Rating" 
                name="secScore"
                onChange={(e) => props.updateData('secScore', e.target.value)}
            /> */}
            <Slider colorScheme="brand" m={"3"} w={"98%"} defaultValue={props.formState.secScore} min={0} max={4} step={1} onChange={(val) => props.updateData('secScore', val)}>
                <SliderMark value={0} mt='1.5' ml='-2' fontSize='sm'>
                    0
                </SliderMark>
                <SliderMark value={1} mt='1.5' ml='-2' fontSize='sm'>
                    1
                </SliderMark>
                <SliderMark value={2} mt='1.5' ml='-2' fontSize='sm'>
                    2
                </SliderMark>
                <SliderMark value={3} mt='1.5' ml='-2' fontSize='sm'>
                    3
                </SliderMark>
                <SliderMark value={4} mt='1.5' ml='-2' fontSize='sm'>
                    4
                </SliderMark>
                <SliderTrack>
                    {/*<Box position='relative' right={10} />*/}
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb boxSize={3}/>
            </Slider>
            <br/>

            <FormLabel>Is this building friendly to persons with disabilities?: </FormLabel>
            <Checkbox
                placeholder="Disability Friendliness" 
                name="isDisFrd"
                isChecked={props.formState.isDisFrd}
                onChange={(e) => props.updateData('isDisFrd', e.target.checked)}
                colorScheme='brand'
            />
            <br/>

            <FormLabel>Does this building have parking?: </FormLabel>
            <Checkbox
                placeholder="Parking Options" 
                name="hasParking"
                isChecked={props.formState.hasParking}
                onChange={(e) => props.updateData('hasParking', e.target.checked)}
                colorScheme='brand'
            />
            <br/>
            
            <HStack mb='4' mt='4'>
                <Button colorScheme='brand' variant='outline' onClick={props.backButton}>Back</Button>
                <Button colorScheme='brand' onClick={props.nextButton}>Next</Button>
            </HStack>
        </div>
    );
 }